"use client";

import React, { useState } from "react";
import { CircleCheckBigIcon, Circle } from "lucide-react";
import { todos } from "@/src/types/todos";
import { useUsers } from "@/src/hooks/useUsers";
import { Pencil, Trash } from "lucide-react";
import UpdateTodoCard from "@/src/components/Todos/UpdateTodoCard/page";
import DeleteTodoCard from "@/src/components/Todos/DeleteTodoCard/page";
type TodoCardProps = todos & {
  onToggle: (id: number) => void;
};

function TodoCard({ userId, id, title, completed, onToggle }: TodoCardProps) {
  const { users } = useUsers();
  const [openUpdateTask, setOpenUpdateTask] = useState(false);
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const userName = users.find((user) => user.id === userId)?.name || "Unknown";
  const handleTask = () => {
    onToggle(id);
  };

  return (
    <>
      <div className="group flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50/50 transition-colors group">
        <button
          className="cursor-pointer shrink-0 transition-colors"
          onClick={handleTask}
        >
          {completed ? (
            <CircleCheckBigIcon size={17} className="text-green-500" />
          ) : (
            <Circle
              size={17}
              className="text-slate-300 hover:text-indigo-400 transition-colors"
            />
          )}
        </button>

        <span
          className={
            completed
              ? "flex-1 text-sm leading-relaxed line-through text-slate-400"
              : "flex-1 text-sm leading-relaxed text-slate-700"
          }
        >
          {title}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-7 h-7 text-xs rounded-full flex items-center justify-center font-semibold text-white shrink-0 bg-cyan-600">
            {userName
              .trim()
              .split(" ")
              .slice(0, 2)
              .map((word) => word[0].toUpperCase())
              .join("")}
          </div>
          <span className="text-xs text-slate-500 hidden sm:block truncate max-w-24">
            {userName}
          </span>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            className="cursor-pointer p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
            onClick={() => setOpenUpdateTask(true)}
          >
            <Pencil size={12} />
          </button>
          <button
            className=" cursor-pointer p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
            onClick={() => setOpenDeleteTask(true)}
          >
            {/* <Pencil size={12} /> */}
            <Trash size={12} />
          </button>
        </div>
      </div>

      {openUpdateTask && (
        <UpdateTodoCard id={id} setUpdateTaskOpen={setOpenUpdateTask} />
      )}
      {openDeleteTask && (
        <DeleteTodoCard id={id} setDeleteTaskOpen={setOpenDeleteTask} />
      )}
    </>
  );
}

export default TodoCard;
