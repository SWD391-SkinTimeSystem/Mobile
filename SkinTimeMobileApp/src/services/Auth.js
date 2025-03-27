import axiosClient from "../utils/axiosClient";
const API_URL = '/account';
const API_AUTH_URL = '/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const registerUser = async (data) => {
     console.log("🚀 API_URL:", API_URL);
    return axiosClient.post(`${API_URL}/register`, data);
};
export const loginUser = async (data) => {
     console.log("🚀 API_AUTH_URL:", API_AUTH_URL);
     return axiosClient.post(`${API_AUTH_URL}/signin`, data);
};
export const getCurrentUser = async () => {
     console.log("🚀 Ddang tai Auth.js :", API_URL);
     return axiosClient.get(`${API_URL}`);
}
export const logoutUser = async () => {
     try {
       await AsyncStorage.removeItem("accessToken"); // Xóa accessToken
       await AsyncStorage.removeItem("refreshToken"); // Xóa refreshToken (nếu có)
       console.log("User logged out!");
       return true;
     } catch (error) {
       console.error("Logout Error:", error);
       return false;
     }
};