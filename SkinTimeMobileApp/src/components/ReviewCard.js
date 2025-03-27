import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

// Sample data for reviews
const sampleReviews = [
  {
    id: '1',
    name: 'Dale Thiel',
    timeAgo: '11 months ago',
    reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
    rating: 5.0,
    profileImage: 'https://lirp.cdn-website.com/62372115/dms3rep/multi/opt/slide1-640w.jpg' // Replace with your actual image path
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    timeAgo: '2 months ago',
    reviewText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    rating: 4.5,
    profileImage:'https://lirp.cdn-website.com/62372115/dms3rep/multi/opt/slide1-640w.jpg'
  },
  {
    id: '3',
    name: 'Michael Chen',
    timeAgo: '3 weeks ago',
    reviewText: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    rating: 4.0,
    profileImage: 'https://lirp.cdn-website.com/62372115/dms3rep/multi/opt/slide1-640w.jpg'
  }
];

const ReviewItem = ({ review }) => {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(review.rating);
    const hasHalfStar = review.rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <AntDesign key={i} name="star" size={14} color="#FFC107" style={styles.star} />
        );
      } else if (hasHalfStar && i === fullStars) {
        stars.push(
          <AntDesign key={i} name="starhalf" size={14} color="#FFC107" style={styles.star} />
        );
      } else {
        stars.push(
          <AntDesign key={i} name="staro" size={14} color="#FFC107" style={styles.star} />
        );
      }
    }
    
    return stars;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image 
            source={review.profileImage} 
            style={styles.profileImage} 
            defaultSource="abaoiabaoi"
          />
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{review.name}</Text>
            <Text style={styles.timeAgo}>{review.timeAgo}</Text>
          </View>
        </View>
      </View>
      
      <Text style={styles.reviewText}>{review.reviewText}</Text>
      
      <View style={styles.ratingContainer}>
        <View style={styles.stars}>
          {renderStars()}
        </View>
        <Text style={styles.ratingValue}>{review.rating.toFixed(1)}</Text>
      </View>
    </View>
  );
};

const ReviewsComponent = () => {
  return (
    <FlatList
      data={sampleReviews}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ReviewItem review={item} />}
      contentContainerStyle={styles.listContainer}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F0F0F0', // Placeholder color while loading
  },
  nameContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  timeAgo: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  star: {
    marginRight: 2,
  },
  ratingValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});

// If you only want to show a single review (like in the image)
const SingleReviewComponent = () => {
  const review = sampleReviews[0]; // Use the first review from the sample data
  
  return <ReviewItem review={review} />;
};

export { ReviewsComponent, SingleReviewComponent };
export default SingleReviewComponent; // Default export is the single review component