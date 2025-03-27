import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import useBooking from '../hooks/useBooking';
import InAppBrowser from 'react-native-inappbrowser-reborn';

const PaymentMethodsScreen = ({navigation}) => {
  const [selectedMethod, setSelectedMethod] = useState('wallet');
  const [serviceId, setServiceId] = useState('');
  const route = useRoute();
  const { selectedDate, selectedTimeSlot, therapistId } = route.params;
  const { doBooking,bookingUrl, isLoading, setIsLoading, error, success } = useBooking();
  useEffect(() => {
    const fetchServiceId = async () => {
      try {
        const storedServiceId = await AsyncStorage.getItem('serviceID');
        if (storedServiceId) {
          setServiceId(storedServiceId);
          console.log(storedServiceId);
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };
    
    fetchServiceId();
  }, []); // Chỉ chạy một lần khi component mount
  

  const renderRadioButton = (isSelected) => (
    <View style={[
      styles.radioButton,
      isSelected ? styles.radioButtonSelected : null
    ]}>
      {isSelected && <View style={styles.radioButtonInner} />}
    </View>
  );
  const handlePayment = async () => {
    var data = {
      serviceDate: selectedDate,
      serviceHour: selectedTimeSlot,
      therapistId: therapistId,
      serviceId: serviceId,
      returnURL: 'https://skintimeclinic.netlify.app/',
      failureURL: 'https://skintimeclinic.netlify.app/',
      voucherCode: '',
      paymentMethod: selectedMethod
    };
    
    await doBooking(data);
    if (error) {
      console.log(error);
    }
    if (success) {
      Linking.openURL(bookingUrl)
      // navigation.navigate('PaymentSuccess');
    }
    console.log(data);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
      </View>
      
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>Cash</Text>
        
        <TouchableOpacity 
          style={styles.methodItem}
          onPress={() => setSelectedMethod('cash')}
        >
          <View style={styles.methodInfo}>
            <View style={styles.iconContainer}>
              <Ionicons name="cash-outline" size={20} color="#333" />
            </View>
            <Text style={styles.methodName}>Cash</Text>
          </View>
          {renderRadioButton(selectedMethod === 'cash')}
        </TouchableOpacity>
        
        <Text style={styles.sectionTitle}>Wallet</Text>
        
        <TouchableOpacity 
          style={styles.methodItem}
          onPress={() => setSelectedMethod('VnPay')}
        >
          <View style={styles.methodInfo}>
            <View style={styles.iconContainer}>
              <Ionicons name="wallet-outline" size={20} color="#333" />
            </View>
            <Text style={styles.methodName}>VnPay</Text>
          </View>
          {renderRadioButton(selectedMethod === 'VnPay')}
        </TouchableOpacity>
        
        <Text style={styles.sectionTitle}>Credit & Debit Card</Text>
        
        <TouchableOpacity style={styles.methodItem}>
          <View style={styles.methodInfo}>
            <View style={styles.iconContainer}>
              <Ionicons name="card-outline" size={20} color="#333" />
            </View>
            <Text style={styles.methodName}>Add Card</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </TouchableOpacity>
        
        <Text style={styles.sectionTitle}>More Payment Options</Text>
        
        <TouchableOpacity 
          style={styles.methodItem}
          onPress={() => setSelectedMethod('ZaloPay')}
        >
          <View style={styles.methodInfo}>
            <View style={styles.iconContainer}>
              <Image 
                source={{ uri: 'https://i.imgur.com/35CNQzW.png' }} 
                style={styles.paymentLogo} 
              />
            </View>
            <Text style={styles.methodName}>ZaloPay</Text>
          </View>
          {renderRadioButton(selectedMethod === 'ZaloPay')}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.methodItem}
          onPress={() => setSelectedMethod('applepay')}
        >
          <View style={styles.methodInfo}>
            <View style={styles.iconContainer}>
              <Ionicons name="logo-apple" size={20} color="#333" />
            </View>
            <Text style={styles.methodName}>Apple Pay</Text>
          </View>
          {renderRadioButton(selectedMethod === 'applepay')}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.methodItem}
          onPress={() => setSelectedMethod('googlepay')}
        >
          <View style={styles.methodInfo}>
            <View style={styles.iconContainer}>
              <Image 
                source={{ uri: 'https://i.imgur.com/pPt8XGC.png' }} 
                style={styles.paymentLogo} 
              />
            </View>
            <Text style={styles.methodName}>Google Pay</Text>
          </View>
          {renderRadioButton(selectedMethod === 'googlepay')}
        </TouchableOpacity>
      </ScrollView>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
          <Text style={styles.confirmButtonText}>Confirm Payment</Text>
        </TouchableOpacity>
        <View style={styles.bottomBar} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  methodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 2,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  methodName: {
    fontSize: 15,
    color: '#555',
    marginLeft: 10,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#3C6E47',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3C6E47',
  },
  paymentLogo: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFF',
  },
  confirmButton: {
    backgroundColor: '#3C6E47',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomBar: {
    width: 134,
    height: 5,
    backgroundColor: '#333',
    borderRadius: 3,
    alignSelf: 'center',
  }
});

export default PaymentMethodsScreen;