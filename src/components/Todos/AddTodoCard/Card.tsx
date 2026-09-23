"use client";

import React, { SetStateAction, useState } from "react";
import { useTodos } from "@/src/hooks/useTodos";
import { useUsers } from "@/src/hooks/useUsers";
import { CreateTodoPayload } from "@/src/types/todos";
import { X, CheckIcon } from "lucide-react";
interface props {
  setAddTodoOpen: React.Dispatch<SetStateAction<boolean>>;
}
function Card({ setAddTodoOpen }: props) {
  const { users } = useUsers();
  const { addTodo } = useTodos();
  const [handleComplete, setHandleComplete] = useState(false);
  const [formData, setFormData] = useState<CreateTodoPayload>({
    userId: "Select member...",
    title: "",
    completed: false,
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "userId" ? Number(value) : value,
    }));
  };
  const handleCompleteChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setHandleComplete((prev) => {
      const completed = !prev;
      setFormData((current) => ({ ...current, completed }));
      return completed;
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo(formData);
    setAddTodoOpen(false);
  };
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4">
      <div className="fixed inset-0 bg-black/40"></div>
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">
            Create Task
          </h2>
          <button
            className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors rounded-md p-1 hover:bg-slate-100"
            onClick={() => setAddTodoOpen(false)}
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Task Title
                </label>
                <input
                  name="title"
                  placeholder="e.g. Review project documentation"
                  required
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={formData.title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Assign to
                </label>
                <select
                  name="userId"
                  required
                  value={formData.userId}
                  onChange={handleChange}
                  className="cursor-pointer w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="Select member..." disabled>
                    Select member…
                  </option>
                  {users.map((user, index) => (
                    <option key={index} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                name="complete"
                onClick={handleCompleteChange}
                type="button"
                className="flex items-center gap-3 cursor-pointer"
              >
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${handleComplete ? "border-indigo-600 bg-indigo-600 text-white" : "border-slate-300"}`}
                >
                  {handleComplete === true ? <CheckIcon /> : ""}
                </div>
                <span className="text-sm text-slate-700">
                  Mark as completed
                </span>
              </button>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setAddTodoOpen(false)}
                type="button"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Card;
