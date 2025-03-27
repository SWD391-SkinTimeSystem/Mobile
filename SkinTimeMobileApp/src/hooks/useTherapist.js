import { useState, useEffect } from "react";
import { getTherapist, getTherapistSchedule } from "../services/Therapist";
const useTherapist = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [therapists, setTherapists] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const getTherapists = async (page, pageSize) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await getTherapist(page, pageSize);
      setTherapists(response.data.content);
      setSuccess("Lấy dữ liệu thành công!");
      return response.data.content;
    } catch (err) {
      setError(err?.message || "Lấy dữ liệu thất bại");
    } finally {
      setIsLoading(false);
    }
  };
  const getScheduleByTherapist = async (id) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await getTherapistSchedule(id);
      setTherapists(response.data);
      setSchedules(response.data);
      setSuccess("Lấy dữ liệu thành công!");
      return response.data;
    } catch (err) {
      setError(err?.message || "Lấy dữ liệu thất bại");
    } finally {
      setIsLoading(false);
    }
  }

  return { getTherapists,schedules, getScheduleByTherapist, isLoading, setIsLoading, error, success, therapists };
};
export default useTherapist;