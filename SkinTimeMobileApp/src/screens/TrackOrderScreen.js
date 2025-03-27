import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import useBooking from '../hooks/useBooking';
const TrackOrderScreen = ({ navigation }) => {
  // Sample order data
  const route = useRoute();
  const { bookingId } = route.params;
  const { bookingDetail, getBookingById, isLoading, error, success } = useBooking();
  useEffect(() => {
    getBookingById(bookingId);
  }, [bookingId]);
  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (error) {

    return (
      <View style={styles.container}>
        <Text>{error}</Text>

      </View>
    );
  }
  const booking = bookingDetail;
  const orderData = {
    product: {
      name: 'SilkSculpt Serum',
      category: 'Skin Care',
      quantity: 1,
      price: 30.00,
      image: "https://bizweb.dktcdn.net/thumb/1024x1024/100/413/259/files/my-pham-organic-1.jpg?v=1673511874586", // Replace with your actual image path
    },
    orderDetails: {
      expectedDelivery: '11 Feb 2024',
      trackingId: 'TRK452126542',
    },
    orderStatus: [
      {
        id: 1,
        status: 'Order Placed',
        date: '07 Feb 2024',
        time: '10:00 AM',
        completed: true,
        icon: 'checkmark-circle'
      },
      {
        id: 2,
        status: 'In Progress',
        date: '07 Feb 2024',
        time: '02:00 PM',
        completed: true,
        icon: 'checkmark-circle'
      },
      {
        id: 3,
        status: 'Shipped',
        date: 'Expected 10 Feb 2024',
        completed: true,
        icon: 'checkmark-circle'
      },
      {
        id: 4,
        status: 'Delivered',
        date: '11 Feb 2024',
        completed: false,
        icon: 'ellipse-outline'
      }
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header with time and network icons */}


      {/* Navigation header */}

      {/* Product summary */}
      <View style={styles.productContainer}>
        <Image
          source={{ uri: booking?.thumbnail }}
          style={styles.productImage}
          defaultSource=""// Fallback image
        />
        <View style={styles.productDetails}>
          <Text style={styles.productName}>{booking?.serviceName}</Text>
          <Text style={styles.productCategory}>
            {booking?.therapistName} | Time Start : {booking?.timeStart}
          </Text>
        </View>
      </View>

      {/* Order details section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Order Details</Text>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Expected Delivery Date</Text>
          <Text style={styles.detailValue}>{orderData.orderDetails.expectedDelivery}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Tracking ID</Text>
          <Text style={styles.detailValue}>{orderData.orderDetails.trackingId}</Text>
        </View>
      </View>

      {/* Order status section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Order Status</Text>
        <View style={styles.statusContainer}>
          {orderData.orderStatus.map((status, index) => (
            <View key={status.id} style={styles.statusItem}>
              {/* Status marker */}
              <View style={styles.statusMarkerContainer}>
                <View style={[
                  styles.statusMarker,
                  { backgroundColor: status.completed ? '#2E7D32' : '#D0D0D0' }
                ]}>
                  <Ionicons
                    name={status.icon}
                    size={16}
                    color="white"
                  />
                </View>

                {/* Vertical line */}
                {index < orderData.orderStatus.length - 1 && (
                  <View style={[
                    styles.statusLine,
                    {
                      backgroundColor: index < orderData.orderStatus.length - 2 ||
                        (index === orderData.orderStatus.length - 2 && status.completed)
                        ? '#2E7D32' : '#D0D0D0'
                    }
                  ]} />
                )}
              </View>

              {/* Status info */}
              <View style={styles.statusInfo}>
                <Text style={styles.statusTitle}>{status.status}</Text>
                <Text style={styles.statusDate}>
                  {status.date}{status.time ? `, ${status.time}` : ''}
                </Text>
              </View>

              {/* Status icon */}
              <View style={styles.statusIconContainer}>
                <Ionicons
                  name={index === 0 ? "document-text-outline" :
                    index === 1 ? "cube-outline" :
                      index === 2 ? "car-outline" : "home-outline"}
                  size={20}
                  color="#777"
                />
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Cancel button */}
      {booking?.status === 'NotStarted' ? (
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={styles.cancelButton}
      onPress={() => navigation.navigate('LeaveReview', {
        bookingId: booking?.id || [],
        serviceName: booking?.serviceName || "",
        therapistName: booking?.therapistName || "",
      })}
    >
      <Text style={styles.cancelButtonText}>Cancel</Text>
    </TouchableOpacity>
  </View>
) : booking?.status === 'Completed' ? ( // Nếu có một điều kiện khác
  <View style={styles.buttonContainer}>
    <TouchableOpacity
      style={styles.ReviewButton}
      onPress={() => navigation.navigate('LeaveReview', {
        bookingId: booking?.id || [],
        serviceName: booking?.serviceName || "",
        therapistName: booking?.therapistName || "",
      })}
    >
      <Text style={styles.ReviewButtonText}>Review</Text>
    </TouchableOpacity>
  </View>
) : null} 
{/* // ✅ Chỉ có một dấu `:` tổng. */}


      {/* Home indicator */}
      <View style={styles.homeIndicator}>
        <View style={styles.homeIndicatorBar} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 10,
  },
  time: {
    fontWeight: '600',
    fontSize: 14,
  },
  indicators: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  placeholder: {
    width: 28,
  },
  productContainer: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  productCategory: {
    fontSize: 14,
    color: '#888',
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  sectionContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#888',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  statusContainer: {
    marginTop: 8,
  },
  statusItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statusMarkerContainer: {
    alignItems: 'center',
    width: 30,
    marginRight: 8,
  },
  statusMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#2E7D32',
    marginVertical: 4,
  },
  statusInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  statusDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  statusIconContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    padding: 16,
    marginTop: 'auto',
  },
  cancelButton: {
    backgroundColor: '#B59154',
    borderRadius: 30,
    paddingVertical: 14,
    alignItems: 'center',
  },
  ReviewButton : {
    backgroundColor: '#445A4B',
    borderRadius: 8,
    paddingVertical: 14,
  },
  ReviewButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  homeIndicator: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  homeIndicatorBar: {
    width: 40,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 3,
  },
});

export default TrackOrderScreen;