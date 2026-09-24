"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useTodos } from "@/src/hooks/useTodos";
import DeletionAlert from "@/src/components/DeletionAlert/page";

interface Props {
  setDeleteTaskOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

function Page({ setDeleteTaskOpen, id }: Props) {
  const { todos, deleteTodo } = useTodos();
  const todo = todos.find((item) => item.id === id);

  const handleDelete = () => {
    deleteTodo(id);
    setAlertOpen(false);
    setDeleteTaskOpen(false);
  };

  const [alertOpen, setAlertOpen] = useState(false);

  return (
    <>
      {!alertOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40" />
          <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-base font-semibold text-slate-900">
                Delete Task?
              </h2>
              <button
                type="button"
                onClick={() => setDeleteTaskOpen(false)}
                className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors rounded-md p-1 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>
            <div className="px-6 py-5">
              <p className="text-slate-600 text-sm mb-6">
                Delete &quot;{todo?.title}&quot;? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteTaskOpen(false)}
                  className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setAlertOpen(true);
                  }}
                  className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-60"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {alertOpen && (
        <DeletionAlert
          text="Task"
          handleDelete={handleDelete}
          setAlertOpen={setAlertOpen}
        />
      )}
    </>
  );
}

export default Page;
