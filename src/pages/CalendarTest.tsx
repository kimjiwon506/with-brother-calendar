import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import CalendarCell from './../components/CalendarCell';

// const CalendarTest = () => {
//   const [date, setDate] = useState('test');
//   const now = dayjs();
//   const CreateCalendarWeek = () => {
//     let calender = [];
//     //요일출력
//     calender.push(
//       Array(7)
//         .fill(0)
//         .map((number, index) => {
//           let current = now
//             .startOf('week')
//             .locale('en')
//             .add(number + index, 'day');
//           return <span className="row">{current.format('ddd')}</span>;
//         }),
//     );
//     return calender;
//   };
//   const CreateCalendarMonth = () => {
//     let calender = [];
//     const startWeek = now.startOf('month').week();
//     const endWeek =
//       now.endOf('month').week() === 1 ? 53 : now.endOf('month').week();
//     for (let week = startWeek; week <= endWeek; week++) {
//       calender.push(
//         <div>
//           {Array(7)
//             .fill(0)
//             .map((item, index) => {
//               let current = now
//                 .startOf('week')
//                 .week(week)
//                 .add(item + index, 'day');
//               if (now.format('MM') === '12') {
//                 current = now
//                   .startOf('week')
//                   .week(week - 52)
//                   .add(item + index, 'day');
//               }
//               return <></>;
//             })}
//         </div>,
//       );
//     }
//     return calender;
//   };
//   return (
//     <div>
//       {/* <div>오늘날짜:{day.format()}</div>
//         <div>오늘날짜:{day.get('D')}</div>
//         <div>시작하는주:{day.startOf('month').week()}</div>
//         <div>시작하는주:{day.startOf('month').format()}</div> */}
//       <span className="row">{CreateCalendarWeek()}</span>
//       <span className="row">{CreateCalendarMonth()}</span>
//     </div>
//   );
// };

const CalendarTest = () => {
  const [date, setDate] = useState<string | undefined>('test');
  const [now, setNow] = useState<any>(dayjs());
  return (
    <>
      <CalendarCell date={date} now={now} />
    </>
  );
};
export default CalendarTest;
