import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const API_URL = "http://swd291-api.duckdns.org/api";

const axiosClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 20000, // 20 giây
});

// Hàm lấy accessToken từ AsyncStorage
const getAccessToken = async () => {
  return await AsyncStorage.getItem("accessToken");
};

// Hàm refresh token
const refreshAccessToken = async () => {
  const navigation = useNavigation();

  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("Không tìm thấy refresh token!");

    console.log("🔄 Đang refresh token...");
    const response = await axios.post(`${API_URL}/auth/refresh-token`, {
      refreshToken,
    });

    const newAccessToken = response.data.access_token;
    const newRefreshToken = response.data.refresh_token;

    // Lưu token mới vào AsyncStorage
    await AsyncStorage.setItem("accessToken", newAccessToken);
    await AsyncStorage.setItem("refreshToken", newRefreshToken);

    console.log("✅ Refresh token thành công!");
    return newAccessToken;
  } catch (error) {
    navigation.navigate("SignInScreen");
    console.error("❌ Lỗi refresh token:", error);
    return null;
  }
};

// Thêm interceptor vào request
axiosClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    console.log("Dang su dung 🔑 Token:", token);
    if (token) {
      console.log(" Da thiet lap lien ket den Authorization");
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("📤 Đang gửi request đến:", config.baseURL + config.url);
    console.log("📄 Dữ liệu gửi đi:", config.data);
    return config;
  },
  (error) => {
    console.error("❌ Lỗi request:", error);
    return Promise.reject(error);
  }
);

// Thêm interceptor vào response để xử lý lỗi 401 (Unauthorized)
axiosClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    // Nếu lỗi là 401 (Unauthorized) và chưa thử refresh token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Đánh dấu là đã thử refresh

      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest); // Gửi lại request với token mới
      }
    }

    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error.response?.data || error.message);
  }
);

export default axiosClient;
