"use client";

import { useComments } from "@/src/hooks/useComments";

export default function CommentsPage() {
  const { comments, loading, error } = useComments();
  return (
    <main>
      <h1>Comments</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {comments.map((comment) => (
        <article key={comment.id}>
          <h2>{comment.name}</h2>
          <p>{comment.email}</p>
          <p>{comment.body}</p>
        </article>
      ))}
    </main>
  );
}
