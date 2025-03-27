import { useState } from "react";
import { getAllService, getServiceById } from "../services/Services";

const useService = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState(null);
     const [success, setSuccess] = useState(null);
     const [services, setServices] = useState([]);
     const [service, setService] = useState(null);

     const getServices = async () => {
          setIsLoading(true);
          setError(null);
          setSuccess(null);
          try {
               const response = await getAllService();
               setServices(response.data);
               return response.data;
          } catch (err) {
               setError(err?.message || "Lỗi lấy dữ liệu");
          } finally {
               setIsLoading(false);
          }
     }
     const getService = async (id) => {
          setIsLoading(true);
          setError(null);
          setSuccess(null);
          try {
               const response = await getServiceById(id);
               setService(response.data);
               return response.data;
          } catch (err) {
               setError(err?.message || "Lỗi lấy dữ liệu");
          } finally {
               setIsLoading(false);
          }
     }
     return {getServices, getService, isLoading, setIsLoading, error, success, services, service };
}

export default useService;