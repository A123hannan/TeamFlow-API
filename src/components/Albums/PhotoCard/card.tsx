"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Photo } from "@/src/types/photos";
import { X } from "lucide-react";
interface props {
  selectedPhoto: Photo;
  setPhotoSelection: Dispatch<SetStateAction<boolean>>;
}
function card({
  selectedPhoto,
  setPhotoSelection,
}: {
  selectedPhoto: Photo;
  setPhotoSelection: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div
      onClick={() => setPhotoSelection(false)}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
    >
      <div className="absolute z-[100] bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Photo #{selectedPhoto.id}
          </span>
          <button
            onClick={() => setPhotoSelection(false)}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 hover:rotate-90  duration-200 transition-transform cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>
        <div className="aspect-square w-full bg-slate-900 flex items-center justify-center overflow-hidden">
          <img
            alt="officia porro iure quia iusto qui ipsa ut modi"
            className="w-full h-full object-cover"
            src="https://picsum.photos/seed/3/800/800"
          />
        </div>
        <div className="p-4 sm:p-5">
          <h3 className="text-sm sm:text-base font-bold text-slate-900 capitalize leading-snug">
            {selectedPhoto.title}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Album #{selectedPhoto.albumId}
          </p>
        </div>
      </div>
    </div>
  );
}

export default card;
