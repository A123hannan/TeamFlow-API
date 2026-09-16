import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createComment, getComments } from "@/src/controllers/commentController";
import { Comment, CreateCommentPayload } from "@/src/types/comments";

interface CommentState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = { comments: [], loading: false, error: null };

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (_, { rejectWithValue }) => {
    try { return await getComments(); }
    catch { return rejectWithValue("Failed to fetch comments"); }
  },
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async (comment: CreateCommentPayload, { rejectWithValue }) => {
    try { return await createComment(comment); }
    catch { return rejectWithValue("Failed to add comment"); }
  },
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchComments.fulfilled, (state, action) => { state.loading = false; state.comments = action.payload; })
      .addCase(fetchComments.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(addComment.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addComment.fulfilled, (state, action) => { state.loading = false; state.comments.push(action.payload); })
      .addCase(addComment.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export default commentSlice.reducer;