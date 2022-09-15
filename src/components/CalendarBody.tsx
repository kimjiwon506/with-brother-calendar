import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import dayjs from 'dayjs';
import CalendarCell from './CalendarCell';
import CalendarModal from './CalendarModal';
import styled from 'styled-components';
import { FiPlusCircle } from 'react-icons/fi';

type DateBody = {
  dayjsInstance: dayjs.Dayjs;
  setDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
};
type Todo = {
  id: string;
  text: string;
};

const CalendarBody: React.FC<DateBody> = ({ dayjsInstance }) => {
  const [selected, setSelected] = useState<dayjs.Dayjs>(dayjs());
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [todos, setTodos] = useState<Todo[]>(() => {
    return JSON.parse(localStorage.getItem('todo') || '[]');
  });

  const daysInMonth = dayjsInstance.daysInMonth();
  const skip = (dayjsInstance.startOf('month').day() || 7) - 1;
  const rest = 7 - ((daysInMonth + skip) % 7 || 7);

  const calendarArray = [
    ...Array(skip).fill(NaN),
    ...Array(daysInMonth).keys(),
    ...Array(rest).fill(NaN),
  ];

  const todayDate = dayjsInstance.get('date');

  const onInsert = (selectedDate: string) => (text: string) => {
    const year = dayjsInstance.get('year');
    const month = dayjsInstance.get('month') + 1;

    const todo = {
      id: `${year}-${month}-${selectedDate}`,
      text: text,
    };

    todos.map(
      item => item.id === todo.id && item.id === item.id && todos.splice(0, 1),
    );

    setTodos(todos.concat(todo));
  };

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todos));
  });

  return (
    <>
      <CalendarContents>
        {calendarArray.map((_date, index) => {
          const date = _date + 1;
          const weekend = index + 1;
          const todayMark = date === todayDate ? 'today' : '';
          const selectedMark = selected === date ? 'selected' : '';
          const saturdayMark =
            weekend === 6 ||
            weekend === 13 ||
            weekend === 20 ||
            weekend === 27 ||
            weekend === 34
              ? 'saturday'
              : '';
          const sundayMark =
            weekend === 7 ||
            weekend === 14 ||
            weekend === 21 ||
            weekend === 28 ||
            weekend === 35
              ? 'sunday'
              : '';

          return (
            <CalendarCellWrap
              className={`${todayMark} ${selectedMark} ${saturdayMark} ${sundayMark}`}
              onClick={() => setSelected(date)}
              key={index}
            >
              {selectedMark && (
                <>
                  <CalnderAddMark onClick={() => setOpenModal(true)}>
                    <FiPlusCircle />
                  </CalnderAddMark>
                  {openModal && (
                    <CalendarModalBackgroundStyle>
                      <CalendarModal
                        setOpenModal={setOpenModal}
                        onInsert={onInsert(date)}
                      />
                    </CalendarModalBackgroundStyle>
                  )}
                </>
              )}
              <CalendarCell date={date} />
              {todos
                .filter(item => {
                  const todoDate = item.id.split('-')[2];
                  return Number(todoDate) === date;
                })
                .map((item, index) => {
                  return <div key={index}>{item.text}</div>;
                })}
            </CalendarCellWrap>
          );
        })}
      </CalendarContents>
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

const CalendarModalBackgroundStyle = styled.div`
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
