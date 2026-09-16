"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, fetchComments } from "@/src/redux-toolkit/slices/commentSlice";
import { AppDispatch, RootState } from "@/src/redux-toolkit/store/store";
import { CreateCommentPayload } from "@/src/types/comments";

export const useComments = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { comments, loading, error } = useSelector((state: RootState) => state.comments);
  useEffect(() => { dispatch(fetchComments()); }, [dispatch]);
  const addComments = (comment: CreateCommentPayload) => dispatch(addComment(comment));
  return { comments, loading, error, addComments };
};