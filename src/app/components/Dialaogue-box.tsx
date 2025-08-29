import React, { useState } from "react";
import useTodoStore from "../stores/todo-store";
import { motion } from "motion/react";

const DialogueBox = () => {
  const closeForm = useTodoStore((state) => state.closeForm);
  const addTodo = useTodoStore((state) => state.addTodo);

  const [todo, setTodo] = useState("");
  const [status, setStatus] = useState<"complete" | "incomplete">("incomplete"); //type annotations for status state variable

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTodo = todo.trim();
    if (!trimmedTodo) return;
    addTodo(trimmedTodo, status === "complete"); //this === assignment helps to return boolean
    setTodo("");
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-1000">
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="container h-[24rem] w-[26rem] fixed top-54 left-[35rem] bg-[#312f57] p-8 z-100"
      >
        <button
          className="crossBox bg-red-800 w-6 h-6 absolute flex justify-center left-[92%] top-2 cursor-pointer hover:scale-116 "
          onClick={closeForm}
        >
          X
        </button>
        <form>
          <label className="flex flex-col gap-4 font-bold">
            Title:
            <input
              type="text"
              autoFocus
              className="bg-slate-800 h-10 text-gray-300 font-light p-4 mb-6 capitalize tracking-wide outline-none"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            Status:
            <select
              className="bg-slate-800 font-light text-gray-200 p-4"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "complete" | "incomplete")
              }
            >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
          </label>

          <div className="btn flex gap-8 mt-18 ">
            <button
              className="bg-green-700 p-2 px-4 text-white rounded-sm cursor-pointer hover:scale-110 transition-all"
              onClick={handleAdd}
            >
              Add Task
            </button>

            <button
              type="button"
              className="bg-red-800 p-2 px-4 rounded-sm cursor-pointer hover:scale-110 transition-all"
              onClick={closeForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default DialogueBox;
