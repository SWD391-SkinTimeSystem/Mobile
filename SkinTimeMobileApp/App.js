import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import Header from './src/components/Header';
import Footer from './src/components/Footer';
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Header /> */}
      <AppNavigator />
      {/* <Footer /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
