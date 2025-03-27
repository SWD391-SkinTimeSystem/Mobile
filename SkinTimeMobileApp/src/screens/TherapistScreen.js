import React, { useEffect } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, ScrollView, TouchableOpacity, Image, StatusBar, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useTherapist from '../hooks/useTherapist';
const TherapistScreen = ({ navigation }) => {
     const { getTherapists, isLoading, setIsLoading, error, success, therapists } = useTherapist();
     useEffect(() => {
          getTherapists(1, 5);
     }, []);
     console.log("Danh sách thẻ:", therapists.content);
     if (isLoading) {
          return (
               <View style={styles.container}>
                    <Text>Loading...</Text>
               </View>
          );
     }
     if (error) {
          return (
               <View style={styles.container}>
                    <Text>{error}</Text>
               </View>
          );
     }
     
     const renderItem = ({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate("Booking", {therapist: item})}>
               <View style={styles.productItem}>
                    <Image source={item.avatar} style={styles.productImage} />
                    <View style={styles.productDetails}>
                         <View style={styles.productInfo}>
                              <Text style={styles.productName}>{item.name}</Text>
                              <Text style={styles.productCategory}>{item.experience} năm kinh nghiệm</Text>
                         </View>
                         <View style={styles.ratingContainer}>
                              <Ionicons name="star" size={14} color="#FFB800" />
                              <Text style={styles.ratingText}>{item.rating}</Text>
                         </View>
                    </View>
               </View>
          </TouchableOpacity>
     );




     return (
          <SafeAreaView style={styles.container}>
               <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

               {/* Header with time and network icons */}


               {/* Search header */}
               {/* <View style={styles.searchHeader}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                         <Ionicons name="arrow-back" size={22} color="#333" />
                    </TouchableOpacity>

                    <View style={styles.searchInputContainer}>
                         <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
                         <TextInput
                              style={styles.searchInput}
                              placeholder="Search.."
                              placeholderTextColor="#999"
                         />
                    </View>

                    <TouchableOpacity style={styles.filterButton}>
                         <Ionicons name="options" size={22} color="#333" />
                    </TouchableOpacity>
               </View> */}

               <ScrollView style={styles.content}>
                  

                    {/* Recent views section */}
                    <View style={styles.section}>
                         <Text style={styles.sectionTitle}>Popular Therapist</Text>
                         <FlatList
                              data={therapists}
                              renderItem={renderItem}
                              keyExtractor={(item) => item.id}
                         />
                    </View>
               </ScrollView>

               {/* Bottom home indicator bar */}
               {/* <View style={styles.homeIndicator}>
                    <View style={styles.homeIndicatorBar} />
               </View> */}
          </SafeAreaView>
     );
};

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: '#FFF',
     },
     statusBar: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 6,
     },
     time: {
          fontWeight: '600',
          fontSize: 14,
     },
     indicators: {
          flexDirection: 'row',
     },
     icon: {
          marginLeft: 6,
     },
     searchHeader: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 10,
     },
     backButton: {
          padding: 4,
     },
     searchInputContainer: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#F5F5F5',
          borderRadius: 20,
          marginHorizontal: 10,
          paddingHorizontal: 12,
     },
     searchIcon: {
          marginRight: 8,
     },
     searchInput: {
          flex: 1,
          height: 36,
          fontSize: 16,
     },
     filterButton: {
          padding: 4,
     },
     content: {
          flex: 1,
     },
     section: {
          paddingHorizontal: 16,
          marginTop: 16,
     },
     sectionTitle: {
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 12,
          color: '#333',
     },
     recentSearchItem: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
     },
     recentSearchText: {
          fontSize: 15,
          color: '#666',
     },
     removeButton: {
          fontSize: 20,
          color: '#999',
          padding: 4,
     },
     productItem: {
          flexDirection: 'row',
          marginBottom: 16,
          paddingVertical: 12,
     },
     productImage: {
          width: 100,
          height: 100,
          borderRadius: 8,
          backgroundColor: '#F0F0F0',
     },
     productDetails: {
          flex: 1,
          marginLeft: 12,
          flexDirection: 'row',
          justifyContent: 'space-between',
     },
     productInfo: {
          flex: 1,
          //     justifyContent: '',
     },
     productName: {
          fontSize: 18,
          fontWeight: '500',
          color: '#333',
     },
     productCategory: {
          fontSize: 14,
          color: '#888',
          marginVertical: 3,
     },
     productPrice: {
          fontSize: 15,
          fontWeight: '600',
          color: '#333',
     },
     ratingContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 2,
     },
     ratingText: {
          marginLeft: 4,
          color: '#666',
          fontSize: 14,
     },
     homeIndicator: {
          alignItems: 'center',
          paddingVertical: 8,
     },
     homeIndicatorBar: {
          width: 40,
          height: 5,
          backgroundColor: '#000',
          borderRadius: 3,
     },
});

export default TherapistScreen;