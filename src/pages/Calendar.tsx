import React from 'react';
import CalendarBody from '../components/CalendarBody';
import styled from 'styled-components';

/**
 * TODO:
 * 1.Cell 컴포넌트로 분리
 * 2.modal 컴포넌트 분리
 * 3.토요일, 일요일 색상변경
 * 4.Todo에 현재 date 추가한뒤 스토리지에 올리기
 * pages - calendar
 * components - calendarCell
 *            - calendarHeader
 *            - calendarBody
 */

const Calendar = () => {
  return (
    <CalendarWrap>
      <CalendarBody />
    </CalendarWrap>
  );
};

const CalendarWrap = styled.div`
  max-width: 640px;
  margin: 0 auto;
`;

export default Calendar;
