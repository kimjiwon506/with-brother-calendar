import React, { useState, useEffect } from 'react';

/** Dayjs */
import dayjs from 'dayjs';
import WeekDay from 'dayjs/plugin/weekday';
import IsoWeek from 'dayjs/plugin/isoWeek';
import WeekOfYear from 'dayjs/plugin/weekOfYear';
import reportWebVitals from './../reportWebVitals';

/** Dayjs extends */
dayjs.extend(WeekDay);
dayjs.extend(IsoWeek);
dayjs.extend(WeekOfYear);

/** startOf() : 지정시간 단위에서 시작 날짜 및 시간 : 요일이 아닌 일 기준 */
const Calendar = () => {
  const today = dayjs();
  const [viewDate, setViewDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(dayjs());
  //startWeek는 36부터 시작 week의 한 묶음
  const StartWeek = today.startOf('month').week();
  //endedWeek는 40
  const EndedWeek =
    today.endOf('month').week() === 1 ? 53 : viewDate.endOf('month').week();

  let calender = [];

  //   useEffect(() => {
  //     console.log(current);
  //   }, []);

  for (let week = StartWeek; week <= EndedWeek; week++) {
    calender.push(
      <div className="row" key={week}>
        {Array(7)
          .fill(0)
          .map((day, index) => {
            let current = viewDate
              .startOf('week')
              .week(week)
              .add(day + index, 'day');
            if (viewDate.format('MM') === '12') {
              current = viewDate
                .startOf('week')
                .week(week - 52)
                .add(day + index, 'day');
            }
            // 현재 날짜 (기준)
            let isSelected =
              selectedDate.format('YYYYMMDD') === current.format('YYYYMMDD')
                ? 'selected'
                : '';
            let isToday =
              today.format('YYYYMMDD') === current.format('YYYYMMDD')
                ? 'today'
                : '';
            let isNone =
              current.format('MM') === viewDate.format('MM') ? '' : 'none';
            return (
              <>
                <div className={`box`} key={`${week}_${index}`}>
                  <div
                    className={`text ${isSelected} ${isToday} ${isNone}`}
                    onClick={() => {
                      setSelectedDate(current);
                    }}
                  >
                    <span className={`day`}>{current.format('D')}</span>
                    {isToday ? (
                      <span className="isToday">오늘</span>
                    ) : isSelected ? (
                      <span className="isSelected"></span>
                    ) : null}
                  </div>
                </div>
              </>
            );
          })}
      </div>,
    );
  }
  return <>{calender}</>;
};

export default Calendar;
