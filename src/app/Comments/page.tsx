"use client";

import { useComments } from "@/src/hooks/useComments";
import ResourceState from "@/src/components/common/ResourceState";
import { PostCardSkeleton } from "@/src/components/LoadingSkeleton/page";

export default function CommentsPage() {
  const { comments, loading, error } = useComments();
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-4xl space-y-5">
        <h1 className="text-xl font-semibold text-slate-900">Comments</h1>
        {loading && comments.length === 0 ? (
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <ResourceState message={`Unable to load comments: ${error}`} error />
        ) : comments.length === 0 ? (
          <ResourceState message="No comments are available yet." />
        ) : (
          <div className="space-y-3">
            {comments.map((comment) => (
              <article
                key={comment.id}
                className="rounded-xl border border-slate-100 bg-white p-4"
              >
                <h2 className="text-sm font-semibold text-slate-900">
                  {comment.name}
                </h2>
                <p className="mt-1 text-xs text-slate-400">{comment.email}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {comment.body}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
