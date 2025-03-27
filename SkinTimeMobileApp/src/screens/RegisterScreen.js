import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useRegister from '../hooks/useAuth';
const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { register, isLoading, setIsLoading, error, success } = useRegister();
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleAgreeToTerms = () => {
    setAgreeToTerms(!agreeToTerms);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(Platform.OS === 'ios');
    setDateOfBirth(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const handleRegister = async () => {
    if (isLoading) return; // Tránh gọi nhiều lần khi đang loading
    setIsLoading(true); // Bắt đầu loading
    try {
      console.log("Sign Up Pressed");
     
      // Đảm bảo dateOfBirth là đối tượng Date
      const formattedDate = dateOfBirth instanceof Date 
        ? dateOfBirth.toISOString().split("T")[0] 
        : new Date(dateOfBirth).toISOString().split("T")[0];
  
      var data = {
        email: email,
        fullName: name,
        phone: phoneNumber,
        password: password,
        gender: "",
        dateOfBirth: formattedDate, // Format đúng
        isTermOfUseAccepted: agreeToTerms,
      };
      console.log("Bắt đầu đăng ký...");
      console.log("Dữ liệu gửi đi:", data);
      console.log("Dữ liệu gửi đi:", JSON.stringify(data));
  
      const response = await register(data); // Gọi API
      console.log("Sign Up Success:", response);
  
    } catch (error) {
      console.error("Sign Up Error:", error);
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Fill your information below or register with your social account.
        </Text>

        {/* Name Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          // placeholder="Ex. John Doe"
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          // placeholder="example@gmail.com"
          />
        </View>

        {/* Phone Number Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          // placeholder="+1 (000) 000-0000"
          />
        </View>

        {/* Date of Birth Input */}
        {/* <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Date of Birth</Text>
          <TouchableOpacity onPress={showDatepicker} style={styles.input}>
            <Text style={styles.dateText}>
              {formatDate(dateOfBirth)}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={dateOfBirth}
              mode={'date'}
              is24Hour={true}
              display="default"
              onChange={onDateChange}
            />
          )}
        </View> */}

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!isPasswordVisible}
            // placeholder="••••••••••••"
            />
            <TouchableOpacity
              style={styles.visibilityIcon}
              onPress={togglePasswordVisibility}
            >
              <Ionicons
                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={22}
                color="#777"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Terms and Conditions Checkbox */}
        <View style={styles.termsContainer}>
          <TouchableOpacity
            style={[
              styles.checkbox,
              { backgroundColor: agreeToTerms ? '#3b5441' : 'transparent' }
            ]}
            onPress={toggleAgreeToTerms}
          >
            {agreeToTerms && (
              <Ionicons name="checkmark" size={16} color="white" />
            )}
          </TouchableOpacity>
          <Text style={styles.termsText}>
            Agree with
            <Text style={styles.termsLink}> Terms & Condition</Text>
          </Text>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={handleRegister}
          disabled={isLoading || !agreeToTerms} // Vô hiệu hóa nút khi đang loading hoặc chưa đồng ý điều khoản
        >
          {isLoading ? (
            <ActivityIndicator size="small" color="#ffffff" /> // Hiển thị vòng tròn xoay khi loading
          ) : (
            <Text style={styles.signUpButtonText}>Sign Up</Text> // Hiển thị nút bình thường
          )}
        </TouchableOpacity>

        {/* Social Sign Up Section */}
        <View style={styles.socialSignUpContainer}>
          <Text style={styles.socialSignUpText}>Or sign up with</Text>
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
        </View>

        {/* Sign In Link */}
        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 44,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    paddingHorizontal: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: '#f9f9f9',
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  visibilityIcon: {
    paddingHorizontal: 12,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 14,
    color: '#333',
  },
  termsLink: {
    color: '#3b5441',
    fontWeight: '600',
  },
  signUpButton: {
    height: 50,
    backgroundColor: '#3b5441',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  socialSignUpContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  socialSignUpText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  socialButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 20,
  },
  signInText: {
    fontSize: 14,
    color: '#666',
  },
  signInLink: {
    fontSize: 14,
    color: '#3b5441',
    fontWeight: '600',
  },
});

export default RegisterScreen;