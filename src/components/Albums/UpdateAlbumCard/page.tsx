"use client";
import React from "react";
import { useState } from "react";
import { UpdateAlbumPayload } from "@/src/types/albums";
import { useAlbum } from "@/src/hooks/useAlbum";
import { X } from "lucide-react";
interface props {
  setEditAlbumOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}
function page({ setEditAlbumOpen, id }: props) {
  const { albums, EditAlbums } = useAlbum();
  const album = albums.find((album) => album.id === id);
  const [formData, setFormData] = useState<UpdateAlbumPayload>({
    id: album?.id ?? 1,
    title: album?.title ?? "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    EditAlbums(formData);
    setEditAlbumOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4">
      <div className="fixed inset-0 bg-black/40"></div>
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">Edit Album</h2>
          <button
            onClick={() => setEditAlbumOpen(false)}
            className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors rounded-md p-1 hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Album Title
              </label>
              <input
                name="title"
                onChange={handleChange}
                required
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={formData.title}
              />
            </div>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditAlbumOpen(false)}
                type="button"
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

export default page;
