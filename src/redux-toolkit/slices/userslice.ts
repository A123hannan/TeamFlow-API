// import {createSlice,nanoid} from "@reduxjs/toolkit";

// const initialState={
//        users:[{id:"",name:"Ali",}]
//         }

// export const userSlice=createSlice({
//     name:"users",
//     initialState,
//     reducers:{
//         addUser:(state,action)=>{
//             const newUser={
//                 id:nanoid(),
//                 name:action.payload.name,
//                 email:action.payload.email
//             };
//             state.users.push(newUser);
//         }
//     }
// });
// export const {addUser}=userSlice.actions;
// export default userSlice.reducer;

import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import {getUsers,createUser,updateUser,DeletedUser} from "@/src/controllers/userController";
import {User,CreateUserPayload,UpdateUserPayload} from "@/src/types/users"
interface UserState{
    users:User[];
    loading:boolean;
    error:string|null;
}
const initialState: UserState = {
    users: [],
    loading: false,
    error: null
};

export const fetchUsers=createAsyncThunk(
    "users/fetchUsers",
    async(_,{rejectWithValue})=>{
        try{
            return await getUsers();
        }
        catch(error:any){
            return rejectWithValue("Failed to fetch users");
        }
    }
);

export const addUsers=createAsyncThunk(
"users/addUser",
async(user:CreateUserPayload,{rejectWithValue})=>{
    try {
       return await createUser(user);
    }
    catch(error:any){
        return rejectWithValue("Failed to add user");
    }
}
)

export const EditUser=createAsyncThunk(
    "users/UpdateUser",
    async(User:UpdateUserPayload,{rejectWithValue})=>{
        try{
            return await updateUser(User)
        }
        catch(error:any){
            return rejectWithValue("Failed to update the User.")
        }
    }
)
export const RemoveUser=createAsyncThunk(
    "users/Deleteser",
    async(id:number,{rejectWithValue})=>{
        try{
            await DeletedUser(id);
            return id;
        }
        catch{
            return rejectWithValue("Failed to delete User.")
        }
    }
);

const userSlice=createSlice({
    name:"users",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUsers.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users=action.payload as User[];
        })
        .addCase(fetchUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string|null;
        })
        .addCase(addUsers.pending,(state)=>{
            state.error=null;
        })
        .addCase(addUsers.fulfilled,(state,action)=>{
            state.loading=false;
            state.users.push(action.payload as User);
        })
        .addCase(addUsers.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string|null;
        })  
        .addCase(EditUser.pending,(state)=>{
            state.error=null;
        })
        .addCase(EditUser.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.users.findIndex((u) => u.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = { ...state.users[index], ...action.payload };
            }
        })
        .addCase(EditUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string|null
        })
        .addCase(RemoveUser.pending, (state) => {
                state.error = null;
            })
            .addCase(RemoveUser.fulfilled, (state, action) => {
                state.loading = false;
                // Filter out the deleted user by matching the id returned from the thunk
                const deletedId = action.payload as number;
                state.users = state.users.filter((user) => user.id !== deletedId);
            })
            .addCase(RemoveUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string | null;
            });
    }
});
export default userSlice.reducer;