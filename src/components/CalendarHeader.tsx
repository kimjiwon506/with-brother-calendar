import React from 'react';

const CalendarHeader = ({ viewDate, setViewDate }: any) => {
  const onChangeGetMonth = (date: any, changeString: string) => {
    switch (changeString) {
      case 'add':
        return setViewDate(viewDate.add(1, 'month'));
      case 'subtract':
        return setViewDate(viewDate.subtract(1, 'month'));
      default:
        return date;
    }
  };
  return (
    <>
      <button onClick={() => onChangeGetMonth(viewDate, 'subtract')}>
        이전
      </button>

      <button>다음</button>
    </>
  );
};

export default CalendarHeader;
