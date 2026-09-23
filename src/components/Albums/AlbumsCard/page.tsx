import React from "react";
import { FolderOpen, ExternalLink } from "lucide-react";
import Link from "next/link";

interface props {
  id: number;
  albumTitle: string;
  albumAuthor?: string;
  noOfPhotosInAlbum: number;
  index: number;
}

const colorThemes = [
  { bg: "bg-cyan-50", text: "text-cyan-600" },
  { bg: "bg-emerald-50", text: "text-emerald-600" },
  { bg: "bg-amber-50", text: "text-amber-600" },
  { bg: "bg-rose-50", text: "text-rose-600" },
  { bg: "bg-purple-50", text: "text-purple-600" },
];

function page({
  albumTitle,
  albumAuthor,
  noOfPhotosInAlbum,
  index,
  id,
}: props) {
  const theme = colorThemes[index % colorThemes.length];

  return (
    <div className="w-full min-w-0 bg-white rounded-xl border border-slate-100 overflow-hidden hover:border-slate-200 hover:shadow-sm transition-all group">
      <div
        className={`h-36 flex items-center justify-center relative ${theme.bg}`}
      >
        <div
          className={`w-16 h-16 rounded-xl flex items-center justify-center bg-white shadow-sm ${theme.text}`}
        >
          <FolderOpen size={28} />
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-slate-900 capitalize line-clamp-2 leading-snug">
          {albumTitle}
        </h3>
        <p className="text-xs text-slate-500 mt-1">By {albumAuthor}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-slate-400">
            {noOfPhotosInAlbum} Photos
          </span>
          <Link
            href={`/Albums/${id}`}
            className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1 transition-colors"
          >
            Open
            <ExternalLink size={10} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default page;
