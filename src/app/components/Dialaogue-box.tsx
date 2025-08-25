import React from "react";
import TodoForm from "./TodoForm";
import useTodoStore from "../stores/todo-store";

const DialogueBox = () => {
  const closeForm = useTodoStore((state) => state.closeForm);
  return (
    <div>
      <div className="container h-[24rem] w-[26rem] fixed top-54 left-[35rem] bg-[#070622] p-8 z-100">
        <button
          className="crossBox bg-red-800 w-6 h-6 absolute flex justify-center left-[92%] top-2 cursor-pointer hover:scale-116 "
          onClick={closeForm}
        >
          X
        </button>
        <label className="flex flex-col gap-4">
          Title:
          <input type="text" className="bg-gray-400 h-10 text-black p-4 mb-6" />
          Status:
          <select className="bg-gray-400  text-black p-4">
            <option value="incomplete">Incomplete</option>
            <option value="complete">Complete</option>
          </select>
        </label>

        <div className="btn flex gap-8 mt-14 ">
          <button className="bg-green-500 p-2 px-4 text-black rounded-sm cursor-pointer hover:scale-110 transition-all">
            Add Task
          </button>
          <button
            className="bg-red-500 p-2 px-4 rounded-sm cursor-pointer hover:scale-110 transition-all"
            onClick={closeForm}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;
