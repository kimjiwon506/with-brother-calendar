import dayjs from 'dayjs';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import styled from 'styled-components';
interface DateHeaderProps {
  dayjsInstance: dayjs.Dayjs;
  setDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
}

/**
 *  @TODO
 *  1. mark 할 때, localstorage 저장한 값과 풀 데이트 YYYY-MM-DD 비교해야 한다.
 *  >> 현재 월, 년도 calendar body 알려줘야 한다
 */

const CalendarHeader: React.FC<DateHeaderProps> = ({
  dayjsInstance,
  setDate,
}) => {
  return (
    <CalendarHeaderWrapStyle>
      <MonthWrap>
        <MonthButton onClick={() => setDate(dayjsInstance.add(-1, 'month'))}>
          -
        </MonthButton>
        <p>{dayjsInstance.format('MMMM YYYY')}</p>
        <MonthButton
          onClick={() => {
            setDate(dayjsInstance.add(1, 'month'));
          }}
        >
          +
        </MonthButton>
      </MonthWrap>
      <WeekDays>
        <p>Mon</p>
        <p>Tue</p>
        <p>Wed</p>
        <p>Thr</p>
        <p>Fri</p>
        <p>Sat</p>
        <p>Sun</p>
      </WeekDays>
    </CalendarHeaderWrapStyle>
  );
};

const CalendarHeaderWrapStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MonthWrap = styled.div`
  display: flex;
  align-items: center;
`;

const MonthButton = styled.div`
  all: unset;
  display: block;
  font-size: 20px;
  padding: 20px;
  cursor: pointer;
`;

const WeekDays = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

export default CalendarHeader;
