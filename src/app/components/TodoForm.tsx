"use client";

import React from "react";
import useTodoStore from "../stores/todo-store";
import DialogueBox from "./Dialaogue-box";
import { AnimatePresence } from "motion/react";
import TodoList from "./Todo-list";

const TodoForm = () => {
  const isFormOpen = useTodoStore((state) => state.isFormOpen);
  const openForm = useTodoStore((state) => state.openForm);
  const filterSetter = useTodoStore((state) => state.filterSetter);

  return (
    <main className=" min-h-screen flex justify-center bg-[#1A222E] ">
      <div className=" w-2xl flex flex-col items-center mt-[4rem] ">
        <h1 className="text-4xl font-bold tracking-wide"> Manage Your Todos</h1>
        <div className="mt-6 sm:mt-12 flex justify-between  w-full px-12 ">
          <button
            onClick={openForm}
            className="rounded-md bg-gray-600 px-3 py-2 cursor-pointer hover:scale-108 transition-all capitalize "
          >
            add task
          </button>

          {/* AnimatePresence for exiting animation must be used in conditional rendered children */}
          <AnimatePresence>{isFormOpen && <DialogueBox />}</AnimatePresence>

          <select
            className="bg-gray-600 rounded-md p-2 px-4 "
            onChange={(e) =>
              filterSetter(e.target.value as "all" | "complete" | "incomplete")
            }
          >
            <option value="All">All</option>
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
          </select>
        </div>

        {/* Todos list are rendered by the component below */}
        <div className="bg-black/20 w-full flex flex-wrap mt-4 p-4">
          <TodoList />
        </div>
      </div>
    </main>
  );
};

export default TodoForm;
