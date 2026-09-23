"use client";

import React, { useState } from "react";
import { CreateCommentPayload } from "@/src/types/comments";
import { X } from "lucide-react";
import { useComments } from "@/src/hooks/useComments";
interface props {
  setAddCommentOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postId: number;
}
function page({ setAddCommentOpen, postId }: props) {
  const { comments, addComments } = useComments();

  const [formData, setFormData] = useState<CreateCommentPayload>({
    postId: postId,
    name: "",
    email: "",
    body: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComments(formData);
    setAddCommentOpen(false);
  };
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4">
      <div className="fixed inset-0 bg-black/40"></div>
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">
            Add Comment
          </h2>
          <button
            onClick={() => setAddCommentOpen(false)}
            className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors rounded-md p-1 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Name
                </label>
                <input
                  placeholder="Your name"
                  type="text"
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Email
                </label>
                <input
                  placeholder="your@email.com"
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Comment Body */}
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Comment
              </label>
              <textarea
                placeholder="Write your comment..."
                name="body"
                value={formData.body}
                onChange={handleChange}
                required
                rows={2}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              ></textarea>
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setAddCommentOpen(false)}
                type="button"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
              >
                Add Comment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default page;
