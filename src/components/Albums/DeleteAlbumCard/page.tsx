"use client";
import React from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAlbum } from "@/src/hooks/useAlbum";

interface props {
  setDeleteAlbumOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}
function page({ setDeleteAlbumOpen, id }: props) {
  const router = useRouter();

  const { albums, loading, error, RemoveAlbums } = useAlbum();
  const album = albums.find((album) => album.id === id);

  const handleDelete = async () => {
    await RemoveAlbums(id);
    setDeleteAlbumOpen(false);
    router.push("/Albums");
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40"></div>
      <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">
            Delete Album?
          </h2>
          <button className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors rounded-md p-1 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">
          <p className="text-slate-600 text-sm mb-6">
            Delete "{album?.title.toLowerCase()}" and all its photos? This
            action cannot be undone.
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setDeleteAlbumOpen(false)}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              onClick={handleDelete}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-60"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
