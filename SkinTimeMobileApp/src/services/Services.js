import axiosClient from "../utils/axiosClient";
const API_URL = '/service';

export const getAllService = async () => {
     return axiosClient.get(`${API_URL}`);
};
export const getServiceById = async (id) => {
     return axiosClient.get(`${API_URL}/${id}`);
}
