import { Dayjs } from 'dayjs';

export interface newCalendarCell {
  text: string;
  value: Dayjs;
}

function getCalendarCells(date: Dayjs): newCalendarCell[] | any {
  // newArray()에 daysjs.daysInMonth로 이번달의 일 수를 가져온뒤 1번째 부터 시작하도록
  const daysArray = new Array(date.daysInMonth()).fill(1);
  const caledarCells: newCalendarCell[] = [];

  const prepareCell = (date: Dayjs, dayNumber: number) => {
    return {
      text: String(dayNumber),
      // date.clone().set => 기간의 복제본 (특정 시점의 스냅샷)
      value: date.clone().set('date', dayNumber),
    };
  };
  daysArray.map((_, i) => {
    return caledarCells.push(prepareCell(date, i + 1));
    // return console.log(date);
  });

  const cellsToAdd = 35 - daysArray.length;
  //   const cellsToAdd = 37 - daysArray.length;

  const lastMonth = date.subtract(1, 'month');
  for (let i = 0; i < Math.floor(cellsToAdd / 2); i++) {
    caledarCells.unshift(prepareCell(lastMonth, lastMonth.daysInMonth() - i));
  }

  const nextMonth = date.add(1, 'month');
  for (let i = 0; i < Math.round(cellsToAdd / 2); i++) {
    caledarCells.push(prepareCell(nextMonth, i + 1));
  }

  return caledarCells;
}

export function getCalendarRows(date: Dayjs): Array<newCalendarCell[]> | any {
  const cells = getCalendarCells(date);
  const rows: Array<newCalendarCell[]> = [];

  for (let i = 0; i < cells.length; i += 7) {
    rows.push(cells.slice(i, i + 7));
    return rows;
  }
}
