"use client"
import { useDispatch, useSelector } from "react-redux";
import {fetchPosts,addPost} from "@/src/redux-toolkit/slices/postSlice"
import {useEffect} from "react"
import { AppDispatch, RootState } from "../redux-toolkit/store/store";
import { CreatePostPayload } from "../types/posts";

export const usePosts=()=>{
    const dispatch=useDispatch<AppDispatch>();
    const {posts,loading,error} =useSelector((state:RootState)=>state.posts)
    useEffect(()=>{
        if (posts.length === 0 && !loading && !error) {
            dispatch(fetchPosts())
        }
    },[dispatch, error, loading, posts.length]);
    const addPosts=(post:CreatePostPayload)=>{
        dispatch(addPost(post));
    }
    return {posts,loading ,error,addPosts} ;
}