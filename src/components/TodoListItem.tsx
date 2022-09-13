import React from 'react';

const TodoListItem = ({ todos }: any) => {
  return (
    <>
      {todos.map((todo: any, index: number) => {
        return (
          <div key={index}>
            <div>{todo.text}</div>
          </div>
        );
      })}
    </>
  );
};

export default TodoListItem;
