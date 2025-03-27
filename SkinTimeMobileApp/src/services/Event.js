import axiosClient from "../utils/axiosClient";
const API_URL = '/event';
const API_TICKET_URL = '/ticket';
export const getEvents = async (page, pageSize) => {
     return axiosClient.get(`${API_URL}/available`, {
          params: { page, page_size: pageSize },
     });
}
export const getEventDetail = async (eventId) => {
     return axiosClient.get(`${API_URL}/${eventId}`);
}

export const buyTicket = async (data) => {
     return axiosClient.post(`${API_TICKET_URL}/register`, data);
}