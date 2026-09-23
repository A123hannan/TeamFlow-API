import React from "react";
import { MessageCircleIcon } from "lucide-react";
type props = {
  fullName: string;
  title: string;
  body: string;
  noOfComments: number;
};
function card({ fullName, title, body, noOfComments }: props) {
  return (
    <div className="px-5 py-4 hover:bg-slate-50/50 transition-colors">
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-7 h-7 text-xs rounded-full flex items-center justify-center font-semibold text-white shrink-0 mt-0.5 shrink-0 bg-cyan-600">
          {fullName
            .trim()
            .split(" ")
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join("")}
        </div>
        <div className="min-w-0">
          <p className="break-words text-sm font-medium text-slate-900 line-clamp-2 capitalize">
            {title}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">{fullName}</p>
          <p className="break-words text-xs text-slate-400 mt-1 line-clamp-2">
            {body}
          </p>
          <div className="flex flex-wrap gap-1 mt-2 items-center">
            <MessageCircleIcon size={11} className="text-slate-300" />
            <p className="text-xss text-slate-400">{noOfComments} comments</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default card;
