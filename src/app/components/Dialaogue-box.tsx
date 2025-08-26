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
    if (!todo) return alert("Add the Todo Please!!!");

    addTodo({
      id: Date.now(),
      text: todo,
      completed: status === "complete", //this returns boolean === assignment helps to return boolean
    });

    setTodo("");
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="container h-[24rem] w-[26rem] fixed top-54 left-[35rem] bg-[#070622] p-8 z-100"
      >
        <button
          className="crossBox bg-red-800 w-6 h-6 absolute flex justify-center left-[92%] top-2 cursor-pointer hover:scale-116 "
          onClick={closeForm}
        >
          X
        </button>
        <form>
          <label className="flex flex-col gap-4">
            Title:
            <input
              type="text"
              className="bg-gray-400 h-10 text-black p-4 mb-6 capitalize"
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
            />
            Status:
            <select
              className="bg-gray-400  text-black p-4"
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as "complete" | "incomplete")
              }
            >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
          </label>

          <div className="btn flex gap-8 mt-14 ">
            <button
              className="bg-green-500 p-2 px-4 text-black rounded-sm cursor-pointer hover:scale-110 transition-all"
              onClick={handleAdd}
            >
              Add Task
            </button>

            <button
              type="button"
              className="bg-red-500 p-2 px-4 rounded-sm cursor-pointer hover:scale-110 transition-all"
              onClick={closeForm}
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </>
  );
};

export default DialogueBox;
