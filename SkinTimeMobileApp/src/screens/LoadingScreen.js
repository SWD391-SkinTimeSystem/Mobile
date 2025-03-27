import React, { useEffect, useRef } from 'react';
import { View, Text, Image, Animated, StyleSheet } from 'react-native';

const LoadingScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  useEffect(() => {
     setTimeout(() => {
       navigation.replace('SignInScreen'); // Chuyển đến Home
     }, 3000); // Sau 3 giây
   }, []);
  return (
    <View style={styles.container}>
      {/* Ảnh nền góc màn hình */}
      <Image 
        source={{ uri: 'https://img.freepik.com/free-vector/blossom-cherry-flowers_1182-1329.jpg?ga=GA1.1.1933856785.1742525700&semt=ais_hybrid' }} 
        style={styles.topLeft} 
      />
      <Image 
        source={{ uri: 'https://img.freepik.com/free-vector/blossom-cherry-flowers_1182-1329.jpg?ga=GA1.1.1933856785.1742525700&semt=ais_hybrid' }} 
        style={styles.bottomRight} 
      />

      {/* Logo + Text */}
      <Animated.View style={{ opacity: fadeAnim, alignItems: 'center' }}>
        <Image 
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk1c74cqvbmAf04qKtzaoH9nHBZOotYycn5A&s' }} 
          style={styles.logo} 
        />
        <Text style={styles.text}>Beauty Product</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  topLeft: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 100,
    height: 100,
    opacity: 0.3,
  },
  bottomRight: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 100,
    height: 100,
    opacity: 0.3,
  },
});

export default LoadingScreen;
