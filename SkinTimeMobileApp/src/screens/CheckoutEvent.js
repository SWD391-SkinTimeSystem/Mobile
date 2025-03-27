import React, {useState, useEffect} from 'react';
import { View, Text, Image, ActivityIndicator,StyleSheet, ScrollView, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import { Ionicons, MaterialIcons} from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import { formatCurrencyVND } from '../utils/Formatted';
import useEvent from '../hooks/useEvent';
const CheckoutEvent = ({navigation}) => {
  const route = useRoute();
  const { eventId, title, price, destination } = route.params;
  const { paymentMethod, setPaymentMethod} = useState('VnPay');
  console.log(eventId, title, price, destination);
  const { isLoading,doTicket, ticketUrl , success, error} = useEvent();
  const orderItems = [
    {
      id: 1,
      name: 'VnPay',
      category: 'Skin Care',
      price: 30.00,
      image: 'https://vinadesign.vn/uploads/images/2023/05/vnpay-logo-vinadesign-25-12-57-55.jpg'
    },
  ];
  const handleCheckout = async () => {
    var data = {
        eventId: eventId,
        price: price,
        paymentMethod: 'VnPay',
        totalAmount: '1',
        successCallbackUrl: "https://skintimeclinic.netlify.app/",
        failureCallbackUrl: "https://skintimeclinic.netlify.app/"
    };
    await doTicket(data);
    if(success != null){
      alert(success);
      Linking.openURL(ticketUrl);
      navigation.navigate('Home');
    }
    if(error != null){
      alert(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
     
      <ScrollView style={styles.content}>
        {/* Shipping Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <View style={styles.addressContainer}>
            <View style={styles.addressInfo}>
              <View style={styles.addressTypeRow}>
                <MaterialIcons name="location-on" size={20} color="#333" />
                <Text style={styles.addressType}>{destination}</Text>
              </View>
           
            </View>
           
          </View>
        </View>

        {/* Shipping Type */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Price</Text>
          <View style={styles.shippingTypeContainer}>
            <View style={styles.shippingTypeInfo}>
              <View style={styles.shippingIconContainer}>
                <Ionicons name="cash-outline" size={20} color="#333" />
              </View>
              <View>
                <Text style={styles.shippingType}>{formatCurrencyVND(price)}</Text>
              </View>
            </View>
          </View>
        </View>

        
        {/* Order List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment</Text>
          <View style={styles.orderList}>
            {orderItems.map((item) => (
              <View key={item.id} style={styles.orderItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.productImage}
                  defaultSource="" // Replace with your placeholder
                />
                <View style={styles.productInfo}>
                  <Text style={styles.productName}>{item.name}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Payment Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.paymentButton} onPress={handleCheckout}>
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.paymentButtonText}>Payment</Text>
        )}
        </TouchableOpacity>
        <View style={styles.homeIndicator} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 12,
    backgroundColor: '#fff',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  addressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addressInfo: {
    flex: 1,
  },
  addressTypeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  addressType: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 6,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    paddingLeft: 26,
    lineHeight: 20,
  },
  changeButton: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  shippingTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  shippingTypeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  shippingIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  shippingType: {
    fontSize: 14,
    fontWeight: '500',
  },
  deliveryEstimate: {
    fontSize: 14,
    color: '#666',
  },
  orderList: {
    marginTop: 8,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  productInfo: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 2,
  },
  productCategory: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: '600',
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    alignItems: 'center',
  },
  paymentButton: {
    backgroundColor: '#3c5b45',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  homeIndicator: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    marginTop: 8,
  },
});

export default CheckoutEvent;