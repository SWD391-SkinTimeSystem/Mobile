import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  StatusBar, 
  SafeAreaView,
  Image,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ReviewScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState('Verified');
  
  const reviewStats = [
    { rating: 5, count: 80, width: '80%' },
    { rating: 4, count: 15, width: '15%' },
    { rating: 3, count: 3, width: '3%' },
    { rating: 2, count: 1, width: '1%' },
    { rating: 1, count: 1, width: '1%' },
  ];
  
  const reviews = [
    {
      id: 1,
      name: 'Dale Thiel',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      rating: 5.0,
      time: '11 months ago',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      images: []
    },
    {
      id: 2,
      name: 'Tiffany Nitzsche',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 5.0,
      time: '11 months ago',
      comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
      images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150']
    }
  ];
  
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <AntDesign 
          key={i} 
          name="star" 
          size={16} 
          color={i <= rating ? "#FFB800" : "#E0E0E0"}
          style={{ marginRight: 2 }}
        />
      );
    }
    return stars;
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Review</Text>
        <View style={{ width: 24 }} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* Rating Overview */}
        <View style={styles.ratingOverview}>
          <View style={styles.ratingHeader}>
            <Text style={styles.ratingScore}>4.9</Text>
            <View style={styles.starsContainer}>
              {renderStars(4.9)}
            </View>
            <Text style={styles.reviewCount}>(127 Reviews)</Text>
          </View>
          
          {/* Rating Bars */}
          <View style={styles.ratingBars}>
            {reviewStats.map((stat) => (
              <View key={stat.rating} style={styles.ratingBarContainer}>
                <Text style={styles.ratingNumber}>{stat.rating}</Text>
                <View style={styles.barBackground}>
                  <View 
                    style={[
                      styles.barFill, 
                      { width: stat.width, backgroundColor: stat.rating >= 4 ? '#2e7d32' : '#9e9e9e' }
                    ]} 
                  />
                </View>
              </View>
            ))}
          </View>
        </View>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#9e9e9e" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search in reviews"
            placeholderTextColor="#9e9e9e"
          />
        </View>
        
        {/* Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          <TouchableOpacity 
            style={[styles.filterChip, selectedFilter === 'All' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('All')}
          >
            <Text style={[styles.filterText, selectedFilter === 'All' && styles.filterTextActive]}>
              # Filter
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterChip, selectedFilter === 'Verified' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('Verified')}
          >
            <Text style={[styles.filterText, selectedFilter === 'Verified' && styles.filterTextActive]}>
              Verified
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterChip, selectedFilter === 'Latest' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('Latest')}
          >
            <Text style={[styles.filterText, selectedFilter === 'Latest' && styles.filterTextActive]}>
              Latest
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterChip, selectedFilter === 'Detailed' && styles.filterChipActive]}
            onPress={() => setSelectedFilter('Detailed')}
          >
            <Text style={[styles.filterText, selectedFilter === 'Detailed' && styles.filterTextActive]}>
              Detailed Reviews
            </Text>
          </TouchableOpacity>
        </ScrollView>
        
        {/* Reviews List */}
        <View style={styles.reviewsList}>
          {reviews.map((review) => (
            <View key={review.id} style={styles.reviewItem}>
              <View style={styles.reviewHeader}>
                <Image source={{ uri: review.avatar }} style={styles.avatar} />
                <View style={styles.reviewUserInfo}>
                  <Text style={styles.userName}>{review.name}</Text>
                  <View style={styles.reviewRating}>
                    {renderStars(review.rating)}
                    <Text style={styles.ratingValue}>{review.rating.toFixed(1)}</Text>
                  </View>
                </View>
                <Text style={styles.reviewTime}>{review.time}</Text>
              </View>
              
              <Text style={styles.reviewComment}>{review.comment}</Text>
              
              {review.images.length > 0 && (
                <View style={styles.reviewImagesContainer}>
                  {review.images.map((image, index) => (
                    <Image key={index} source={{ uri: image }} style={styles.reviewImage} />
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* Write Review Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.writeReviewButton}>
          <Text style={styles.writeReviewButtonText}>Write Review</Text>
        </TouchableOpacity>
        <View style={styles.homeIndicator} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  },
  scrollView: {
    flex: 1,
  },
  ratingOverview: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  ratingHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  ratingScore: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  reviewCount: {
    color: '#757575',
    fontSize: 14,
  },
  ratingBars: {
    marginTop: 8,
  },
  ratingBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  ratingNumber: {
    width: 16,
    fontSize: 14,
    color: '#757575',
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginLeft: 8,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 12,
    height: 40,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#212121',
  },
  filtersContainer: {
    marginBottom: 16,
  },
  filtersContent: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#2e7d32',
  },
  filterText: {
    fontSize: 14,
    color: '#757575',
  },
  filterTextActive: {
    color: '#fff',
  },
  reviewsList: {
    paddingHorizontal: 16,
  },
  reviewItem: {
    marginBottom: 20,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  reviewUserInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  reviewRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: 14,
    color: '#757575',
    marginLeft: 4,
  },
  reviewTime: {
    fontSize: 12,
    color: '#9e9e9e',
  },
  reviewComment: {
    fontSize: 14,
    color: '#212121',
    lineHeight: 20,
    marginBottom: 8,
  },
  reviewImagesContainer: {
    flexDirection: 'row',
  },
  reviewImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  writeReviewButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#2e7d32',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  writeReviewButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  homeIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#e0e0e0',
    borderRadius: 2.5,
    marginTop: 8,
  }
});

export default ReviewScreen;