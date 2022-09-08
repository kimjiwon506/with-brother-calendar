import React, { useState } from 'react';
import CalendarBody from '../components/CalendarBody';
import dayjs from 'dayjs';
import CalendarTest from './CalendarTest';

const Calendar = () => {
  return (
    <div>
      <CalendarTest />
      <CalendarBody />
    </div>
  );
};

export default Calendar;
