export const formatCurrencyVND = (number) => {
     return new Intl.NumberFormat("vi-VN").format(number) + " đ";
   };

export const formatDateToDay = (fullDate) => {
  return fullDate.split('-')[2]; // Lấy phần "27" từ "2025-03-27"
};


export const formatTime = (time) => {
  const [hour, minute] = time.split(':'); // Tách "09:00:00" thành ["09", "00", "00"]
  const hourInt = parseInt(hour, 10);
  const period = hourInt >= 12 ? 'pm' : 'am';
  const formattedHour = hourInt % 12 === 0 ? 12 : hourInt % 12; // Chuyển 00:00 thành 12 am
  return `${formattedHour}:${minute} ${period}`;
};