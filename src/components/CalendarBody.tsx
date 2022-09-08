import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';

/** Dayjs */
import dayjs, { Dayjs } from 'dayjs';
import WeekDay from 'dayjs/plugin/weekday';
import IsoWeek from 'dayjs/plugin/isoWeek';
import WeekOfYear from 'dayjs/plugin/weekOfYear';
import TodoListItem from './TodoListItem';

/** Dayjs extends */
dayjs.extend(WeekDay);
dayjs.extend(IsoWeek);
dayjs.extend(WeekOfYear);

export interface TodoProps {
  id: number;
  text: string | number | readonly string[] | undefined;
  checked: boolean;
  day: Dayjs;
}

/** startOf() : 지정시간 단위에서 시작 날짜 및 시간 : 요일이 아닌 일 기준 */
const CalendarBody = () => {
  const today = dayjs();
  const [viewDate, setViewDate] = useState(dayjs());
  const [selectDate, setSelectDate] = useState(dayjs());
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalValue, setModalValue] = useState<
    string | number | readonly string[] | undefined
  >('');

  const [todos, setTodos] = useState<TodoProps[]>([]);

  /** TodoId */
  const nextId = useRef(0);

  /** createCalendar */
  const createCalendar = () => {
    const startWeek = viewDate.startOf('month').week();
    const endWeek =
      viewDate.endOf('month').week() === 1
        ? 53
        : viewDate.endOf('month').week();

    let calender = [];
    for (let week = startWeek; week <= endWeek; week++) {
      calender.push(
        <div className="row" key={week}>
          {Array(7)
            .fill(0)
            .map((number, index) => {
              let current = viewDate
                .startOf('week')
                .week(week)
                .add(number + index, 'day');
              if (viewDate.format('MM') === '12') {
                current = viewDate
                  .startOf('week')
                  .week(week - 52)
                  .add(number + index, 'day');
              }
              // 현재 날짜 (기준)
              let isSelected =
                selectDate.format('YYYYMMDD') === current.format('YYYYMMDD')
                  ? 'selected'
                  : '';
              let isToday =
                today.format('YYYYMMDD') === current.format('YYYYMMDD')
                  ? 'today'
                  : '';
              return (
                <div key={index}>
                  <div className={`box`}>
                    <div
                      className={`text ${isSelected} ${isToday}`}
                      onClick={() => {
                        setSelectDate(current);
                      }}
                    >
                      <span className={`day`}>{current.format('D')}</span>
                      {isToday && <span className="isToday">오늘</span>}
                      {isSelected && (
                        <button
                          className="isSelected"
                          onClick={() => setOpenModal(true)}
                        >
                          +
                        </button>
                      )}
                    </div>
                    {isSelected && <TodoListItem todos={todos} />}
                  </div>
                </div>
              );
            })}
        </div>,
      );
    }
    return calender;
  };

  const changeMonth = useCallback(
    (date: any, changeString: string) => {
      switch (changeString) {
        case 'add':
          return setViewDate(viewDate.add(1, 'month'));
        case 'subtract':
          return setViewDate(viewDate.subtract(1, 'month'));
        default:
          return date;
      }
    },
    [viewDate],
  );

  useEffect(() => {
    localStorage.setItem('todoValue', JSON.stringify(todos));
  }, [todos]);

  const onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpenModal(false);

    const newTodo = {
      id: nextId.current,
      text: modalValue,
      checked: false,
      day: viewDate,
    };
    nextId.current += 1;

    setModalValue('');

    console.log(newTodo);
    /**TODO: 클릭된 달력에 todo가 추가되도록 해야함 */
    setTodos(todos.concat(newTodo));
  };

  return (
    <CalendarWrap>
      <CalnderHeader>
        <button
          className="previous_icon"
          onClick={() => changeMonth(viewDate, 'subtract')}
        ></button>
        <span className="thisMonth">{viewDate.format('MM')}월</span>
        <button
          className="next_icon"
          onClick={() => changeMonth(viewDate, 'add')}
        ></button>
      </CalnderHeader>
      <CalenderBody>
        <CalendarBodyTitle>
          <div>
            <span className="text">SUN</span>
          </div>
          <div>
            <span className="text">MON</span>
          </div>
          <div>
            <span className="text">TUE</span>
          </div>
          <div>
            <span className="text">WED</span>
          </div>
          <div>
            <span className="text">THU</span>
          </div>
          <div>
            <span className="text">FRI</span>
          </div>
          <div>
            <span className="text">SAT</span>
          </div>
        </CalendarBodyTitle>
        <CalendarBodyContents>{createCalendar()}</CalendarBodyContents>
      </CalenderBody>
      {openModal ? (
        <dialog open>
          할일 추가하기
          <form onSubmit={onSubmit}>
            <input
              type="text"
              placeholder="할일입력"
              value={modalValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setModalValue(e.target.value);
              }}
            />

            <button type={'submit'}>확인</button>
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              취소
            </button>
          </form>
        </dialog>
      ) : null}
    </CalendarWrap>
  );
};

const CalendarWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 0 auto;
`;

const CalnderHeader = styled.div`
  display: flex;
`;

const CalenderBody = styled.div`
  .row {
    display: flex;
  }
`;

const CalendarBodyTitle = styled.div`
  display: flex;
  div {
    width: 60px;
    text-align: center;
  }
`;
const CalendarBodyContents = styled.div`
  .box {
    width: 60px;
    text-align: center;
  }
  .text {
    display: flex;
    flex-direction: column;
  }
  .isToday {
    background: gray;
  }
  .selected {
    background-color: gray;
  }
  .isSaveTodo {
    width: 60px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export default CalendarBody;
