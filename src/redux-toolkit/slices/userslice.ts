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
import {getUsers,createUser} from "@/src/controllers/userController";
import {User,CreateUserPayload} from "@/src/types/users"
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
            state.loading=true;
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
    }
});
export default userSlice.reducer;