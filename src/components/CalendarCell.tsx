import React from 'react';
import dayjs, { Dayjs } from 'dayjs';

// export interface newCalendarCell {
//   text: string;
//   value: Dayjs;
// }

const CalendarCell = (
  { date }: any,
  now: string | number | dayjs.Dayjs | Date | null | undefined,
) => {
  return (
    <>
      <div>{date}</div>
    </>
  );
};

export default CalendarCell;
