import { useState } from "react";
import {getEvents, getEventDetail, buyTicket } from "../services/Event";
const useEvent = () => {
     const [isLoading, setIsLoading] = useState(false);
     const [error, setError] = useState(null);
     const [events, setEvents] = useState([]);
     const [success, setSuccess] = useState(false);
     const [eventDetail, setEventDetail] = useState(null);
     const [ticketUrl, setTicketUrl] = useState(null);
     const getEvent = async (page, pageSize) => {
          setIsLoading(true);
          setError(null);
          try {
               const response = await getEvents(page, pageSize);
               setEvents(response.data.content);
               return response.data.content;
          } catch (err) {
               setError(err?.message || "Lấy thông tin event thất bại");
          } finally {
               setIsLoading(false);
          }
     }
     const getDetail = async (eventId) => {
          setIsLoading(true);
          setError(null);
          try {
               const response = await getEventDetail(eventId);
               setEventDetail(response.data);
               return response.data;

          } catch (err) {
               setError(err?.message || "Lấy thông tin event thất bại");
          } finally {
               setIsLoading(false);
          }
     }
     const doTicket = async (data) => {
          setIsLoading(true);
          setError(null);
          setSuccess(null);

          try {
               const response = await buyTicket(data);
               setTicketUrl(response.data);
               setSuccess("Tạo booking thành công!");
               return response.data;
          } catch (err) {
               setError(err?.message || "Đặt vé thất bại");
          } finally {
               setIsLoading(false);
          }
     }
     return { isLoading,success, doTicket, ticketUrl,eventDetail, getDetail, error, events, getEvent };

    
}
export default useEvent;