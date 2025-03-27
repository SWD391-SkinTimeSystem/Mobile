import React, { useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from '../components/Header';
import SliderComponent from '../components/Slider';
import useService from '../hooks/useService';
import useEvent from '../hooks/useEvent';
import { formatCurrencyVND } from '../utils/Formatted';
// import OfferSlider from '../components/Home/OfferCard';
const HomeScreen = ({ navigation }) => {
  console.log("Navigation Object:", navigation); // Kiểm tra navigation
  const { getServices, isLoading, setIsLoading, error, success, services } = useService();
  const { events, getEvent } = useEvent();

  useEffect(() => {
    getServices();
    getEvent(1, 3);
  }, []);
  console.log("Danh sách dịch vụ:", services);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate("ServiceDetail", {id: item.id})}
    >
      <View style={styles.productImageContainer}>
        <Image source={{ uri: item.thumbnail }} style={styles.productImage} />
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons name="heart-outline" size={20} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.serviceName}</Text>
        <Text style={styles.productPrice}>{formatCurrencyVND(item.price)}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#3a584a" />
      <ScrollView style={styles.content}>

        {/* Header */}
        <Header navigation={navigation} />

        {/* Content */}
        {/* Special Offers Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcomming Events</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Event')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <SliderComponent events = {events}/>
          {/* Offer Card */}
          {/* <View style={styles.offerCard}>
            <View style={styles.offerContent}>
              <Text style={styles.offerLabel}>Festhar Sale</Text>
              <Text style={styles.offerTitle}>Get Special Offer</Text>
              <Text style={styles.offerSubtitle}>Up to 20%</Text>
              <TouchableOpacity style={styles.orderButton}>
                <Text style={styles.orderButtonText}>Order Now</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.offerImageContainer}>
              <Image
                source={{ uri: 'https://i.imgur.com/placeholder.jpg' }}
                style={styles.offerImage}
                // You would replace this with actual image from your assets
              />
            </View>
          </View> */}
          {/* <OfferSlider /> */}
        </View>

        {/* Categories Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Category</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoryList}>
            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name="water" size={24} color="#3a584a" />
              </View>
              <Text style={styles.categoryText}>Skin Care</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name="color-palette" size={24} color="#3a584a" />
              </View>
              <Text style={styles.categoryText}>Make Up</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name="cut" size={24} color="#3a584a" />
              </View>
              <Text style={styles.categoryText}>Hair Care</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.categoryItem}>
              <View style={styles.categoryIcon}>
                <Ionicons name="flask" size={24} color="#3a584a" />
              </View>
              <Text style={styles.categoryText}>Perfume</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recommended Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended For You</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Event')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.productList}>
            {/* <TouchableOpacity style={styles.productCard} onPress={() => navigation.navigate('ServiceDetail')}>
              <View style={styles.productImageContainer}>
                <Image
                  source={{ uri: 'https://i.imgur.com/placeholder1.jpg' }}
                  style={styles.productImage}
                />
                <TouchableOpacity style={styles.favoriteButton}>
                  <Ionicons name="heart-outline" size={20} color="#000" />
                </TouchableOpacity>
              </View>
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Face Serum</Text>
                <Text style={styles.productPrice}>$24.99</Text>
              </View>
            </TouchableOpacity> */}
            <FlatList
              data={services}
              nestedScrollEnabled={true}
              keyExtractor={(item) => item.id} // Đảm bảo mỗi item có id duy nhất
              renderItem={renderItem}
              numColumns={2} // Hiển thị 2 cột (nếu cần)
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      {/* <Footer /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  statusIcons: {
    flexDirection: 'row',
    gap: 5,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 12,
    color: '#888',
  },





  orderButton: {
    backgroundColor: '#3a584a',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  orderButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  offerImageContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  categoryList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryItem: {
    alignItems: 'center',
    width: '22%',
  },
  categoryIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f5f3',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    textAlign: 'center',
  },
  productList: {
    flexDirection: 'row', // Sắp xếp ngang
    flexWrap: 'wrap', // Tự động xuống dòng khi hết chỗ
    justifyContent: 'space-between', // Canh đều các phần tử
  },
  productCard: {
    width: '48%', // Để có 2 sản phẩm trên mỗi dòng
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10, // Khoảng cách giữa các dòng
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 120, // Điều chỉnh kích thước ảnh
    borderRadius: 10,
  },
  favoriteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    padding: 5,
  },
  productInfo: {
    marginTop: 5,
    alignItems: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 12,
    color: 'gray',
    textAlign:'left'
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeTabText: {
    color: '#3a584a',
    fontWeight: '500',
  },
});

export default HomeScreen;


