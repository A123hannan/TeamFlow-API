import {getTodos, createTodo} from "@/src/controllers/todoController";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {todos, CreateTodoPayload} from "@/src/types/todos";

interface TodoState{
    todos:todos[];
    loading:boolean;
    error:string|null;
}
const initialState:TodoState={
    todos:[],
    loading:false,
    error:null
}
export const fetchTodos=createAsyncThunk(
    "todos/fetchTodos",
    async(_,{rejectWithValue})=>{
        try{
        return await getTodos()}
        catch(error:any){
            return rejectWithValue("Failed to fetch todos");
        }
    }
)

export const addTodos=createAsyncThunk(
    "todos/addTodo",
    async(todos:CreateTodoPayload,{rejectWithValue})=>{
        try{
            return await createTodo(todos);
        }
        catch(error:any){
            return rejectWithValue("Failed to add todo");
        }
    }
)
const todoSlice=createSlice({
    name:"todos",
    initialState,
    reducers:{
        toggleTodo:(state, action: { payload: number }) => {
            const todo = state.todos.find((item) => item.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchTodos.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(fetchTodos.fulfilled,(state,action)=>{
            state.loading=false;
            state.todos=action.payload as todos[];
        })
        .addCase(fetchTodos.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string|null;
        })
        .addCase(addTodos.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(addTodos.fulfilled,(state,action)=>{
            state.loading=false;
            state.todos.push(action.payload as todos);
        })
        .addCase(addTodos.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string|null;
        })
    }
});
export const { toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;