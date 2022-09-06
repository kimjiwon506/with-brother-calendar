import React, { useState, useEffect } from 'react';

/** Dayjs */
import dayjs from 'dayjs';
import WeekDay from 'dayjs/plugin/weekday';
import IsoWeek from 'dayjs/plugin/isoWeek';
import WeekOfYear from 'dayjs/plugin/weekOfYear';

/** Dayjs extends */
dayjs.extend(WeekDay);
dayjs.extend(IsoWeek);
dayjs.extend(WeekOfYear);

/** startOf() : 지정시간 단위에서 시작 날짜 및 시간 : 요일이 아닌 일 기준 */

const DayJsTest = () => {
  const today = dayjs();
  const [viewDate, setViewDate] = useState(dayjs());

  const StartWeek = today.startOf('month').week();
  const EndedWeek = today.endOf('month').week();

  const calendar = [];
  useEffect(() => {
    console.log(StartWeek);
  }, []);

  // startWeek 36 - EndedWeek 40 5번 돌아가도록 for로 돌리기
  for (let week = StartWeek; week <= EndedWeek; week++) {
    calendar.push(
      <div className="row" key={week}>
        {Array(7)
          .fill(0)
          .map((item, index) => {
            return (
              <>
                <div className={`box`} key={`${week}_${item}`}>
                  <div className={`text`}>
                    <span className={`day`}>{item}</span>
                  </div>
                </div>
              </>
            );
          })}
      </div>,
    );
  }
  return <>{calendar}</>;
};
// return (
//   <>
//     {Array(7)
//       .fill(0)
//       .map((day, index) => {
//         let current = viewDate
//           .startOf('week')
//           .week(week)
//           .add(day + index, 'day');
//         if (viewDate.format('MM') === '12') {
//           current = viewDate
//             .startOf('week')
//             .week(week - 52)
//             .add(day + index, 'day');
//         }

//         return (
//           <>
//             <div>{day}</div>
//           </>
//         );
//       })}
//   </>
// );

export default DayJsTest;
