import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import useEvent from '../hooks/useEvent';
import { formatCurrencyVND } from '../utils/Formatted';
const EventDetailScreen = ({navigation}) => {
     const route = useRoute();
     const { id } = route.params;
     console.log(id);
     const { isLoading,eventDetail, getDetail, error} = useEvent();
     useEffect(() => {
          getDetail(id);
     }
     , []);
     if(isLoading) return <Text>Loading...</Text>;
     if(error) return <Text>Error: {error}</Text>;
     console.log(eventDetail);
     return (
          <View style={styles.container}>
               <ScrollView >
                    {/* Header Image */}
                    <View style={styles.headerContainer}>
                         <Image
                              source={{ uri: eventDetail?.image }}
                              style={styles.headerImage}
                         />
                         {/* <View style={styles.headerOverlay}>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="arrow-back" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.rightIcons}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="share-social-outline" size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="heart-outline" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View> */}
                    </View>

                    {/* Store Info */}
                    <View style={styles.storeInfoContainer}>
                         <View style={styles.storeNameRow}>
                              <Text style={styles.storeName}>{eventDetail?.title}</Text>
                              <View style={styles.verifiedBadge}>
                                   <Ionicons name="checkmark-circle" size={16} color="green" />
                              </View>
                         </View>
                         <Text style={styles.storeCategories}>Số lượng vé còn lại: {eventDetail?.available_ticket}</Text>

                         <View style={styles.locationContainer}>
                              <MaterialIcons name="location-on" size={16} color="green" />
                              <Text style={styles.locationText}>{eventDetail?.location}</Text>
                         </View>

                         <View style={styles.timeContainer}>
                              <Ionicons name="cash-outline" size={16} color="green" />
                              <Text style={styles.timeText}>{formatCurrencyVND(eventDetail?.ticket_price)}</Text>
                         </View>
                    </View>

                    {/* Stats */}
                    {/* <View style={styles.statsContainer}>
                         <View style={styles.statItem}>
                              <View style={styles.statIconContainer}>
                                   <Ionicons name="people" size={20} color="#333" />
                              </View>
                              <View>
                                   <Text style={styles.statValue}>7,500+</Text>
                                   <Text style={styles.statLabel}>Customer</Text>
                              </View>
                         </View>

                         <View style={styles.statItem}>
                              <View style={styles.statIconContainer}>
                                   <MaterialIcons name="inventory" size={20} color="#333" />
                              </View>
                              <View>
                                   <Text style={styles.statValue}>250+</Text>
                                   <Text style={styles.statLabel}>Products</Text>
                              </View>
                         </View>

                         <View style={styles.statItem}>
                              <View style={styles.statIconContainer}>
                                   <Ionicons name="star" size={20} color="#333" />
                              </View>
                              <View>
                                   <Text style={styles.statValue}>4.9+</Text>
                                   <Text style={styles.statLabel}>Rating</Text>
                              </View>
                         </View>

                         <View style={styles.statItem}>
                              <View style={styles.statIconContainer}>
                                   <MaterialIcons name="rate-review" size={20} color="#333" />
                              </View>
                              <View>
                                   <Text style={styles.statValue}>4,956</Text>
                                   <Text style={styles.statLabel}>Review</Text>
                              </View>
                         </View>
                    </View> */}

                    {/* Tabs */}


                    {/* About */}
                    <View style={styles.aboutContainer}>
                         <Text style={styles.sectionTitle}>About</Text>
                         <Text style={styles.aboutText}>
                              {eventDetail?.content}
                         </Text>
                    </View>

                    {/* Seller */}


                    {/* Working Hours */}
                    <View style={styles.workingHoursContainer}>
                         <Text style={styles.sectionTitle}>Event Hours</Text>
                         <View style={styles.workingHoursRow}>
                              <Text style={styles.dayText}>Time Start</Text>
                              <Text style={styles.hoursText}>{eventDetail?.start_time}</Text>
                         </View>
                         <View style={styles.workingHoursRow}>
                              <Text style={styles.dayText}>Time End</Text>
                              <Text style={styles.hoursText}>{eventDetail?.end_time}</Text>
                         </View>
                    </View>


               </ScrollView>
               <View style={styles.appointmentButtonContainer}>
                    <TouchableOpacity style={styles.appointmentButton} onPress={() => navigation.navigate('CheckoutEvent', {
                         eventId: eventDetail?.id,
                         title: eventDetail?.title,
                         price: eventDetail?.ticket_price,
                         destination: eventDetail?.location,
                    })}>
                         <Text style={styles.appointmentButtonText}>Buy Ticket</Text>
                    </TouchableOpacity>
               </View>
          </View>
     );
};

