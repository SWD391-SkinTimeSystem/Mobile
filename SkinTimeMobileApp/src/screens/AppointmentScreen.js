import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar
} from 'react-native';
import useBooking from '../hooks/useBooking';
import { useFocusEffect } from '@react-navigation/native';

const AppointmentScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('NotStarted');
  const { booking, getBooking, isLoading, error, success } = useBooking();
  const tabs = ['NotStarted', 'Completed', 'Canceled'];
  useFocusEffect(
    useCallback(() => {
      console.log("Screen focused, calling getUser()");
      getBooking(activeTab);
    }, [activeTab])
  );
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

  console.log("Booking là gì: ", booking)
  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderImageContainer}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.orderImage}
        />    
      </View>
      <View style={styles.orderDetails}>
        <Text style={styles.orderName}>{item.serviceName}</Text>
        <Text style={styles.orderCategory}>{item.therapistName}</Text>
        <Text style={styles.orderPrice}>{item.timeStart}</Text>
        <Text style={styles.orderPrice}>{item.date}</Text>
      </View>
      <TouchableOpacity style={styles.trackButton} onPress={() => navigation.navigate('TrackOrder', { bookingId: item.id })}>
        <Text style={styles.trackButtonText}>Track Order</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Header */}


      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tabButton,
              activeTab === tab && styles.activeTabButton
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText
              ]}
            >
              {tab}
            </Text>
            {activeTab === tab && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Order List */}
      <FlatList
        data={booking}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ordersList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 20,
    color: '#000000',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
  },
  placeholder: {
    width: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    position: 'relative',
  },
  activeTabButton: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    color: '#9E9E9E',
    fontSize: 14,
    fontWeight: '400',
  },
  activeTabText: {
    color: '#006A42', // Exact green color from the image
    fontWeight: '600',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: 70,
    backgroundColor: '#006A42',
    borderRadius: 3,
  },
  ordersList: {
    padding: 16,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  orderImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  orderDetails: {
    flex: 1,
  },
  orderName: {
    fontWeight: '500',
    fontSize: 14,
    color: '#000000',
    marginBottom: 2,
  },
  orderCategory: {
    fontSize: 12,
    color: '#757575',
    marginBottom: 4,
  },
  orderPrice: {
    fontWeight: '600',
    fontSize: 14,
    color: '#000000',
  },
  trackButton: {
    backgroundColor: '#445A4B',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  trackButtonText: {
    color: '#f6f6f6',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default AppointmentScreen;


