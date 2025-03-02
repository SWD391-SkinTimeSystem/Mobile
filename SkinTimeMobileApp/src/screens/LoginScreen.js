import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureText, setSecureText] = useState(true);
  const navigation = useNavigation();

  const handleSubmit = () => {
    console.log("Logging in with", email, password);
    // Ví dụ: navigation.navigate("Home");
  };

  const handleRegister = () => {
    console.log("Navigate to Register screen");
    // Điều hướng sang màn hình Register
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đăng nhập</Text>
      <Text style={styles.subtitle}>Chào mừng quay trở lại!</Text>
      <Text style={styles.description}>
        Để đặt lịch, vui lòng đăng nhập bằng thông tin cá nhân của bạn
      </Text>

      {/* Form Email */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Form Password + icon eye */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.inputPassword}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={secureText}
        />
        <TouchableOpacity onPress={() => setSecureText(!secureText)}>
          <Ionicons
            name={secureText ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      {/* Nút Đăng nhập */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Nút Đăng kí */}
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Đăng kí</Text>
      </TouchableOpacity>

      <Text style={styles.orContinue}>Hoặc tiếp tục với</Text>

      <View style={styles.socialButtons}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require("../img/facebook.png")} style={styles.socialIcon} />
          <Text>Đăng nhập với Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={require("../img/google.png")} style={styles.socialIcon} />
          <Text>Đăng nhập với Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#1DB954",
    textAlign: "center",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    textAlign: "center",
    color: "gray",
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    backgroundColor: "#FFF",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFF",
    paddingHorizontal: 15,
  },
  inputPassword: {
    flex: 1,
    height: 50,
  },
  forgotPassword: {
    color: "#1DB954",
    textAlign: "right",
    marginBottom: 20,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#1DB954",
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    borderColor: "#1DB954",
    borderWidth: 1,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 20,
  },
  registerButtonText: {
    color: "#1DB954",
    fontSize: 18,
    fontWeight: "bold",
  },
  orContinue: {
    textAlign: "center",
    color: "gray",
    marginBottom: 10,
  },
  socialButtons: {
    alignItems: "center",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 10,
    width: "80%",
    justifyContent: "center",
    marginBottom: 10,
    backgroundColor: "#FFF",
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default LoginScreen;
