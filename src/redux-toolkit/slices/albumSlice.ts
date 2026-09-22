import {Albums,CreateAlbumPayload,UpdateAlbumPayload} from "@/src/types/albums"
import {getAlbums,createAlbum,updateAlbum,deleteAlbum} from "@/src/controllers/albumController"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

interface AlbumState{
    albums:Albums[],
    error:string|null,
    loading:boolean
}
const initialState:AlbumState={
    albums:[],
    error:null,
    loading:false
}

export const fetchAlbums=createAsyncThunk(
    "albums/fetchAlbums",
    async(_,{rejectWithValue})=>{
        try{
            return await getAlbums();
        }
        catch(error:any){
         return rejectWithValue("Failed tp fetch albums")   
        }
    }
)
export const addAlbum=createAsyncThunk(
    "albums/createalbum",
    async(Album:CreateAlbumPayload,{rejectWithValue})=>{
        try{
            return await createAlbum(Album)
        }
        catch(error:any){
            return rejectWithValue("failed to add Album")
        }

    }
)
export const EditAlbum=createAsyncThunk(
    "albums/updateAlbum",
    async(Album:UpdateAlbumPayload,{rejectWithValue})=>{
        try{
            return await updateAlbum(Album);
        }
        catch(error:any){
            return rejectWithValue("Failed to update the Abum")
        }
    }
)
export const RemoveAlbum=createAsyncThunk(
    "albums/removeAlbum",
    async(id:number,{rejectWithValue})=>{
        try{
            return await deleteAlbum(id);
        }
        catch(error:any){
            return rejectWithValue("Failed to delete teh Album")
        }
    }
)
const albumSlice=createSlice({
    name: "albums",
    initialState,
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAlbums.pending,(state)=>{
            state.error=null;
            state.loading=true
        })
        .addCase(fetchAlbums.fulfilled,(state,action)=>{
            state.loading=false,
            state.albums=action.payload 
        })
        .addCase(fetchAlbums.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as null
        })
        .addCase(addAlbum.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
        .addCase(addAlbum.fulfilled, (state, action) => {
                state.loading = false;
            state.albums.unshift(action.payload);
            })
        .addCase(addAlbum.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as null;
            })
        .addCase(EditAlbum.pending,(state)=>{
            state.error=null;
            state.loading=true;

        })
        .addCase(EditAlbum.fulfilled,(state,action)=>{
            state.loading=false;
            const index=state.albums.findIndex((u)=>u.id===action.payload.id)
            if(index!==-1){
                state.albums[index]={...state.albums[index],...action.payload}
            }
        })
        .addCase(RemoveAlbum.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(RemoveAlbum.fulfilled, (state, action) => {
            state.loading = false;
            // Filter out the deleted Album by matching the id returned from the thunk
            const deletedId = action.payload as number;
            state.albums = state.albums.filter((album) => album.id !== deletedId);
        })
        .addCase(RemoveAlbum.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string | null;
        });
    }
})
export default albumSlice.reducer;