import dayjs from 'dayjs';
import React, { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';

interface DateHeaderProps {
  date: dayjs.Dayjs;
  setDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
}

const CalendarHeader: React.FC<DateHeaderProps> = ({ date, setDate }) => {
  return (
    <CalendarHeaderWrap>
      <ControlMonth>
        <ControlMonthButton onClick={() => setDate(date.add(-1, 'month'))}>
          -
        </ControlMonthButton>
        <p>{date.format('MMMM YYYY')}</p>
        <ControlMonthButton
          onClick={() => {
            setDate(date.add(1, 'month'));
          }}
        >
          +
        </ControlMonthButton>
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
  align-items: center;
`;

const ControlMonthButton = styled.div`
  all: unset;
  display: block;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
`;

const WeekDays = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 2fr);
  text-align: center;
`;

export default CalendarHeader;
