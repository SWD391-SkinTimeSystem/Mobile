import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar, 
  TextInput, 
  Image, 
  FlatList
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import useEvent from '../hooks/useEvent';
import { formatCurrencyVND } from '../utils/Formatted';
const EventScreen = ({navigation}) => {
  // const [activeTab, setActiveTab] = useState('Products');
  const [searchText, setSearchText] = useState('Beauty');
  const { isLoading, error, events, getEvent } = useEvent();
  useEffect(() => {
    getEvent(1, 10);
  }, []);
  if(isLoading) return <Text>Loading...</Text>;
  if(error) return <Text>Error: {error}</Text>;

  const renderStoreItem = ({ item }) => (
    <View style={styles.storeCard}>
      <TouchableOpacity
        onPress={() => navigation.navigate('EventDetail', { id: item.event_id })}
      >
      <View style={styles.storeImageContainer}>
        <Image
          source={{ uri: item.image_url }}
          style={styles.storeImage}
          // defaultSource={require('./assets/placeholder.png')}
        />
        <TouchableOpacity 
          style={styles.favoriteButton}
          onPress={() => {/* Toggle favorite */}}
        >
          <Ionicons 
            name={item.isFavorite ? "heart" : "heart-outline"}
            size={22} 
            color={item.isFavorite ? "#FF4B4B" : "#FF4B4B"} 
          />
        </TouchableOpacity>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#FFA534" />
          <Text style={styles.ratingText}>4 (10 Reviews)</Text>
        </View>
      </View>
      
      <View style={styles.storeDetails}>
        <View style={styles.storeHeaderRow}>
          <Text style={styles.storeName}>{item.title}</Text>
          
        </View>
        
        <Text style={styles.storeDescription}>{item.description}</Text>
        
        <View style={styles.addressRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.addressText} numberOfLines={1}>
            {item.location}
          </Text>
          <View style={styles.openNowButton}>
            <Text style={styles.openNowText}>Open Now</Text>
          </View>
        </View>
        
        <View style={styles.deliveryInfoRow}>
          <View style={styles.deliveryInfoItem}>
            <Ionicons name="cash-outline" size={14} color="#666" />
            <Text style={styles.deliveryInfoText}>{formatCurrencyVND(item.price)}</Text>
          </View>
          <Text style={styles.dotSeparator}>•</Text>
          <View style={styles.deliveryInfoItem}>
            <Ionicons name="time-outline" size={14} color="#666" />
            <Text style={styles.deliveryInfoText}>{item.start_date}</Text>
          </View>
          <Text style={styles.dotSeparator}>•</Text>
          <View style={styles.deliveryInfoItem}>
            <Text style={styles.deliveryTypeText}>{item.start_time}</Text>
          </View>
        </View>
      </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
   
      
      {/* <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Products' && styles.activeTabButton]}
          onPress={() => setActiveTab('Products')}
        >
          <Text style={[styles.tabText, activeTab === 'Products' && styles.activeTabText]}>Products</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'Sellers' && styles.activeTabButton]}
          onPress={() => setActiveTab('Sellers')}
        >
          <Text style={[styles.tabText, activeTab === 'Sellers' && styles.activeTabText]}>Sellers</Text>
        </TouchableOpacity>
      </View> */}
      
      <View style={styles.resultsHeader}>
        <Text style={styles.resultsTitle}>Popular events</Text>
        <Text style={styles.resultsCount}>{events.length} Results</Text>
      </View>
      
      <FlatList
        data={events}
        renderItem={renderStoreItem}
        keyExtractor={item => item.event_id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
      
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
    paddingVertical: 12,
    backgroundColor: '#FFF',
  },
  backButton: {
    padding: 4,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 36,
    backgroundColor: '#F1F1F1',
    borderRadius: 18,
    marginHorizontal: 12,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#333',
  },
  filterButton: {
    padding: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: '#FFF',
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#3C6E47',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#999',
  },
  activeTabText: {
    color: '#333',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  resultsCount: {
    fontSize: 14,
    color: '#999',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  storeCard: {
    marginBottom: 16,
    backgroundColor: '#FFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  storeImageContainer: {
    height: 150,
    position: 'relative',
  },
  storeImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    backgroundColor: '#FFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  ratingContainer: {
    position: 'absolute',
    left: 8,
    bottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333',
    marginLeft: 4,
  },
  storeDetails: {
    padding: 12,
  },
  storeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  openNowButton: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  openNowText: {
    fontSize: 12,
    color: '#3C6E47',
    fontWeight: '500',
  },
  storeDescription: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
    marginRight: 8,
  },
  deliveryInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryInfoItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryInfoText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  dotSeparator: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 6,
  },
  deliveryTypeText: {
    fontSize: 12,
    color: '#666',
  },
  bottomBar: {
    width: 134,
    height: 5,
    backgroundColor: '#333',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 8,
  }
});

export default EventScreen;