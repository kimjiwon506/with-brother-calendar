import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import dayjs from 'dayjs';
import CalendarCell from './CalendarCell';
import CalendarModal from './CalendarModal';
import styled from 'styled-components';
import { FiPlusCircle } from 'react-icons/fi';

interface DateBodyContentsProps {
  date: dayjs.Dayjs;
  setDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
}

const CalendarBody: React.FC<DateBodyContentsProps> = ({ date }) => {
  const [selected, setSelected] = useState<dayjs.Dayjs>(dayjs());
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoProps[]>([]);
  const [insertTodo, setInsertTodo] = useState<TodoProps[]>([]);

  const daysInMonth = date.daysInMonth();
  const skip = (date.startOf('month').day() || 7) - 1;
  const rest = 7 - ((daysInMonth + skip) % 7 || 7);

  const calendarArray = [
    ...Array(skip).fill(NaN),
    ...Array(daysInMonth).keys(),
    ...Array(rest).fill(NaN),
  ];

  const today = date.get('date');
  const indexId = useRef(0);
  interface TodoProps {
    id: number;
    todo: dayjs.Dayjs;
    value: string;
    text: string;
  }

  const onInsert = useCallback(
    (text: string) => {
      const todo = {
        id: indexId.current,
        todo: selected,
        value: date.format('YY-MM-DD'),
        text: text,
      };
      indexId.current += 1;
      setTodos(todos.concat(todo));
    },
    [todos],
  );

  useEffect(() => localStorage.setItem('todo', JSON.stringify(todos)), [todos]);
  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('todo') || '{}');
    setInsertTodo(getLocalStorage);
  }, [todos]);

  return (
    <>
      <CalendarContents>
        {calendarArray.map((date, index) => {
          const todayMark = date + 1 === today ? 'today' : '';
          const selecTedMark = selected === date + 1 ? 'selected' : '';
          const saturdayMark =
            index + 1 === 6 ||
            index + 1 === 13 ||
            index + 1 === 20 ||
            index + 1 === 27 ||
            index + 1 === 34
              ? 'saturday'
              : '';
          const sundayMark =
            index + 1 === 7 ||
            index + 1 === 14 ||
            index + 1 === 21 ||
            index + 1 === 28 ||
            index + 1 === 35
              ? 'sunday'
              : '';

          return (
            <CalendarCellWrap
              className={`${todayMark} ${selecTedMark} ${saturdayMark} ${sundayMark}`}
              onClick={() => setSelected(date + 1)}
              key={index}
            >
              {selecTedMark && (
                <>
                  <CalnderAddMark onClick={() => setOpenModal(true)}>
                    <FiPlusCircle />
                  </CalnderAddMark>
                  {openModal && (
                    <CalendarModalBackground>
                      <CalendarModal
                        setOpenModal={setOpenModal}
                        onInsert={onInsert}
                      />
                    </CalendarModalBackground>
                  )}
                </>
              )}
              <CalendarCell date={date} />
              {insertTodo.map((item, index) => (
                <div key={index}>
                  {item.id === index && (
                    <>
                      {item.id} : {item.text}
                    </>
                  )}
                </div>
              ))}
            </CalendarCellWrap>
          );
        })}
      </CalendarContents>
      {insertTodo.map((item, index) => (
        <div key={index}>
          {item.id === index && (
            <>
              {item.id} : {item.text}
            </>
          )}
        </div>
      ))}
    </>
  );
};

const CalendarContents = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

const CalnderAddMark = styled.button`
  all: unset;
  display: block;
  margin: 0 auto;
  padding-top: 10px;
  cursor: pointer;
`;

const CalendarCellWrap = styled.div`
  &.today {
    background-color: #ceaf5f;
  }
  &.selected {
    background-color: bisque;
  }
  &.saturday {
    color: red;
  }
  &.sunday {
    color: blue;
  }
`;

const CalendarModalBackground = styled.div`
  &:before {
    content: '';
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }
`;

export default CalendarBody;
