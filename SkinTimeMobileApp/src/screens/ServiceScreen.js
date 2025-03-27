import React, { useEffect, useState } from 'react';
import { useRoute } from "@react-navigation/native";
import useService from '../hooks/useService';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatCurrencyVND } from '../utils/Formatted';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  StatusBar, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
const ServiceDetailScreen = ({navigation}) => {
  const [selectedSize, setSelectedSize] = useState('250 ml');
  const { getService, isLoading, setIsLoading, error, success, service } = useService();
  const route = useRoute();
  const { id } = route.params;   // Lấy id từ navigation params

  useEffect(() => {
    getService(id);
  }, [id]);
  if ( isLoading ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }
  if ( error ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>{error}</Text>
      </View>
    );
  }
  if ( !service ) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Service not found!</Text>
      </View>
    );
  }

  console.log("Chi tiết dịch vụ:", service);
  const sizeOptions = [
    { value: '250 ml', price: 24.00 },
    { value: '400 ml', price: 36.00 },
    { value: '500 ml', price: 42.00 },
    { value: '650 ml', price: 54.00 },
    { value: '1000 ml', price: 80.00 },
  ];
  var serviceHourString = service.duration.toString();
  const handleBooking = async (id) => {
    await AsyncStorage.multiSet([
      ["serviceID", id],
      ["serviceHour", serviceHourString],
    ]);
    console.log("Lưu thành công serviceID vào AsyncStorage : ",id);
    navigation.replace('Therapist');
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      {/* <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="favorite-border" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Icon name="share" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View> */}
      
      {/* Main Content */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: service.thumbnail }} 
            style={styles.productImage}
            resizeMode="contain"
          />
          {/* <TouchableOpacity style={styles.playButton}>
            <Icon name="play-arrow" size={24} color="#000" />
          </TouchableOpacity> */}
          
          {/* Paging Dots */}
          {/* <View style={styles.pagingDots}>
            {[1, 2, 3, 4, 5].map((_, index) => (
              <View 
                key={index} 
                style={[
                  styles.pagingDot, 
                  index === 0 ? styles.pagingDotActive : {}
                ]} 
              />
            ))}
          </View> */}
        </View>
        
        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.categoryRating}>
            <Text style={styles.category}>Skin Care</Text>
            <View style={styles.ratingContainer}>
              <Icon name="star" size={18} color="#FFD700" />
              <Text style={styles.ratingText}>4.9</Text>
            </View>
          </View>
          
          <Text style={styles.productName}>{service.serviceName}</Text>
          <Text style={styles.category}>{service.duration} Giờ trị liệu</Text>

          {/* Seller Info */}
          <View style={styles.sellerContainer}>
            <Text style={styles.sellerLabel}>Hot Therapist</Text>
            <View style={styles.sellerInfo}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/50x50' }} 
                style={styles.sellerImage} 
              />
              <View style={styles.sellerNameContainer}>
                <Text style={styles.sellerName}>Leslie Alexander</Text>
                <Text style={styles.sellerShop}>Golden Aura Cosmetics</Text>
              </View>
              <View style={styles.sellerContactButtons}>
                <TouchableOpacity style={styles.sellerContactButton}>
                  <Icon name="chat" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sellerContactButton}>
                  <Icon name="call" size={20} color="#fff" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          
          {/* Size Selection */}
      
          
          {/* Product Details */}
          <Text style={styles.sectionTitle}>Service Details</Text>
          <Text style={styles.detailsText}>
            {service.description}
          </Text>
          
          {/* Total Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Total Price</Text>
            <Text style={styles.priceAmount}>{formatCurrencyVND(service.price)}</Text>
          </View>
          
          {/* Add to Cart Button */}
          <TouchableOpacity style={styles.addToCartButton} onPress={() => handleBooking(service.id)}>
            <Text style={styles.addToCartText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  imageContainer: {
    width: width,
    height: width,
    backgroundColor: '#1c492a',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  playButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  pagingDots: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    justifyContent: 'center',
  },
  pagingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  pagingDotActive: {
    backgroundColor: '#fff',
    width: 20,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 40,
  },
  categoryRating: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  productName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  sellerContainer: {
    marginBottom: 24,
  },
  sellerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  sellerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sellerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  sellerNameContainer: {
    flex: 1,
    marginLeft: 12,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '500',
  },
  sellerShop: {
    fontSize: 14,
    color: '#666',
  },
  sellerContactButtons: {
    flexDirection: 'row',
  },
  sellerContactButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#1c492a',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  sizeOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  sizeOptionSelected: {
    borderColor: '#1c492a',
    backgroundColor: '#1c492a',
  },
  sizeText: {
    fontSize: 14,
    color: '#333',
  },
  sizeTextSelected: {
    color: '#fff',
  },
  detailsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 24,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceAmount: {
    fontSize: 20,
    fontWeight: '600',
  },
  addToCartButton: {
    backgroundColor: '#1c492a',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ServiceDetailScreen;