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
  dayjsInstance: dayjs.Dayjs;
  setDate: Dispatch<SetStateAction<dayjs.Dayjs>>;
}

const CalendarBody: React.FC<DateBodyContentsProps> = ({ dayjsInstance }) => {
  const [selected, setSelected] = useState<dayjs.Dayjs>(dayjs());
  // const [selected, setSelected] = useState(0)
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [todos, setTodos] = useState<TodoProps[]>(() => {
    return JSON.parse(localStorage.getItem('todo') || '[]');
  });

  console.log(selected)

  const daysInMonth = dayjsInstance.daysInMonth();
  const skip = (dayjsInstance.startOf('month').day() || 7) - 1;
  const rest = 7 - ((daysInMonth + skip) % 7 || 7);

  const calendarArray = [
    ...Array(skip).fill(NaN),
    ...Array(daysInMonth).keys(),
    ...Array(rest).fill(NaN),
  ];

  const today = dayjsInstance.get('date');
  const indexId = useRef(0);
  interface TodoProps {
    id: number;
    value: string;
    text: string;
  }

  const onInsert = 
    (selectedDate: string) => (text: string) => {
      const year = dayjsInstance.get('year');
      const month = dayjsInstance.get('month') + 1;
      
      const todo = {
        id: indexId.current,
        value: `${year}-${month}-${selectedDate}`,
        text: text,
      };
      indexId.current += 1;
      setTodos(todos.concat(todo));
    }

  useEffect(() => {
    localStorage.setItem('todo', JSON.stringify(todos));
  }, [todos]);

  console.log('todos : ', todos)


  return (
    <>
      <CalendarContents>
        {calendarArray.map((_date, index) => {
          //여기 
          const date = _date + 1
          // console.log('date:',date)
          const todayMark = date === today ? 'today' : '';
          const selectedMark = selected === date ? 'selected' : '';
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
                    <CalendarModalBackground>
                      <CalendarModal
                        setOpenModal={setOpenModal}
                        onInsert={onInsert(date)}
                      />
                    </CalendarModalBackground>
                  )}
                </>
              )}
              <CalendarCell date={date} />
              {todos
                .filter((item) => {
                  // const todoDate = item.value.split('-')[2]; //날짜비교 데이터
                  //const todoYMD = item.value; //2022-09-15 string
                  //console.log(item.value, 'item.value', date);
                  //const searchDate = `${header.year}-${header.month}-${date}`;  
                  
                  // 
                  // const dateSetNumber = dayjs(`2022-09-${selected}`).date();
                    
                  // console.log(
                  //   'todos : ',
                  //   item,
                  //   date,
                  //   Number(todoDate) === date,
                  // );
                  // console.log('todoDate',todoDate)
                  // console.log(Number(todoDate), dateSetNumber);
                  // return Number(todoDate) === date;
                  //return todoYMD === searchDate;
                })
                // .map((item, index) => (
                //   <div key={index}>{item.id === index && <>{item.text}</>}</div>
                // ))}
                .map((item,index) => {
                  return <div key={index}>{item.text}</div>
                })
              }
            </CalendarCellWrap>
          );
        })}
      </CalendarContents>
      {/* {todos.filter((item) => item).map((item, index) => (
        <div key={index}>
          {item.id === index && (
            <>
              {item.id} : {item.text}
            </>
          )}
        </div>
      ))} */}
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