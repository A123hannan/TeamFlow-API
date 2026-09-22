"use client"
import { useDispatch, useSelector } from "react-redux"
import {useEffect} from "react"
import { AppDispatch,RootState } from "../redux-toolkit/store/store"
import {fetchAlbums,addAlbum,EditAlbum,RemoveAlbum} from "@/src/redux-toolkit/slices/albumSlice"
import { CreateAlbumPayload,UpdateAlbumPayload } from "../types/albums"
export const useAlbum=()=>{
    const dispatch =useDispatch<AppDispatch>()
    const{albums,error,loading}=useSelector((state:RootState)=>state.albums);
    useEffect(() => {
        dispatch(fetchAlbums())
    }, [dispatch]);
    const addAlbums=(album:CreateAlbumPayload)=>{
        dispatch(addAlbum(album))
    }
    const EditAlbums=(album:UpdateAlbumPayload)=>{
        dispatch(EditAlbum(album))
    }
    const RemoveAlbums=(id:number)=>{
        return dispatch(RemoveAlbum(id)).unwrap()
    }
    return {albums,error,loading,addAlbums,EditAlbums,RemoveAlbums};
}