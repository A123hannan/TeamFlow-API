"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useTodos } from "@/src/hooks/useTodos";
import { useUsers } from "@/src/hooks/useUsers";
import { UpdateTodoPayload } from "@/src/types/todos";

interface Props {
  setUpdateTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

function Page({ setUpdateTaskOpen, id }: Props) {
  const { todos, updateTodo } = useTodos();
  const { users } = useUsers();
  const todo = todos.find((item) => item.id === id);
  const [formData, setFormData] = useState<UpdateTodoPayload>({
    id,
    userId: todo?.userId ?? 1,
    title: todo?.title ?? "",
    completed: todo?.completed ?? false,
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateTodo(formData);
    setUpdateTaskOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40" />
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">Edit Task</h2>
          <button
            type="button"
            onClick={() => setUpdateTaskOpen(false)}
            className="text-slate-400 hover:text-slate-600 rounded-md p-1 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Task Title
              </label>
              <input
                required
                value={formData.title}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    title: event.target.value,
                  }))
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Assign to
              </label>
              <select
                required
                value={formData.userId}
                onChange={(event) =>
                  setFormData((prev) => ({
                    ...prev,
                    userId: Number(event.target.value),
                  }))
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, completed: !prev.completed }))
              }
              className="flex items-center gap-3 cursor-pointer"
            >
              <span
                className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${formData.completed ? "bg-indigo-600 border-indigo-600" : "border-slate-300"}`}
              >
                {formData.completed && (
                  <span className="text-white text-xs">&#10003;</span>
                )}
              </span>
              <span className="text-sm text-slate-700">Mark as completed</span>
            </button>
            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setUpdateTaskOpen(false)}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Page;
