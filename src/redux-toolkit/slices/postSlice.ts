import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getPosts,createPost} from "@/src/controllers/postController"
import {Posts,CreatePostPayload} from "@/src/types/posts"
interface poststate{
    posts:Posts[];
    loading:boolean;
    error:string|null;
}
const initialState:poststate={
    posts:[],
    loading:false,
    error:null
}
export const fetchPosts=createAsyncThunk(
    "posts/fetchPosts",
    async(_,{rejectWithValue})=>{
        try{
            return await getPosts();
        }
        catch(error:any){
            return rejectWithValue("Failed to fetch posts");
        }
    }
)
export const addPost=createAsyncThunk(
    "posts/addPost",
    async(post:CreatePostPayload,{rejectWithValue})=>{
        try{
            return await createPost(post);
        }
        catch(error:any){
            return rejectWithValue("Failed to add post");
        }
    }
)
const postSlice=createSlice({
    name:"posts",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchPosts.pending,(state)=>{
            state.loading=true;
            state.error=null
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.loading=false
            state.posts=action.payload
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload as string|null
        })
        .addCase(addPost.pending,(state)=>{
            state.error=null;
        })
        .addCase(addPost.fulfilled,(state,action)=>{
            state.loading=false;
            state.posts.push(action.payload as Posts);
        })
        .addCase(addPost.rejected,(state, action)=>{
            state.loading=false;
            state.error=action.payload as string|null;
        })
        
    }
})
export default postSlice.reducer;