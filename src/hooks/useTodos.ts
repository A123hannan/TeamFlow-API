"use client";
import {useSelector, useDispatch} from "react-redux";
import {fetchTodos,addTodos} from "@/src/redux-toolkit/slices/todoSlice";
import { RootState, AppDispatch } from "@/src/redux-toolkit/store/store";
import {todos,CreateTodoPayload} from "@/src/types/todos"
import {useEffect} from "react";
export const useTodos = () => {

    const dispatch=useDispatch<AppDispatch>();
    const {todos,loading,error}=useSelector((state:RootState)=>state.todos);
    useEffect(()=>{
        dispatch(fetchTodos());
    },[dispatch]);
    const addTodo=(todo:CreateTodoPayload)=>{
        dispatch(addTodos(todo));
    };
     return { todos, loading, error, addTodo };
}
