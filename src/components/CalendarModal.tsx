import React, { Dispatch, SetStateAction, useState } from 'react';

interface ModalProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  onInsert: any;
}

const CalendarModal: React.FC<ModalProps> = ({ setOpenModal, onInsert }) => {
  const [value, setValue] = useState<string>('');
  const onSubmit: React.ChangeEventHandler<HTMLFormElement> = (e): void => {
    e.preventDefault();
    onInsert(value);
    setValue('');
    setOpenModal(false);
  };
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
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
