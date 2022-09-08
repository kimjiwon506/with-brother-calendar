import React, { useState } from 'react';

const CalendarModal = () => {
  /** TODO: 캘린더 완성된 후 컴포넌트로 분리하기 */
  return (
    <dialog open>
      할일 추가하기
      <form>
        <input type="text" placeholder="할일입력" />

        <button type={'submit'}>확인</button>
        <button>취소</button>
      </form>
    </dialog>
  );
};

export default CalendarModal;
