import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const DentalProfileCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Left section - Profile Image */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://example.com/placeholder-doctor.jpg' }}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </View>
        
        {/* Right section - Details */}
        <View style={styles.detailsContainer}>
          {/* Name and Specialty */}
          <View style={styles.headerContainer}>
            <Text style={styles.name}>Dr. Pearl Dental</Text>
            <Text style={styles.specialty}>Pediatric</Text>
          </View>
          
          {/* Rating */}
          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4].map((_, index) => (
              <MaterialIcons key={index} name="star" size={18} color="#FFD700" />
            ))}
          </View>
          
          {/* Price */}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>$250</Text>
            <Text style={styles.priceLabel}>Per session</Text>
          </View>
          
          {/* Action Buttons */}
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="email" size={20} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <MaterialIcons name="phone" size={20} color="#666" />
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.actionButton, styles.primaryButton]}>
              <MaterialIcons name="arrow-forward" size={20} color="#FFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 350,
  },
  imageContainer: {
    width: 100,
    height: 100,
    margin: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#CCC',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  detailsContainer: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  headerContainer: {
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  specialty: {
    fontSize: 14,
    color: '#CCC',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4080FF',
    marginRight: 4,
  },
  priceLabel: {
    fontSize: 14,
    color: '#AAA',
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3A3A3A',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  primaryButton: {
    backgroundColor: '#4080FF',
  },
});

export default DentalProfileCard;