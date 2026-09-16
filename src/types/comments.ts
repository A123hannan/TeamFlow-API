export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface CreateCommentPayload {
  postId: number;
  name: string;
  email: string;
  body: string;
}