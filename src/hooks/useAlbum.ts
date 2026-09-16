"use client"
import { useDispatch, useSelector } from "react-redux"
import {useEffect} from "react"
import { AppDispatch,RootState } from "../redux-toolkit/store/store"
import {fetchAlbums,addAlbum} from "@/src/redux-toolkit/slices/albumSlice"
import { CreateAlbumPayload } from "../types/albums"
export const useAlbum=()=>{
    const dispatch =useDispatch<AppDispatch>()
    const{albums,error,loading}=useSelector((state:RootState)=>state.albums);
    useEffect(() => {
        dispatch(fetchAlbums())
    }, [dispatch]);
    const addAlbums=(album:CreateAlbumPayload)=>{
        dispatch(addAlbum(album))
    }
    return {albums,error,loading,addAlbums};
}