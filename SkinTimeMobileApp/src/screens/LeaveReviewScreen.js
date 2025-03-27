import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { useRoute } from "@react-navigation/native";

import { AntDesign, Ionicons } from '@expo/vector-icons';
import  useBooking  from '../hooks/useBooking';
const LeaveReviewScreen = ({ navigation }) => {
  const route = useRoute();
  const [TherapistRating, setTherapistRating] = useState(5);
  const [BookingRating, setBookingRating] = useState(5);
  const [TherapistReview, setTherapistReview] = useState('');
  const [BookingReview, setBookingReview] = useState('');
  const { bookingId, serviceName, therapistName } = route.params || {};
  const { createFeedback ,isLoading, setIsLoading, error, success } = useBooking();
  const renderBookingStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setBookingRating(i)}>
          <AntDesign
            name="star"
            size={28}
            color={i <= BookingRating ? "#FFB800" : "#C0C0C0"} // Nếu i <= rating thì vàng, ngược lại xám
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const renderTherapistStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setTherapistRating(i)}>
          <AntDesign
            name="star"
            size={28}
            color={i <= TherapistRating ? "#FFB800" : "#C0C0C0"} // Nếu i <= rating thì vàng, ngược lại xám
            style={styles.star}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };
  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = async () => {
    // Gọi API gửi review
    var data = {
        booking_id :bookingId ,
        therapist_rating : TherapistRating,
        therapist_review: TherapistReview,
        service_rating: BookingRating,
        servicet_review:BookingReview,
        date: today  
    }
    console.log(data);
    await createFeedback(data);
    if (success) {
      alert("Gửi feedback thành công!");
      navigation.goBack();
    } else {
      alert("Gửi feedback thất bại");
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
    

      {/* Order Item */}
      <View style={styles.orderItemContainer}>
        <View style={styles.productRow}>
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{serviceName}</Text>
            <Text style={styles.productDetails}>{therapistName}</Text>
          </View>
          <TouchableOpacity style={styles.reorderButton}>
            <Text style={styles.reorderButtonText}>Re-Booking</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Rating Section */}
      <View style={styles.ratingSection}>
        <Text style={styles.ratingQuestion}>Give feedback to the therapist</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Your overall rating</Text>
          <View style={styles.starsContainer}>
            {renderTherapistStars()}
          </View>
        </View>
      </View>

      {/* Review Input */}
      <View style={styles.reviewInputContainer}>
        <Text style={styles.reviewInputLabel}>Add detailed review</Text>
        <TextInput
          style={styles.reviewInput}
          placeholder="Enter here"
          multiline
          value={TherapistReview}
          onChangeText={setTherapistReview}
        />
      </View>

      {/* Add Photo Button */}
       {/* Rating Section */}
       <View style={styles.ratingSection}>
        <Text style={styles.ratingQuestion}>Thank you for using our service !</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Your overall rating</Text>
          <View style={styles.starsContainer}>
            {renderBookingStars()}
          </View>
        </View>
      </View>

      {/* Review Input */}
      <View style={styles.reviewInputContainer}>
        <Text style={styles.reviewInputLabel}>Add detailed review</Text>
        <TextInput
          style={styles.reviewInput}
          placeholder="Enter here"
          multiline
          value={BookingReview}
          onChangeText={setBookingReview}
        />
      </View>

      {/* Add Photo Button */}


      {/* Bottom Buttons */}
      <View style={styles.bottomButtonsContainer}>
        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
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
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  orderItemContainer: {
    padding: 16,
  },
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  productDetails: {
    fontSize: 14,
    color: '#666666',
    marginTop: 2,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 4,
  },
  reorderButton: {
    backgroundColor: '#3B5847',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  reorderButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
  },
  divider: {
    height: 8,
    backgroundColor: '#F2F2F2',
  },
  ratingSection: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  ratingQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  ratingContainer: {
    marginTop: 24,
  },
  ratingLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  star: {
    marginRight: 12,
  },
  reviewInputContainer: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  reviewInputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000000',
    marginBottom: 8,
  },
  reviewInput: {
    height: 100,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    textAlignVertical: 'top',
    backgroundColor: '#F9F9F9',
  },
  addPhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  addPhotoText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666666',
  },
  bottomButtonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
    backgroundColor: '#FFFFFF',
  },
  bottomButtons: {
    flexDirection: 'row',
    padding: 16,
  },
  cancelButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginRight: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  submitButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    marginLeft: 8,
    borderRadius: 8,
    backgroundColor: '#3B5847',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
});

export default LeaveReviewScreen;