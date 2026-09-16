import {Albums,CreateAlbumPayload} from "@/src/types/albums"
import {getAlbums,createAlbum} from "@/src/controllers/albumController"
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"

interface AlbumState{
    albums:Albums[],
    error:null,
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
    "albumms/createalbum",
    async(Album:CreateAlbumPayload,{rejectWithValue})=>{
        try{
            return await createAlbum(Album)
        }
        catch(error:any){
            return rejectWithValue("failed to add Album")
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
                state.albums.push(action.payload);
            })
        .addCase(addAlbum.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as null;
            });
    }
})
export default albumSlice.reducer;