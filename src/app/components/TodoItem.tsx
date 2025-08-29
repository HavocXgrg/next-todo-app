import React, { useState } from "react";
import useTodoStore from "../stores/todo-store";
import { MdDelete, MdModeEdit, MdCancel } from "react-icons/md";
import { SiTicktick } from "react-icons/si";

interface TodoItemProps {
  todo: { id: number; text: string; completed: boolean };
}
const TodoItem = ({ todo }: TodoItemProps) => {
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const toggleTodoStatus = useTodoStore((state) => state.toggleTodoStatus);

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleSave = () => {
    if (editedText.trim()) {
      updateTodo(todo.id, editedText);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(todo.text); // Reset to original
    setIsEditing(false);
  };
  return (
    <li
      className={`flex items-center text-black p-2 gap-4 capitalize ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodoStatus(todo.id)}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="flex-1 bg-transparent border px-2 outline-none capitalize"
            autoFocus
          />
          <button //save button
            onClick={handleSave}
            className="text-2xl text-green-500 hover:text-green-900 cursor-pointer"
          >
            <SiTicktick />
          </button>

          <button //cancel button
            onClick={handleCancel}
            className="text-2xl text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <MdCancel />
          </button>
        </>
      ) : (
        <>
          <span
            className={`flex-1 ${
              todo.completed ? "line-through text-gray-500" : ""
            }`}
          >
            {todo.text}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 hover:text-blue-700 text-2xl cursor-pointer"
          >
            <MdModeEdit />
          </button>
          <button
            onClick={() => removeTodo(todo.id)}
            className=" text-2xl text-red-500 hover:text-red-700 cursor-pointer"
          >
            <MdDelete />
          </button>
        </>
      )}
    </li>
  );
};

export default TodoItem;
