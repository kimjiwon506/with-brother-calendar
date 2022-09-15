import React, { useState } from 'react';
import dayjs from 'dayjs';
import CalendarBody from '../components/CalendarBody';
import styled from 'styled-components';
import CalendarHeader from '../components/CalendarHeader';

/**
 * @TODO
 * 1. interface -> type으로 변경
 * 2. id값 날짜로 변경
 * 3. calendar cell에 텍스트가 있을경우 새로운 내용을 입력하면 최근의 내용이 반영되도록
 * 4. 클릭한 날짜에 todo가 없을경우 새로운 내용이 생기도록
 * component : 함수
 * type , interface : 사용설명서
 */

const Calendar: React.FC = () => {
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());

  return (
    <CalendarWrap>
      <CalendarHeader dayjsInstance={date} setDate={setDate} />
      <CalendarBody dayjsInstance={date} setDate={setDate} />
    </CalendarWrap>
  );
};

const CalendarWrap = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

export default Calendar;
