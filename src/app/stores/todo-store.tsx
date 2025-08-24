import { todo } from "node:test";
import React from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

//for a single to-do item.
type Todo = {
  id: number;
  text: string;
  completed: boolean;
};
// for the entire state of a to-do app
type TodoStoreState = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  removeTodo: (todoId: number) => void;
  toggleTodoStatus: (todoId: number) => void;
};

const TodoStore = create<TodoStoreState>((set) => ({
  //initial state of the todos
  todos: [],

  //action for adding new todo
  addTodo: (todo) => {
    set((state) => ({
      todos: [todo, ...state.todos],
    }));
  },

  //action to remove the todo item by Id.
  removeTodo: (todoId) => {
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== todoId),
    }));
  },

  //action to toggle the todo status
  toggleTodoStatus: (todoId) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
      ),
    }));
  },
}));

export default TodoStore;
