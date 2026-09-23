"use client";

import React, { useState } from "react";
import { usePosts } from "@/src/hooks/usePosts";
import { useUsers } from "@/src/hooks/useUsers";
import { X } from "lucide-react";
import { CreatePostPayload } from "@/src/types/posts";
interface props {
  setAddPostOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function Card({ setAddPostOpen }: props) {
  const { users } = useUsers();
  const { addPosts } = usePosts();
  const [formData, setFormData] = useState<CreatePostPayload>({
    userId: 1,
    title: "",
    body: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "userId" ? Number(value) : value,
    }));
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    addPosts(formData);
    setAddPostOpen(false);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 z-0 bg-black/40" />
      <div className="relative z-10 bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">
            Create Post
          </h2>
          <button
            onClick={() => setAddPostOpen(false)}
            className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors rounded-md p-1 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Author
              </label>
              {/* <select
                value={formData.userId}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    userId: Number(e.target.value),
                  }))
                }
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              > */}
              <select
                name="userId"
                required
                value={formData.userId}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="" disabled>
                  Select Authors...
                </option>
                {users.map((user, index) => (
                  <option key={index} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                placeholder="Post title..."
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></input>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Body
              </label>
              <textarea
                value={formData.body}
                name="body"
                placeholder="Write your post..."
                rows={4}
                required
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              ></textarea>
            </div>
            <div className="flex justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={() => setAddPostOpen(false)}
                className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
              >
                Create Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Card;
