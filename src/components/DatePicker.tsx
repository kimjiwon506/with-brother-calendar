import React, { useMemo } from 'react';
import { Dayjs } from 'dayjs';
import { getCalendarRows } from '../util/getCalendarRows';

export interface CalendarProps {
  showData: Dayjs;
  selectedData?: Dayjs;
  onChange?: (newData: Dayjs) => void;
}

const DatePicker: React.FC<CalendarProps> = ({
  showData,
  selectedData,
  onChange,
}) => {
  const rows = useMemo(() => getCalendarRows(showData), [showData]);

  return (
    <>
      <div>
        {rows[0].map(({ value }: any, i: any) => (
          <div key={i}>
            <div>{value.format('dd')}</div>
          </div>
        ))}
      </div>

      <div>
        {rows.map((cells: any, index: any) => console.log(cells, index))}
      </div>
    </>
  );
};

export default DatePicker;
