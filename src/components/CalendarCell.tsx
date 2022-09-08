import React from 'react';
import dayjs from 'dayjs';

const CalendarCell = ({ date }: any) => {
  const now = dayjs();
  const todayString = now.get('date').toString();
  const d = document.getElementsByName('.9');
  //const today = todayString == d ? 'today' : '';
  return <span className={`${''}`}>{isFinite(date) && ++date}</span>;
};

export default CalendarCell;
