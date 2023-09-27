// // src/components/DatePicker.js
// import React, { useState } from 'react';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

// const DatePickerComponent = () => {
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleChange = (date) => {
//     setSelectedDate(date);
//   };

//   return (
//     <div>
//       <DatePicker
//         selected={selectedDate}
//         onChange={handleChange}
//         dateFormat="dd/MM/yyyy"
//       />
//       {selectedDate && (
//         <p>
//           {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
//         </p>
//       )}
//     </div>
//   );
// };

// export default DatePickerComponent;

import React from 'react';

class DateControl extends React.Component {
  render() {
    const now = new Date();
    const tanggal = now.getDate();
    const bulan = now.toLocaleString("default", { month: "long" });
    const tahun = now.getFullYear();
    const formattedDate = `${tanggal} ${bulan} ${tahun}`;
    return (
      <div>
        {formattedDate}
      </div>
    );
  }
}

export default DateControl;
