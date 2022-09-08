import React from 'react';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { useState } from 'react';
import CalendarCell from '../components/CalendarCell';
import CalendarModal from '../components/CalendarModal';
/**
 * daysInMonth(): 함수를 사용하여 해당 월의 일 수
 * dayjs.duration().days(); : 일(0-30)단위로 가져온다.
 * dayjs.startOf('month').day() : 해당달의 달이 시작되는 나머지 갯수
 */

const CaledarTest = () => {
  const [date, setDate] = useState(dayjs());
  // 선택한 날짜 보여주도록 useState 사용
  const [selectDate, setSelectDate] = useState(dayjs());
  // 모달이 열리도록 useState 사용
  const [openModal, setOpenModal] = useState(false);
  // 해당달의 총날짜
  const daysInMonth = date.daysInMonth();
  // 해당달의 전달이 표시되기 때문에 표시되지 않도록 9월기준 4-1
  const skip = (date.startOf('month').day() || 7) - 1;
  const rest = 7 - ((daysInMonth + skip) % 7 || 7);

  const skiptest = date.startOf('month').day();
  const today = date.get('date');
  const todayString = date.get('date').toString();
  const d = todayString;

  const calendarArray = [
    // 해당달이 시작되기 전에는 NaN으로 채운다.
    ...Array(skip).fill(NaN),
    // 해당달이 의 배열에 keys()로 순차를 부여한다.
    ...Array(daysInMonth).keys(),
    ...Array(rest).fill(NaN),
  ];

  return (
    <Wrap>
      <div className="navigator">
        <button onClick={() => setDate(date.add(-1, 'month'))}>-</button>
        <p>{date.format('MMMM YYYY')}</p>
        <button onClick={() => setDate(date.add(1, 'month'))}>+</button>
      </div>
      <div className="weekdays">
        <p>Monday</p>
        <p>Tuesday</p>
        <p>Wednesday</p>
        <p>Thrusday</p>
        <p>Friday</p>
        <p>Saturday</p>
        <p>Sunday</p>
      </div>
      <div className="calendar">
        {calendarArray.map((date: any, i: number) => {
          const todayTest = date + 1 === today ? 'today' : '';
          const selectedTest = selectDate === date + 1 ? 'selected' : '';
          return (
            <CalendarCellWrap
              key={i}
              className={`cell ${todayTest} ${selectedTest}`}
              onClick={() => setSelectDate(date + 1)}
            >
              <CalendarCell date={date} key={i} />
              {selectDate === date + 1 && (
                <CalendarEditButton onClick={() => setOpenModal(prev => !prev)}>
                  plus
                </CalendarEditButton>
              )}
              {selectDate === date + 1 && openModal && <CalendarModal />}
            </CalendarCellWrap>
          );
        })}
      </div>
    </Wrap>
  );
};
export default CaledarTest;

const Wrap = styled.div`
  .weekdays,
  .calendar {
    display: grid;
    grid-template-columns: repeat(5, 2fr) repeat(2, 1fr);
  }
`;

const CalendarCellWrap = styled.button`
  display: block;
  all: unset;
  &.today {
    background: gray;
  }
  &.selected {
    background: gray;
  }
`;

const CalendarEditButton = styled.button`
  display: block;
  all: unset;
`;
