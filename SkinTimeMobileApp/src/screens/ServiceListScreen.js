import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons';

const ServicelistScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Products');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const tabs = ['Products', 'Sellers'];
  const categories = ['All', 'Skin Care', 'Make Up', 'Hair Care'];
  
  const wishlistItems = [
    {
      id: '1',
      name: 'SilkSculpt Ser...',
      category: 'Skin Care',
      price: 39.00,
      rating: 4.9,
      image: 'https://revitalash.vn/wp-content/uploads/2024/03/RevitaLash-Thickening-Conditioner.png',
    },
    {
      id: '2',
      name: 'RevitaVive Glow',
      category: 'Skin Care',
      price: 49.00,
      rating: 4.7,
      image: 'https://revitalash.vn/wp-content/uploads/2024/03/RevitaLash-Thickening-Conditioner.png',
    },
    {
      id: '3',
      name: 'AquaPura Well...',
      category: 'Body Care',
      price: 25.00,
      rating: 4.5,
      image: 'https://revitalash.vn/wp-content/uploads/2024/03/RevitaLash-Thickening-Conditioner.png',
    },
    {
      id: '4',
      name: 'Ethereal Elixir',
      category: 'Perfume',
      price: 18.00,
      rating: 4.7,
      image: 'https://revitalash.vn/wp-content/uploads/2024/03/RevitaLash-Thickening-Conditioner.png',
    },
  ];

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        activeCategory === item && styles.activeCategoryItem,
      ]}
      onPress={() => setActiveCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          activeCategory === item && styles.activeCategoryText,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderProductItem = ({ item, index }) => (
    <View style={[styles.productItem, index % 2 === 0 ? { marginRight: 8 } : { marginLeft: 8 }]}>
      <View style={styles.productImageContainer}>
        <Image
          source={{ uri: `/api/placeholder/400/400` }}
          style={styles.productImage}
        />
        <TouchableOpacity style={styles.favoriteButton}>
          <AntDesign name="heart" size={18} color="#FF5757" />
        </TouchableOpacity>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
        <View style={styles.productPriceContainer}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <View style={styles.ratingContainer}>
            <AntDesign name="star" size={12} color="#FFB800" />
            <Text style={styles.ratingText}>{item.rating}</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Wishlist</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {/* Products */}
      <ScrollView style={styles.productsContainer}>
        <View style={styles.productsGrid}>
          {wishlistItems.map((item, index) => {
            if (index % 2 === 0) {
              return (
                <View key={item.id} style={styles.productRow}>
                  {renderProductItem({ item, index })}
                  {index + 1 < wishlistItems.length &&
                    renderProductItem({ item: wishlistItems[index + 1], index: index + 1 })}
                </View>
              );
            }
            return null;
          })}
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity style={styles.bottomTabItem}>
          <Feather name="home" size={22} color="#AEAEAE" />
          <Text style={styles.bottomTabText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.bottomTabItem}>
          <Feather name="search" size={22} color="#AEAEAE" />
          <Text style={styles.bottomTabText}>Explore</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.bottomTabItem, styles.activeBottomTab]}>
          <AntDesign name="heart" size={22} color="#3B5847" />
          <Text style={styles.activeBottomTabText}>Wishlist</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.bottomTabItem}>
          <Feather name="shopping-cart" size={22} color="#AEAEAE" />
          <Text style={styles.bottomTabText}>Cart</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.bottomTabItem}>
          <Feather name="user" size={22} color="#AEAEAE" />
          <Text style={styles.bottomTabText}>Profile</Text>
        </TouchableOpacity>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3B5847',
  },
  tabText: {
    fontSize: 14,
    color: '#AEAEAE',
  },
  activeTabText: {
    color: '#3B5847',
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingVertical: 12,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#EFEFEF',
  },
  activeCategoryItem: {
    backgroundColor: '#3B5847',
  },
  categoryText: {
    fontSize: 12,
    color: '#666666',
  },
  activeCategoryText: {
    color: '#FFFFFF',
  },
  productsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  productsGrid: {
    paddingTop: 16,
    paddingBottom: 76,
  },
  productRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    overflow: 'hidden',
  },
  productImageContainer: {
    position: 'relative',
    height: 120,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  productInfo: {
    padding: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  productCategory: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  productPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 2,
  },
  bottomTabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EFEFEF',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  bottomTabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  activeBottomTab: {
    borderTopWidth: 0,
  },
  bottomTabText: {
    fontSize: 10,
    color: '#AEAEAE',
    marginTop: 4,
  },
  activeBottomTabText: {
    fontSize: 10,
    color: '#3B5847',
    marginTop: 4,
  },
});

export default ServicelistScreen;