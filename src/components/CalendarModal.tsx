import React, {
  ChangeEvent,
  Dispatch,
  FormEventHandler,
  MouseEventHandler,
  SetStateAction,
  useState,
} from 'react';

interface ModalProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  onInsert: any;
  // onChange: FormEventHandler<HTMLInputElement> | undefined
  // onClick: MouseEventHandler<HTMLButtonElement>
}

const CalendarModal: React.FC<ModalProps> = ({ setOpenModal, onInsert }) => {
  const [value, setValue] = useState('');
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onInsert(value);
    setValue('');
    setOpenModal(false);
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <dialog open>
      할일 추가하기
      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="할일입력"
        />
        <button>확인</button>
        <button
          onClick={() => {
            setOpenModal(false);
          }}
        >
          취소
        </button>
      </form>
    </dialog>
  );
};

export default CalendarModal;
