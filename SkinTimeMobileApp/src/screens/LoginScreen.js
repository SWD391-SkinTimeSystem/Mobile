import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useRegister from '../hooks/useAuth';
const SignInScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, setIsLoading, error, success } = useRegister();
  const handleLogin = async () => {
    console.log("Login button is pressed!");
    if (isLoading) return; // Tránh gọi nhiều lần khi đang loading
    setIsLoading(true); // Bắt đầu loading
  
    try {
      console.log("Sign In Pressed");
      const data = { account: email, password: password };
      const response = await login(data); // Gọi API đăng nhập
  
      if (response && response.data) {
        const { access_token, refresh_token } = response.data;
  
        if (access_token && refresh_token) {
          // Lưu cả accessToken & refreshToken vào AsyncStorage
          await AsyncStorage.multiSet([
            ["accessToken", access_token],
            ["refreshToken", refresh_token],
          ]);
          console.log("Lưu thành công accessToken & refreshToken vào AsyncStorage");
          navigation.replace("Home"); // Chuyển đến màn hình Home
        } else {
          console.log("Login Failed: Thiếu token");
        }
      } else {
        console.log("Login Failed: Không có dữ liệu từ server");
      }
    } catch (error) {
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>
        <Text style={styles.subtitle}>Hi! Welcome back, you've been missed</Text>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
            />
            <TouchableOpacity 
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={24} 
                color="#555" 
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        
        <View style={styles.orContainer}>
          <Text style={styles.orText}>Or sign in with</Text>
        </View>
        
        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Image 
              source={{ uri: 'https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png' }} 
              style={styles.socialIcon} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image 
                source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTMZw4e6TxeOwvlJ1ErxPR3rNW9XlnbiGx8kD6ZPxYumruzTpL_Ycr2TTXkp_xGtCCbWM&usqp=CAU' }}
                style={styles.socialIcon} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image 
              source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png' }} 
              style={styles.socialIcon} 
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.noAccountContainer}>
          <Text style={styles.noAccountText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signUpText} onPress={() => navigation.navigate('Register')}>Sign Up</Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 6,
    color: '#333',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#F8F8F8',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
  },
  passwordToggle: {
    position: 'absolute',
    right: 12,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotPasswordText: {
    color: '#888',
    fontSize: 14,
  },
  signInButton: {
    backgroundColor: '#3C6E47',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 24,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  orText: {
    color: '#888',
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  noAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  noAccountText: {
    color: '#888',
    fontSize: 14,
  },
  signUpText: {
    color: '#3C6E47',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignInScreen;