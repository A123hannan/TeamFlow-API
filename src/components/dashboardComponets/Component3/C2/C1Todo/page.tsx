"use client";
import React from "react";
import Link from "next/link";
import { useTodos } from "@/src/hooks/useTodos";
import { ArrowRight } from "lucide-react";
function page() {
  const { todos } = useTodos();
  const completesTasks = todos.filter((todo) => todo.completed === true);
  const pendingTasks = todos.filter((todo) => todo.completed === false);
  const ratio =
    (completesTasks.length / (completesTasks.length + pendingTasks.length)) *
    100;
  return (
    <div className="bg-white rounded-xl border border-slate-100">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
        <h3 className="text-sm font-semibold text-slate-900">Task Overview</h3>
        <Link
          href="/Todos"
          className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          View all
          <ArrowRight size={12} />
        </Link>
      </div>
      <div className="px-5 py-5 space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center justify-between text-sm">
            Task Progress
          </span>
          <span className="font-semibold text-slate-900">{ratio}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full bg-indigo-500 rounded-full transition-all duration-700 `}
            style={{ width: `${ratio}%` }}
          ></div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xl font-bold text-green-700">
              {completesTasks.length}
            </p>
            <p className="text-xs text-green-600 font-medium mt-0.5">
              Completed
            </p>
          </div>
          <div className="bg-amber-50 rounded-lg p-3">
            <p className="text-xl font-bold text-amber-700">
              {pendingTasks.length}
            </p>
            <p className="text-xs text-amber-600 font-medium mt-0.5">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
