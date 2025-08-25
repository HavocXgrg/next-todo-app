"use client";

import React, { useState } from "react";
import useTodoStore from "../stores/todo-store";
import DialogueBox from "./Dialaogue-box";

const TodoForm = () => {
  const addTodo = useTodoStore((state) => state.addTodo);

  const isFormOpen = useTodoStore((state) => state.isFormOpen);
  const openForm = useTodoStore((state) => state.openForm);

  return (
    <main className=" min-h-screen flex justify-center bg-[#1A222E] ">
      <div className=" w-2xl flex flex-col items-center mt-[4rem] ">
        <h1 className="text-4xl font-bold tracking-wide"> Manage Your Todos</h1>
        <div className="mt-6 sm:mt-12 flex justify-between  w-full px-12 ">
          <button
            onClick={openForm}
            className="rounded-2xl bg-gray-600 px-3 py-2 cursor-pointer hover:scale-108 transition-all capitalize "
          >
            add task
          </button>
          {isFormOpen && <DialogueBox />}
          <button className="rounded-2xl bg-gray-600 px-6 py-2 cursor-pointer hover:scale-108 transition-all">
            All
          </button>
        </div>
      </div>
    </main>
  );
};

export default TodoForm;
