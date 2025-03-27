// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
// import Carousel from 'react-native-reanimated-carousel';

// const { width } = Dimensions.get('window');

// const offers = [
//   {
//     id: '1',
//     label: 'Festhar Sale',
//     title: 'Get Special Offer',
//     discount: 'Up to 20%',
//     image: 'https://i.imgur.com/placeholder.jpg',
//   },
//   {
//     id: '2',
//     label: 'Summer Discount',
//     title: 'Limited Time Offer',
//     discount: 'Up to 30%',
//     image: 'https://i.imgur.com/placeholder1.jpg',
//   },
//   {
//     id: '3',
//     label: 'Winter Sale',
//     title: 'Biggest Discounts',
//     discount: 'Up to 50%',
//     image: 'https://i.imgur.com/placeholder2.jpg',
//   },
// ];

// const OfferSlider = () => {
//   const renderItem = ({ item }) => (
//     <View style={styles.offerCard}>
//       <View style={styles.offerContent}>
//         <Text style={styles.offerLabel}>{item.label}</Text>
//         <Text style={styles.offerTitle}>{item.title}</Text>
//         <Text style={styles.offerSubtitle}>{item.discount}</Text>
//         <TouchableOpacity style={styles.orderButton}>
//           <Text style={styles.orderButtonText}>Order Now</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.offerImageContainer}>
//         <Image source={{ uri: item.image }} style={styles.offerImage} />
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.carouselContainer}>
//       <Carousel
//         loop
//         width={width}
//         height={180}
//         autoPlay={true}
//         data={offers}
//         scrollAnimationDuration={3000}
//         renderItem={renderItem}
//         mode="parallax"
//         modeConfig={{
//           parallaxScrollingScale: 0.9,
//           parallaxScrollingOffset: 50,
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   carouselContainer: {
//     marginVertical: 10,
//     alignItems: 'center',
//      width: '100%',
//   },
//   offerCard: {
//     backgroundColor: '#f8f8f8',
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     overflow: 'hidden',
//     width: '100%',
//     height: '100%',
//   },
//   offerContent: {
//     flex: 1,
//   },
//   offerLabel: {
//     fontSize: 12,
//     fontWeight: '500',
//     marginBottom: 4,
//   },
//   offerTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 4,
//   },
//   offerSubtitle: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#3a584a',
//     marginBottom: 12,
//   },
//   orderButton: {
//     backgroundColor: '#3a584a',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     alignSelf: 'flex-start',
//   },
//   orderButtonText: {
//     color: 'white',
//     fontSize: 12,
//     fontWeight: '500',
//   },
//   offerImageContainer: {
//     width: 120,
//     height: 120,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   offerImage: {
//     width: '100%',
//     height: '100%',
//     resizeMode: 'contain',
//   },
// });

// export default OfferSlider;