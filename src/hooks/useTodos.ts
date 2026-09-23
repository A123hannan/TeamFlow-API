"use client";
import {useSelector, useDispatch} from "react-redux";
import {fetchTodos,addTodos,toggleTodo} from "@/src/redux-toolkit/slices/todoSlice";
import { RootState, AppDispatch } from "@/src/redux-toolkit/store/store";
import {todos,CreateTodoPayload} from "@/src/types/todos"
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
     return { todos, loading, error, addTodo, toggleTask };
}
