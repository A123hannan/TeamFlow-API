"use client";

import React, { useState } from "react";
import { CircleCheckBigIcon, Circle } from "lucide-react";
import { todos } from "@/src/types/todos";
import { useUsers } from "@/src/hooks/useUsers";
function todoCard({ userId, id, title, completed }: todos) {
  const { users } = useUsers();
  const userName = users.find((user) => user.id === userId)?.name || "Unknown";
  const [isCompleted, setIsCompleted] = useState(completed);

  const handleTask = () => {
    setIsCompleted((prev) => !prev);
  };

  return (
    <div className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50/50 transition-colors group">
      <button
        className="cursor-pointer shrink-0 transition-colors"
        onClick={handleTask}
      >
        {isCompleted ? (
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
          isCompleted
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
    </div>
  );
}

export default todoCard;
