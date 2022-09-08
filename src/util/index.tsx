import { Dayjs } from 'dayjs';

const createCalendarCells = (date: Dayjs) => {
  const daysArray = new Array(date.daysInMonth()).fill(1);
  console.log(daysArray);
};

export default createCalendarCells;
