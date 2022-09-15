import React from 'react';
import styled from 'styled-components';

type CalendarCell = {
  date: number;
};

const CalendarCell: React.FC<CalendarCell> = ({ date }) => {
  return (
    <>
      <CellButton>{isFinite(date) && date}</CellButton>
    </>
  );
};

const CellButton = styled.button`
  all: unset;
  display: block;
  width: 100%;
  height: 50px;
  cursor: pointer;
  text-align: center;
`;

export default CalendarCell;
