import {getTodos, createTodo,deleteTodo,updateTodo} from "@/src/controllers/todoController";
import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {todos, CreateTodoPayload,UpdateTodoPayload} from "@/src/types/todos";

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
        catch{
            return rejectWithValue("Failed to fetch todos");
        }
    }
)

export const addTodos=createAsyncThunk(
    "todos/addTodo",
    async(todo:CreateTodoPayload,{rejectWithValue})=>{
        try{
            return await createTodo(todo);
        }
        catch{
            return rejectWithValue("Failed to add todo");
        }
    }
)
export const EditTodo=createAsyncThunk(
  "todos/updateTodo",
  async(todo:UpdateTodoPayload,{rejectWithValue})=>{
    try{
        return await updateTodo(todo)
    }
    catch{
        return rejectWithValue("failed to update Task")
    }
  }   
)
export const RemoveTodo=createAsyncThunk(
    "todos/deleteTodo",
    async(id:number,{rejectWithValue})=>{
        try{
            return await deleteTodo(id)
        }
        catch{
            return rejectWithValue("Failed to delete teh Task")
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
        .addCase(EditTodo.pending,(state)=>{
            state.error=null;
        })
        .addCase(EditTodo.fulfilled,(state,action)=>{
            state.loading=false;
            const index=state.todos.findIndex((todo)=>todo.id===action.payload.id);
            if(index !== -1){
                state.todos[index]={...state.todos[index],...action.payload}
            }
        })
        .addCase(EditTodo.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string
        })
        .addCase(RemoveTodo.pending,(state)=>{
            state.error=null;
        })
        .addCase(RemoveTodo.fulfilled,(state,action)=>{
            state.loading=false;
            state.todos=state.todos.filter((todo)=>todo.id !== action.meta.arg);
        })
        .addCase(RemoveTodo.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload as string;
        })
    }
});
export const { toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;