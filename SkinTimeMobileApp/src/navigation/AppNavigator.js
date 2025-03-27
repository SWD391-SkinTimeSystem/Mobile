import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/LoginScreen";
import LoadingScreen from "../screens/LoadingScreen";
import AppointmentScreen from "../screens/AppointmentScreen";
import BookingScreen from "../screens/BookingScreen";
import EventScreen from "../screens/EventScreen";
import NewPasswordScreen from "../screens/ForgotPassword";
import LeaveReviewScreen from "../screens/LeaveReviewScreen";
import NotificationScreen from "../screens/NotificationScreen";
import PaymentMethodsScreen from "../screens/PaymentMethodsScreen";
import PaymentSuccessScreen from "../screens/PaymentSuccessScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ReviewScreen from "../screens/ReviewScreen";
import ServicelistScreen from "../screens/ServiceListScreen";
import ServiceDetailScreen from "../screens/ServiceScreen";
import TherapistScreen from "../screens/TherapistScreen";
import TrackOrderScreen from "../screens/TrackOrderScreen";
import EventDetailScreen from "../screens/EventDetailScreen";
import CheckoutEvent from "../screens/CheckoutEvent";
import BottomTabs from "./BottomTabs";
import ProfileScreen from "../screens/ProfileScreen";
const Stack = createNativeStackNavigator();
// định hình các navigator ở trong đây. 
// Tạo các screen lớn ở trong screens và import vào đây
export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown: false }}/>        
      <Stack.Screen name="SignInScreen" component={LoginScreen} options={{headerShown: false }}/>        
      <Stack.Screen name="Home" component={BottomTabs} options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="Appointment" component={AppointmentScreen} options={{ title: "My Appointment" }} />
      <Stack.Screen name="Booking" component={BookingScreen} options={{ title: "Booking"}} />
      <Stack.Screen name="Event" component={EventScreen} options={{ title: "Event"}} />
      <Stack.Screen name="ForgotPassword" component={NewPasswordScreen} options={{ title: "ForgotPassword", headerShown: false }} />
      <Stack.Screen name="LeaveReview" component={LeaveReviewScreen} options={{ title: "Review Service" }} />
      <Stack.Screen name="Notification" component={NotificationScreen} options={{ title: "Notification" , headerShown: false  }} />
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} options={{ title: "PaymentMethods" , headerShown: false  }} />
      <Stack.Screen name="PaymentSuccess" component={PaymentSuccessScreen} options={{ title: "PaymentSuccess" }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: "Register", headerShown: false  }} />
      <Stack.Screen name="Review" component={ReviewScreen} options={{ title: "Review" }} />
      <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={{ title: "ServiceDetail" }} />
      <Stack.Screen name="ServiceList" component={ServicelistScreen} options={{ title: "ServiceList", headerShown: false  }} />
      <Stack.Screen name="Therapist" component={TherapistScreen} options={{ title: "Therapist" }} />
      <Stack.Screen name="TrackOrder" component={TrackOrderScreen} options={{ title: "Appointment Detail"}} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} options={{ title: "EventDetail"}} />
      <Stack.Screen name="CheckoutEvent" component={CheckoutEvent} options={{ title: "CheckoutEvent" }} />
      {/* <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "My Profile" }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
