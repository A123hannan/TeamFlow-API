import {todos,CreateTodoPayload} from "../types/todos";
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
