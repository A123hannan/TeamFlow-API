import { Comment, CreateCommentPayload } from "@/src/types/comments";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getComments = async (): Promise<Comment[]> => {
  const response = await fetch(`${API_URL}/comments`);
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json();
};

export const createComment = async (
  comment: CreateCommentPayload,
): Promise<Comment> => {
  const response = await fetch(`${API_URL}/comments`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(comment),
  });
  if (!response.ok) throw new Error("Failed to create comment");
  return response.json();
};