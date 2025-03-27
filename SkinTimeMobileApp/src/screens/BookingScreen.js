import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from "@react-navigation/native";
import useTherapist from '../hooks/useTherapist';
import { formatDateToDay, formatTime } from '../utils/Formatted';
const BookingScreen = ({ navigation }) => {
  const route = useRoute();
  const { therapist } = route.params;
  const { schedules, getScheduleByTherapist, isLoading, setIsLoading, error, success } = useTherapist();
  // Time of day options]
  const timesOfDay = ['Morning', 'Afternoon', 'Evening'];
  useEffect(() => {
    getScheduleByTherapist(therapist.id);
  }, []);
  const renderContent = () => {
    if (isLoading) return <Text>Loading...</Text>;
    if (error) return <Text></Text>;
    if (success) return <Text></Text>;
    return null; // Để tránh lỗi nếu không có trạng thái nào khớp
  };
  console.log(schedules.availability);
  var therapistId = schedules.therapist_id;
  // Generate dates dynamically
  const { days, month } = useMemo(() => {
    const today = new Date();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const generatedDays = [];
    for (let i = 0; i < 6; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      generatedDays.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.toISOString().split('T')[0],
        fullDate: date.toISOString().split('T')[0]
      });
    }
    return {
      days: generatedDays,
      month: `${monthNames[today.getMonth()]} ${today.getFullYear()}`
    };
  }, []);

  // States
  const [selectedDate, setSelectedDate] = useState(days[0].date);
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState('Morning');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  console.log(selectedDate);
  console.log(selectedTimeSlot);
  console.log(selectedTimeOfDay);
  // Generate time slots based on time of day
  const timeSlots = useMemo(() => {
    switch (selectedTimeOfDay) {
      case 'Morning':
        return ['09:00:00', '09:30:00', '10:00:00', '10:30:00'];
      case 'Afternoon':
        return ['12:00:00', '12:30:00', '13:00:00', '13:30:00', '14:00:00', '14:30:00', '15:00:00', '15:30:00'];
      case 'Evening':
        return ['16:00:00', '16:30:00', '17:00:00'];
      default:
        return [];
    }
  }, [selectedTimeOfDay]);

  // Handlers
  const handleTimeOfDayChange = useCallback((time) => {
    setSelectedTimeOfDay(time);
    // Reset time slot when changing time of day
    setSelectedTimeSlot(timeSlots[0]);
  }, [timeSlots]);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
  }, []);

  const handleTimeSlotSelect = useCallback((slot) => {
    setSelectedTimeSlot(slot);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {renderContent()}
      <StatusBar barStyle="light-content" />

      <ScrollView style={styles.content}>
        {/* Doctor Card */}
        <View style={styles.doctorCard}>
          <Image
            source={{ uri: therapist.avatar }}
            style={styles.doctorImage}
          />

          <View style={styles.doctorInfo}>
            <Text style={styles.doctorName}>{therapist.name}</Text>
            <Text style={styles.doctorSpecialty}>Pediatric</Text>

            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons
                  key={star}
                  name="star"
                  size={16}
                  color="#FFD700"
                />
              ))}
            </View>

            <Text style={styles.sessionPrice}>200 đánh giá</Text>
          </View>
        </View>
        <View style={styles.aboutSection}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.aboutText}>
            {therapist.about}
          </Text>
        </View>
        {/* Calendar Section */}
        <View style={styles.calendar}>
          <View style={styles.calendarSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{month}</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.daysContainer}
            >
              {days.map((item) => (
                <TouchableOpacity
                  key={item.date}
                  style={[
                    styles.dayItem,
                    selectedDate === item.date && styles.selectedDayItem
                  ]}
                  onPress={() => handleDateSelect(item.date)}
                >
                  <Text style={[styles.dayText, selectedDate === item.date && styles.selectedDayText]}>
                    {item.day}
                  </Text>
                  <Text
                    style={[
                      styles.dateText,
                      selectedDate === item.date && styles.selectedDateText
                    ]}
                  >
                    {formatDateToDay(item.date)}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Time of Day Section */}
          <View style={styles.timeOfDaySection}>
            {timesOfDay.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeOfDayButton,
                  selectedTimeOfDay === time && styles.selectedTimeOfDayButton
                ]}
                onPress={() => handleTimeOfDayChange(time)}
              >
                <Text
                  style={[
                    styles.timeOfDayText,
                    selectedTimeOfDay === time && styles.selectedTimeOfDayText
                  ]}
                >
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Time Slots Section */}
          <View style={styles.timeSlotsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Available Time Slots</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.timeSlotsContainer}
            >
              {timeSlots.map((time) => {
                // Kiểm tra tính khả dụng của time slot
                const isAvailable = schedules.availability?.[selectedDate]?.[time] === true;

                return (
                  <TouchableOpacity
                    key={time}
                    style={[
                      styles.timeSlot,
                      selectedTimeSlot === time && styles.selectedTimeSlot,
                      !isAvailable && styles.disabledTimeSlot // Thêm style cho slot không khả dụng
                    ]}
                    onPress={() => isAvailable && handleTimeSlotSelect(time)} // Chỉ cho phép chọn khi khả dụng
                    disabled={!isAvailable} // Vô hiệu hóa nút khi không khả dụng
                  >
                    <Text
                      style={[
                        styles.timeSlotText,
                        selectedTimeSlot === time && styles.selectedTimeSlotText,
                        !isAvailable && styles.disabledTimeSlotText // Thêm style text cho slot không khả dụng
                      ]}
                    >
                      {formatTime(time)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </ScrollView>

      {/* Appointment Button */}
      <View style={styles.appointmentButtonContainer}>
        <TouchableOpacity
          style={styles.appointmentButton}
          onPress={() => navigation.navigate('PaymentMethods', {
            selectedDate,
            selectedTimeSlot,
            therapistId
          })}
        >
          <Text style={styles.appointmentButtonText}>Appointment Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  aboutSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff',

  },
  aboutText: {
    fontSize: 14,
    color: '#3a584a',
  },
  disabledTimeSlot: {
    backgroundColor: '#F5F5F5', // Màu xám nhạt mờ
    borderColor: '#E0E0E0', // Màu border nhạt
    opacity: 0.5, // Giảm độ mờ để nhấn mạnh trạng thái không khả dụng
  },
  disabledTimeSlotText: {
    color: '#BDBDBD', // Màu chữ xám nhạt
    textDecorationLine: 'line-through', // Gạch ngang để nhấn mạnh
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2D2D2D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  doctorCard: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    // backgroundColor: '#3a584a',
  },
  doctorImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#3D3D3D',
  },
  doctorInfo: {
    flex: 1,
    marginLeft: 12,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3333333333',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#3333333333',
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  sessionPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3a584a',
  },
  contactButtons: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  activeContactButton: {
    backgroundColor: '#448AFF',
  },
  calendar: {
    marginBottom: 24,
    // backgroundColor: '#3a584a',

  },
  calendarSection: {
    marginBottom: 24,
    // backgroundColor: '#3a584a',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3a584a',
  },
  navigationButtons: {
    flexDirection: 'row',
  },
  navigationButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  daysContainer: {
    flexDirection: 'row',
  },
  dayItem: {
    width: 50,
    height: 70,
    borderRadius: 25,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedDayItem: {
    backgroundColor: '#3a584a',

  },
  dayText: {
    fontSize: 12,
    color: '#3a584a',
    marginBottom: 4,
  },
  selectedDayText: {
    color: '#FFFFFF',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#3a584a',
  },
  selectedDateText: {
    color: '#FFFFFF',
  },
  timeOfDaySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 24,
  },
  timeOfDayButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  selectedTimeOfDayButton: {
    backgroundColor: '#3a584a',
  },
  timeOfDayText: {
    fontSize: 14,
    color: '#3a584a',
  },
  selectedTimeOfDayText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
  timeSlotsSection: {
    // marginBottom: 24,

  },
  timeSlotsContainer: {
    flexDirection: 'row',
  },
  timeSlot: {
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  selectedTimeSlot: {
    backgroundColor: '#3a584a',
  },
  timeSlotText: {
    fontSize: 14,
    color: '#3a584a',
  },
  selectedTimeSlotText: {
    color: '#FFFFFF',
    fontWeight: '500',
  },
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
});

export default BookingScreen;