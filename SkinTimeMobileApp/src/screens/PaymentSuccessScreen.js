import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
     
      
      <View style={styles.content}>
        <View style={styles.successIconContainer}>
          <View style={styles.checkCircle}>
            <Ionicons name="checkmark" size={40} color="#FFF" />
          </View>
        </View>
        
        <Text style={styles.successTitle}>Payment Successful!</Text>
        <Text style={styles.successMessage}>Thank you for your purchase.</Text>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.viewOrderButton} onPress={() => navigation.navigate('Appointment')}>
          <Text style={styles.viewOrderButtonText}>View Order</Text>
        </TouchableOpacity>
        
        <View style={styles.bottomBar} />
      </View>
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
    paddingHorizontal: 16,
    height: 56,
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  successIconContainer: {
    marginBottom: 24,
  },
  checkCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#3C6E47',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  successMessage: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  footer: {
    padding: 24,
  },
  viewOrderButton: {
    backgroundColor: '#3C6E47',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewOrderButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  viewReceiptButton: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewReceiptText: {
    color: '#333',
    fontSize: 14,
  },
  bottomBar: {
    width: 134,
    height: 5,
    backgroundColor: '#333',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 12,
  }
});

export default PaymentSuccessScreen;