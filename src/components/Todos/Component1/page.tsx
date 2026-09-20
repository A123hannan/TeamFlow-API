"use client";
import React from "react";
import Card from "./card";
import { useTodos } from "@/src/hooks/useTodos";
function page() {
  const { todos } = useTodos();
  const completed = todos.filter((todo) => todo.completed === true);
  const pending = todos.filter((todo) => todo.completed === false);
  const details = [
    { text: "Total", number: todos.length },
    { text: "Completed", number: completed.length },
    { text: "Pending", number: pending.length },
  ];
  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {details.map((detail) => (
          <Card key={detail.text} text={detail.text} number={detail.number} />
        ))}
      </div>
      <div className="bg-white rounded-xl border border-slate-100 px-5 py-4">
        <div className="flex items-center justify-between text-xs text-slate-600 mb-2.5">
          <span className="font-medium">Overall completion</span>
          <span className="font-bold text-indigo-600">
            {Math.ceil((completed.length / todos.length) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden ">
          <div
            className="h-full bg-indigo-500 rounded-full transition-all duration-700"
            style={{
              width: `${Math.ceil((completed.length / todos.length) * 100)}%`,
            }}
          ></div>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-slate-400">
          <span>{completed.length} done</span>
          <span>{pending.length} remaining</span>
        </div>
      </div>
    </>
  );
}

export default page;
