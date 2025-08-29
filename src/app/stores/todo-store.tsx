import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

//for a single to-do item.
export type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

// for the entire state of a to-do app
export type TodoStoreState = {
  todos: Todo[];
  isFormOpen: boolean;
  filtered: "all" | "complete" | "incomplete";
  openForm: () => void;
  closeForm: () => void;
  addTodo: (text: string, completed: boolean) => void;
  updateTodo: (todoId: number, newText: string) => void;
  removeTodo: (todoId: number) => void;
  toggleTodoStatus: (todoId: number) => void;
  filterSetter: (filtered: "all" | "complete" | "incomplete") => void;
};

const useTodoStore = create<TodoStoreState>()(
  devtools(
    persist(
      (set) => ({
        //initial state of the todos
        todos: [],
        isFormOpen: false,
        filtered: "all",

        //actions for form open and close
        openForm: () => set({ isFormOpen: true }),
        closeForm: () => set({ isFormOpen: false }),

        //action for adding new todo
        addTodo: (text, completed) => {
          const trimmedText = text.trim();
          if (!trimmedText) return;
          set((state) => ({
            todos: [
              { id: Date.now(), text: trimmedText, completed },
              ...state.todos,
            ],
            isFormOpen: false,
          }));
        },

        updateTodo: (todoId, newText) => {
          const trimmedText = newText.trim();
          if (!trimmedText) return; // Prevent empty updates
          set((state) => ({
            todos: state.todos.map((todo) =>
              todo.id === todoId ? { ...todo, text: trimmedText } : todo
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

        filterSetter: (filtered) => set({ filtered }),
      }),
      {
        name: "Todo list", // name of the item in local sorage, see in devTools
      }
    )
  )
);

export default useTodoStore;
