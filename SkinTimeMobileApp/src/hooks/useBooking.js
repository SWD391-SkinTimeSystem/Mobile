import { useState } from "react";
import {createBooking, getBookingWithStatus, getBookingDetail, doFeedback} from "../services/Booking";
const useBooking = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState(null);
     const [success, setSuccess] = useState(null);
     const [bookingUrl, setBookingUrl] = useState(null);
     const [booking, setBooking] = useState(null);
     const [bookingDetail, setBookingDetail] = useState(null);
     const doBooking = async (data) => {
          setIsLoading(true);
          setError(null);
          setSuccess(null);
          try {
               const response = await createBooking(data);
               setSuccess("Tạo booking thành công!");
               setBookingUrl(response.data);
               return response.data;
          } catch (err) {
               setError(err?.message || "Tạo booking thất bại");
          } finally {
               setIsLoading(false);
          }
     };
     const getBooking = async (status) => {
          setIsLoading(true);
          setError(null);
          try {
               const response = await getBookingWithStatus(status);
               setBooking(response.data);
               return response.data;
          } catch (err) {
               setError(err?.message || "Lấy thông tin booking thất bại");
          } finally {
               setIsLoading(false);
          }
     }
     const getBookingById = async (id) => {
          setIsLoading(true);
          setError(null);
          try {
               const response = await getBookingDetail(id);
               setBookingDetail(response.data);
               return response.data;
          } catch (err) {
               setError(err?.message || "Lấy thông tin booking thất bại");
          } finally {
               setIsLoading(false);
          }
     }
     const createFeedback = async (data) => {
          setIsLoading(true);
          setError(null);
          setSuccess(null);
          try {
               const response = await doFeedback(data);
               setSuccess("Gửi feedback thành công!");
               return response.data;
          } catch (err) {
               setError(err?.message || "Gửi feedback thất bại");
          } finally {
               setIsLoading(false);
          }
     }
return { createFeedback, doBooking, bookingDetail, getBookingById, booking, getBooking, isLoading,bookingUrl, setIsLoading, error, success };
};
export default useBooking;