const styles = StyleSheet.create({
     appointmentButtonContainer: {
          padding: 16,
        },
        appointmentButton: {
          height: 56,
          borderRadius: 28,
          backgroundColor: '#3a584a',
          justifyContent: 'center',
          alignItems: 'center',
        },
        appointmentButtonText: {
          fontSize: 16,
          fontWeight: '600',
          color: '#FFFFFF',
        },
     container: {
          flex: 1,
          backgroundColor: '#fff',
     },
     headerContainer: {
          height: 200,
          position: 'relative',
     },
     headerImage: {
          width: '100%',
          height: '100%',
          resizeMode: 'cover',
     },
     headerOverlay: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
     },
     headerIcons: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
          paddingTop: 50,
     },
     iconButton: {
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 4,
     },
     rightIcons: {
          flexDirection: 'row',
     },
     storeInfoContainer: {
          padding: 16,
     },
     storeNameRow: {
          flexDirection: 'row',
          alignItems: 'center',
     },
     storeName: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#333',
     },
     verifiedBadge: {
          marginLeft: 8,
     },
     storeCategories: {
          color: '#666',
          marginTop: 4,
          fontSize: 14,
     },
     locationContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 12,
     },
     locationText: {
          marginLeft: 6,
          color: '#666',
          fontSize: 14,
     },
     timeContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 8,
     },
     timeText: {
          marginLeft: 6,
          color: '#666',
          fontSize: 14,
     },
     statsContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 12,
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
          marginBottom: 8,
     },
     statItem: {
          alignItems: 'center',
          flexDirection: 'col',
     },
     statIconContainer: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#f0f0f0',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 8,
     },
     statValue: {
          fontWeight: 'bold',
          fontSize: 16,
          color: '#333',
     },
     statLabel: {
          fontSize: 12,
          color: '#666',
     },
     tabContainer: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderBottomWidth: 1,
          borderBottomColor: '#f0f0f0',
          marginBottom: 16,
     },
     tabItem: {
          paddingVertical: 12,
          paddingHorizontal: 16,
          position: 'relative',
     },
     tabText: {
          color: '#666',
          fontSize: 16,
     },
     activeTab: {},
     activeTabText: {
          color: '#333',
          fontWeight: 'bold',
     },
     activeTabIndicator: {
          position: 'absolute',
          bottom: 0,
          left: 16,
          right: 16,
          height: 3,
          backgroundColor: '#333',
          borderRadius: 1.5,
     },
     aboutContainer: {
          paddingHorizontal: 16,
          paddingBottom: 16,
     },
     sectionTitle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333',
          marginBottom: 12,
     },
     aboutText: {
          fontSize: 14,
          color: '#666',
          lineHeight: 20,
     },
     readMoreLink: {
          color: '#4F7942',
          fontWeight: 'bold',
     },
     sellerContainer: {
          paddingHorizontal: 16,
          paddingBottom: 16,
     },
     sellerProfile: {
          flexDirection: 'row',
          alignItems: 'center',
     },
     sellerImage: {
          width: 50,
          height: 50,
          borderRadius: 25,
     },
     sellerInfo: {
          flex: 1,
          marginLeft: 12,
     },
     sellerName: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#333',
     },
     sellerBusiness: {
          fontSize: 14,
          color: '#666',
     },
     sellerActions: {
          flexDirection: 'row',
     },
     messageButton: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: 'green',
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 8,
     },
     callButton: {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: '#f0f0f0',
          justifyContent: 'center',
          alignItems: 'center',
     },
     workingHoursContainer: {
          paddingHorizontal: 16,
          paddingBottom: 20,
     },
     workingHoursRow: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 8,
     },
     dayText: {
          fontSize: 14,
          color: '#666',
     },
     hoursText: {
          fontSize: 14,
          color: '#333',
     },
});

export default EventDetailScreen;