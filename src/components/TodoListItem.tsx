import React from 'react';

const TodoListItem = ({ todos }: any) => {
  return (
    <div>
      {todos.map((todo: any) => {
        return (
          <>
            <div>{todo.text}</div>
          </>
        );
      })}
    </div>
  );
};

export default TodoListItem;
