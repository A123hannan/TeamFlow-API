"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MessageSquare, Plus } from "lucide-react";
import AddCommentCard from "@/src/components/Comments/AddCommentCard/page";
import { usePosts } from "@/src/hooks/usePosts";
import { useUsers } from "@/src/hooks/useUsers";
import { useComments } from "@/src/hooks/useComments";

import { CreateCommentPayload } from "@/src/types/comments";

import { useParams } from "next/navigation";

function page() {
  const { posts } = usePosts();
  const { users } = useUsers();
  const { comments, addComments } = useComments();

  const params = useParams();

  const post = posts.find((post) => post.id === Number(params?.id));
  const user = users.find((userr) => userr.id === post?.userId);

  const postComments = comments.filter(
    (comment) => comment.postId === post?.id,
  );
  // Comment addition Data
  const [addCommentOpen, setAddCommentOpen] = useState(false);

  return (
    <>
      {" "}
      <main className="flex-1 overflow-y-auto p-4 pt-16 lg:p-6">
        <div className="w-full max-w-5xl mx-auto space-y-5">
          <Link
            href={"/Posts"}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft size={14} /> Back to posts
          </Link>

          <div className="bg-white rounded-xl border border-slate-100 p-6">
            <Link
              className="flex items-center gap-3 mb-5 group w-fit"
              href={`/Users/${post?.userId}`}
              data-discover="true"
            >
              <div className="w-9 h-9 text-sm rounded-full flex items-center justify-center font-semibold text-white shrink-0 bg-cyan-600">
                {user?.name
                  .trim()
                  .split("")
                  .slice(0, 2)
                  .map((word) => word[0].toUpperCase())
                  .join("")}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 group-hover:text-indigo-600 transition-colors">
                  {user?.name}
                </p>
                <p className="text-xs text-slate-400">
                  {user?.username} · {user?.company.name}
                </p>
              </div>
            </Link>
            <h2 className="text-xl font-semibold text-slate-900 capitalize leading-snug mb-3">
              {post?.title}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {post?.body}
            </p>
          </div>

          {/* Comment portion */}
          <div className="bg-white rounded-xl border border-slate-100">
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <MessageSquare size={15} className="text-slate-400" />
                Comments ({postComments.length})
              </h3>
              <button
                onClick={() => setAddCommentOpen(true)}
                className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Plus size={13} /> Add Comment
              </button>
            </div>
            <div className="divide-y divide-slate-50">
              {postComments.map((postComment) => {
                return (
                  <div
                    key={postComment.id}
                    className="px-5 py-4 hover:bg-slate-50/40 transition-colors group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-semibold text-indigo-700 shrink-0">
                        {postComment.name
                          .trim()
                          .split(" ")
                          .slice(0, 2)
                          .map((word) => word[0].toUpperCase())
                          .join("")}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 flex-wrap">
                          <p className="text-xs font-semibold text-slate-900 capitalize">
                            {postComment.name}
                          </p>
                          <p className="text-xs text-slate-400">
                            {postComment.email}
                          </p>
                        </div>
                        <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                          {postComment.body}
                        </p>
                      </div>
                      {/* <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                    <button
                      className="p-1 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded transition-colors"
                      title="Edit"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-pencil"
                        aria-hidden="true"
                      >
                        <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"></path>
                        <path d="m15 5 4 4"></path>
                      </svg>
                    </button>
                    <button
                      className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-trash lucide-trash-2"
                        aria-hidden="true"
                      >
                        <path d="M10 11v6"></path>
                        <path d="M14 11v6"></path>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"></path>
                        <path d="M3 6h18"></path>
                        <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      </svg>
                    </button>
                  </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      {addCommentOpen && (
        <AddCommentCard
          setAddCommentOpen={setAddCommentOpen}
          postId={post?.id || 0}
        />
      )}
    </>
  );
}

export default page;
