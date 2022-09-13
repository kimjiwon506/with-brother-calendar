import dayjs from 'dayjs';
import React from 'react';
import styled from 'styled-components';

interface DateProps {
  setDate: any;
  date: dayjs.Dayjs;
}

const CalendarHeader: React.FC<DateProps> = ({ date, setDate }) => {
  return (
    <CalendarHeaderWrap>
      <ControlMonth>
        <button onClick={() => setDate(date.add(-1, 'month'))}>-</button>
        <p>{date.format('MMMM YYYY')}</p>
        <button
          onClick={() => {
            setDate(date.add(1, 'month'));
          }}
        >
          +
        </button>
      </ControlMonth>
      <WeekDays>
        <p>Monday</p>
        <p>Tuesday</p>
        <p>Wednesday</p>
        <p>Thrusday</p>
        <p>Friday</p>
        <p>Saturday</p>
        <p>Sunday</p>
      </WeekDays>
    </CalendarHeaderWrap>
  );
};

const CalendarHeaderWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ControlMonth = styled.div`
  display: flex;
`;

const WeekDays = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 2fr);
  text-align: center;
`;

export default CalendarHeader;
