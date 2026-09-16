import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPhoto, getPhotos } from "@/src/controllers/photoController";
import { CreatePhotoPayload, Photo } from "@/src/types/photos";

interface PhotoState {
  photos: Photo[];
  loading: boolean;
  error: string | null;
}

const initialState: PhotoState = { photos: [], loading: false, error: null };

export const fetchPhotos = createAsyncThunk(
  "photos/fetchPhotos",
  async (_, { rejectWithValue }) => {
    try { return await getPhotos(); }
    catch { return rejectWithValue("Failed to fetch photos"); }
  },
);

export const addPhoto = createAsyncThunk(
  "photos/addPhoto",
  async (photo: CreatePhotoPayload, { rejectWithValue }) => {
    try { return await createPhoto(photo); }
    catch { return rejectWithValue("Failed to add photo"); }
  },
);

const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPhotos.fulfilled, (state, action) => { state.loading = false; state.photos = action.payload; })
      .addCase(fetchPhotos.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; })
      .addCase(addPhoto.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(addPhoto.fulfilled, (state, action) => { state.loading = false; state.photos.push(action.payload); })
      .addCase(addPhoto.rejected, (state, action) => { state.loading = false; state.error = action.payload as string; });
  },
});

export default photoSlice.reducer;