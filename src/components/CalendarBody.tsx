import React, { useState, useEffect } from 'react';
import CalendarHeader from './CalendarHeader';
import dayjs from 'dayjs';
import CalendarCell from './CalendarCell';
import styled from 'styled-components';
import CalendarModal from './CalendarModal';
import TodoListItem from './TodoListItem';

const CalendarBody: React.FC = () => {
  // Calendar를 보여주는 useState
  const [date, setDate] = useState<dayjs.Dayjs>(dayjs());

  const daysInMonth = date.daysInMonth();
  const skip = (date.startOf('month').day() || 7) - 1;
  const rest = 7 - ((daysInMonth + skip) % 7 || 7);
  /**
   * skip : 전달과 현재달 겹치는 갯수 NaN으로 부여
   * daysInMonth : 해당하는 달의 갯수를 keys로 부여함
   * rest : 남은일수
   */
  const calendarArray = [
    ...Array(skip).fill(NaN),
    ...Array(daysInMonth).keys(),
    ...Array(rest).fill(NaN),
  ];
  // 오늘날짜 보여지도록
  const today = date.get('date');
  /**
   * selected : 선택한 날짜 보여질 수 있도록 useState사용
   * openModal : selected되었을때 추가 버튼을 누르면 모달이 나오도록 useState사용
   */
  const [selected, setSelected] = useState<dayjs.Dayjs>(dayjs());
  const [openModal, setOpenModal] = useState<boolean>(false);
  interface TodoProps {
    id: dayjs.Dayjs;
    text: string | number | string[];
  }
  const [todos, setTodos] = useState<TodoProps[]>([]);
  /**
   * onInsert함수
   * id: date.format() - 2022-09-12T15:18:20+09:00
   * selected : 선택한 날짜
   */
  const onInsert = (text: string) => {
    const todo = {
      id: selected,
      text: text,
    };
    setTodos(todos.concat(todo));
  };

  useEffect(() => localStorage.setItem('todo', JSON.stringify(todos)), [todos]);

  useEffect(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('todo') || '{}');
    console.log(getLocalStorage);
  }, [todos]);

  return (
    <>
      <CalendarHeader date={date} setDate={setDate} />
      <CalendarContents>
        {calendarArray.map((cellDate, index) => {
          console.log(typeof cellDate);

          const todayMark = cellDate + 1 === today ? 'today' : '';
          const selecTedMark = selected === cellDate + 1 ? 'selected' : '';
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
              key={index}
              className={`${todayMark} ${selecTedMark} ${saturdayMark} ${sundayMark}`}
              onClick={() => setSelected(cellDate + 1)}
            >
              {selecTedMark && (
                <>
                  <div onClick={() => setOpenModal(true)}>+</div>
                  {openModal && (
                    <CalendarModal
                      setOpenModal={setOpenModal}
                      onInsert={onInsert}
                    />
                  )}
                </>
              )}
              <CalendarCell date={cellDate} />
              {selecTedMark ? <TodoListItem todos={todos} /> : <></>}
            </CalendarCellWrap>
          );
        })}
      </CalendarContents>
    </>
  );
};

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

const CalendarContents = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
`;

export default CalendarBody;
