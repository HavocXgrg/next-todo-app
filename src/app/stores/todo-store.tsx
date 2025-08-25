import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

//for a single to-do item.
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

// for the entire state of a to-do app
type TodoStoreState = {
  todos: Todo[];
  isFormOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
  addTodo: (todo: Todo) => void;
  updateTodo: (todoId: number, newText: string) => void;
  removeTodo: (todoId: number) => void;
  toggleTodoStatus: (todoId: number) => void;
};

const useTodoStore = create<TodoStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        //initial state of the todos
        todos: [],
        isFormOpen: false,

        //actions for form open and close
        openForm: () => set({ isFormOpen: true }),
        closeForm: () => set({ isFormOpen: false }),

        //action for adding new todo
        addTodo: (todo) => {
          set((state) => ({
            todos: [todo, ...state.todos],
            isFormOpen: false,
          }));
        },

        updateTodo: (todoId, newText) => {
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === todoId ? { ...todo, text: newText } : todo
            ),
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
              todo.id === todoId
                ? { ...todo, completed: !todo.completed }
                : todo
            ),
          }));
        },
      }),
      {
        name: "Todo list", // name of the item in local sorage, see in devTools
      }
    )
  )
);

export default useTodoStore;
