"use client";

import React, { SetStateAction, useState } from "react";
import { useAlbum } from "@/src/hooks/useAlbum";
import { useUsers } from "@/src/hooks/useUsers";
import { CreateAlbumPayload } from "@/src/types/albums";
import { X, CheckIcon } from "lucide-react";
interface props {
  setAddAlbumOpen: React.Dispatch<SetStateAction<boolean>>;
}
function Card({ setAddAlbumOpen }: props) {
  const { users } = useUsers();
  const { addAlbums } = useAlbum();
  const [formData, setFormData] = useState<CreateAlbumPayload>({
    userId: "",
    title: "",
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (typeof formData.userId !== "number" || formData.userId <= 0) {
      return;
    }
    addAlbums(formData);
    setAddAlbumOpen(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40"></div>
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">
            Create Album
          </h2>
          <button
            className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors rounded-md p-1 hover:bg-slate-100"
            onClick={() => setAddAlbumOpen(false)}
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Album Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Team Offsite 2025"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Created by
                </label>
                <select
                  value={formData.userId}
                  name="userId"
                  required
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="" disabled>
                    Select member…
                  </option>
                  {users.map((user, index) => (
                    <option key={index} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setAddAlbumOpen(false)}
                type="button"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
              >
                Create Album
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Card;
