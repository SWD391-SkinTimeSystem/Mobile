import { useState } from "react";
import { registerUser, getCurrentUser, loginUser } from "../services/Auth";

const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [user, setUser] = useState(null);
  const register = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    console.log("Gọi API register với dữ liệu:", data);

    try {
      const response = await registerUser(data);
      setSuccess(response.message || "Đăng ký thành công!");
  
      return response.data;
    } catch (err) {
      setError(err?.message || "Đăng ký thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    console.log("Gọi API login với dữ liệu để login:", data);
    try {
      const response = await loginUser(data);
      setSuccess(response.message || "Đăng nhập thành công!");
      console.log(response);
      return response;
    } catch (err) {
      setError(err?.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  }
  const getUser = async () => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await getCurrentUser();
      console.log("🚀 ~ file: useAuth.js ~ line 50 ~ getCurrentUser ~ response", response)
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Lỗi lấy thông tin user", error);
    } finally {
      setIsLoading(false);
    }
  }
  return { user,getUser, login, register, isLoading, setIsLoading, error, success };
};

export default useRegister;
