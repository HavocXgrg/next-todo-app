import React from "react";
import useTodoStore from "../stores/todo-store";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const todos = useTodoStore((state) => state.todos);
  const filtered = useTodoStore((state) => state.filtered);

  const filteredTodos = todos.filter((todo) => {
    if (filtered === "complete") return todo.completed;
    if (filtered === "incomplete") return !todo.completed;
    return true; //for "all"
  });

  return (
    <div className="w-full min-h-24">
      <div className="todo-list">
        {filteredTodos.length === 0 ? (
          <div className="text-center text-xl text-gray-200 pt-4">
            --- Start Adding Todos ---
          </div>
        ) : (
          <ul className="space-y-4">
            {filteredTodos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TodoList;
