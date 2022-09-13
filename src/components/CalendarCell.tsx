import React from 'react';
import styled from 'styled-components';

interface CalendarCellProps {
  date: number;
}

const CalendarCell: React.FC<CalendarCellProps> = ({ date }) => {
  return <CellButton>{isFinite(date) && ++date}</CellButton>;
};

const CellButton = styled.button`
  all: unset;
  height: 50px;
`;

export default CalendarCell;
