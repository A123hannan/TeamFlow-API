import React from "react";
import { Posts } from "@/src/types/posts";
import { MessageCircleIcon } from "lucide-react";
import Link from "next/link";
interface PostCardProps extends Posts {
  authorName: string;
  authorUserName: string;
  noOfComments: number;
}

function Page({
  id,
  userId,
  title,
  body,
  authorName,
  authorUserName,
  noOfComments,
}: PostCardProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-5 flex flex-col gap-3 hover:border-slate-200 hover:shadow-sm transition-all group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-cyan-600 w-7 h-7 text-xs rounded-full flex items-center justify-center font-semibold text-white shrink-0 ">
            {authorName
              .trim()
              .split(" ")
              .slice(0, 2)
              .map((word) => word[0].toUpperCase())
              .join("")}
          </div>
          <div>
            <p className="text-xs font-medium text-slate-900">{authorName}</p>
            <p className="text-xs text-slate-400">@{authorUserName}</p>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-slate-900 capitalize leading-snug line-clamp-2">
          {title}
        </h3>
        <p className="text-xs text-slate-500 mt-1.5 line-clamp-3 leading-relaxed">
          {body}
        </p>
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-slate-50">
        <div className="flex items-center gap-1 text-slate-400">
          <MessageCircleIcon size={12} />
          <span className="text-xs">{noOfComments} comment</span>
        </div>
        <Link
          href={`/Posts/${id}`}
          className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View Post
        </Link>
      </div>
    </div>
  );
}

export default Page;
