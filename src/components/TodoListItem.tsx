import React from 'react';

const TodoListItem = ({ todos }: any) => {
  return (
    <div>
      {todos.map((todo: any) => {
        return (
          <div key={todo.id}>
            <div>{todo.text}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoListItem;
