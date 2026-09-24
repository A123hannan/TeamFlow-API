import {todos,CreateTodoPayload,UpdateTodoPayload} from "../types/todos";
const API_URL="https://jsonplaceholder.typicode.com";
export const getTodos=async():Promise<todos[]>=>{
    const todos=await fetch(`${API_URL}/todos`);
    if(!todos.ok){
        throw new Error("Failed to fetch todos");
    }
    return todos.json();
}
export const createTodo=async(todo:CreateTodoPayload)=>{
    const response=await fetch(`${API_URL}/todos`,{
        method:"POST",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify(todo)
    })
    if(!response.ok){
        throw new Error("Failed to create todo");
    }
    return response.json() ;
}
export const updateTodo=async(todo:UpdateTodoPayload)=>{
    const response=await fetch(`${API_URL}/todos/${todo.id}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(todo)
    })
    if(!response.ok){
        throw new Error("Failed to update Task")
    }
    return response.json();
}
export const deleteTodo=async(id:number)=>{
    const response=await fetch(`${API_URL}/todos/${id}`,{
        method:"DELETE"
    })
    if(!response.ok){
        throw new Error ("Failed to delete Task")
    }
    return response.json();
}