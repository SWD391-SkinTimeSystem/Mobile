import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";

import LoginScreen from "../screens/LoginScreen";
// import RegisterScreen from "../screens/RegisterScreen";

// import HomeScreen from "../screens/HomeScreen";

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false }}/>        
      {/* <Stack.Screen name="Register" component={RegisterScreen} options={{headerShown: false }}/>         */}
      {/* <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Home" }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
