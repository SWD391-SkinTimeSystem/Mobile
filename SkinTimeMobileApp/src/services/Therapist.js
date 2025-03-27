import axiosClient from "../utils/axiosClient";
const API_URL = '/therapist';
const API_URL_SCHEDULE = '/schedule';
export const getTherapist = async (page, pageSize) => {
     return axiosClient.get(API_URL, {
          params: { page, page_size: pageSize },
     });
};

export const getTherapistSchedule = async (id) => {
     return axiosClient.get(`${API_URL_SCHEDULE}/therapist/${id}/availability`);
}