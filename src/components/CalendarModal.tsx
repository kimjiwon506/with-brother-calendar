import React, { Dispatch, SetStateAction, useState } from 'react';
import styled from 'styled-components';

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
    <ModalWrap open>
      <form method="dialog" onSubmit={onSubmit}>
        <label>할일추가하기</label>
        <input
          value={value}
          onChange={onChange}
          type="text"
          placeholder="할일입력"
        />
        <ModalButtonWrap>
          <button>확인</button>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            취소
          </button>
        </ModalButtonWrap>
      </form>
    </ModalWrap>
  );
};

const ModalWrap = styled.dialog`
  padding: 10px 20px;
  z-index: 1;
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    padding: 10px 0;
  }
  input {
    all: unset;
    border-bottom: 1px solid #cccccc;
    outline: none;
    text-align: left;
    margin: 10px 0px;
  }
`;
const ModalButtonWrap = styled.div`
  display: flex;
  button {
    all: unset;
    cursor: pointer;
    padding: 5px 30px 5px 30px;
  }
`;

export default CalendarModal;
