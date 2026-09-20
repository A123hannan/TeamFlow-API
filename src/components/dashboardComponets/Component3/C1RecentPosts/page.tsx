"use client";
import React from "react";
import { usePosts } from "@/src/hooks/usePosts";
import { useComments } from "@/src/hooks/useComments";
import { useUsers } from "@/src/hooks/useUsers";
import { ArrowRight } from "lucide-react";
import PostCard from "./PostCard/card";
import Link from "next/link";
function page() {
  const { posts } = usePosts();
  const { comments } = useComments();
  const { users } = useUsers();
  const RecentPosts = posts.slice(0, 5);
  return (
    <div className="bg-white rounded-xl border border-slate-100">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
        <h3 className="text-sm font-semibold text-slate-900">Recent Posts</h3>
        <Link
          href="/Posts"
          className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          View all
          <ArrowRight size={12} />
        </Link>
      </div>
      <div>
        {RecentPosts.map((post) => {
          const postComments = comments.filter(
            (comment) => comment.postId === post.id,
          );
          const fullName = users.find((user) => user.id === post.userId)?.name;
          return (
            <PostCard
              key={post.id}
              fullName={fullName ?? "No Name"}
              title={post.title}
              body={post.body}
              noOfComments={postComments.length}
            />
          );
        })}
      </div>
    </div>
  );
}

export default page;
