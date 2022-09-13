import React from 'react';
import styled from 'styled-components';

const CalendarCell = ({ date }: any) => {
  return <CellButton>{isFinite(date) && ++date}</CellButton>;
};

const CellButton = styled.button`
  all: unset;
`;

export default CalendarCell;
