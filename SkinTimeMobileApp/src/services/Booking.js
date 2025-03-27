import axiosClient from "../utils/axiosClient";
const API_URL = '/booking';
const API_FEEDBACK_URL = '/feedback';
export const createBooking = async (data) => {
     return axiosClient.post(`${API_URL}`, data);
}
export const getBookingWithStatus = async (status) => {
     return axiosClient.get(`${API_URL}/status/${status}`);
}

export const getBookingDetail = async (id) => {
     return axiosClient.get(`${API_URL}/${id}`);
}

export const doFeedback = async (data) => {
     return axiosClient.post(`${API_FEEDBACK_URL}/booking/create`, data);
}