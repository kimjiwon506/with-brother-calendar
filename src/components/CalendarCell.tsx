import React from 'react';
import styled from 'styled-components';

interface CalendarCellProps {
  date: number;
}

const CalendarCell: React.FC<CalendarCellProps> = ({ date }) => {
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
