"use client";
import {useSelector, useDispatch} from "react-redux";
import {fetchTodos,addTodos,toggleTodo,RemoveTodo,EditTodo} from "@/src/redux-toolkit/slices/todoSlice";
import { RootState, AppDispatch } from "@/src/redux-toolkit/store/store";
import {todos,CreateTodoPayload,UpdateTodoPayload} from "@/src/types/todos"
import {useEffect} from "react";
export const useTodos = () => {

    const dispatch=useDispatch<AppDispatch>();
    const {todos,loading,error}=useSelector((state:RootState)=>state.todos);
    useEffect(()=>{
        if (todos.length === 0 && !loading && !error) {
            dispatch(fetchTodos());
        }
    },[dispatch, error, loading, todos.length]);
    const addTodo=(todo:CreateTodoPayload)=>{
        dispatch(addTodos(todo));
    };
    const toggleTask = (id: number) => {
        dispatch(toggleTodo(id));
    };
    const deleteTodo=(id:number)=>{
        dispatch(RemoveTodo(id));
    }
    const updateTodo=(todo:UpdateTodoPayload)=>{
        dispatch(EditTodo(todo))
    }
     return { todos, loading, error, addTodo,deleteTodo,updateTodo, toggleTask };
}
