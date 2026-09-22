import {Albums,CreateAlbumPayload,UpdateAlbumPayload} from "@/src/types/albums"
import { error } from "console";
const API_URL="https://jsonplaceholder.typicode.com/";

export const getAlbums=async():Promise<Albums[]>=>{
    const response=await fetch(`${API_URL}/albums`)
    if(!response.ok){
     throw new Error("Failed to fetch the Albums")   
    }
    return response.json()
}

export const createAlbum=async(Album:CreateAlbumPayload)=>{
    const response=await fetch(`${API_URL}/albums`,{
        method:"POST",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(Album)
    })
    return response.json();
}
export const updateAlbum=async(Album:UpdateAlbumPayload)=>{
    const response=await fetch(`${API_URL}/Albums/${Album.id}`,{
        method:"PATCH",
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify(Album)

    })
    return response.json();
}
export const deleteAlbum=async(id:number)=>{
    const response=await fetch(`${API_URL}/Albums/${id}`,{
        method:"DELETE",
    })
    if(!response.ok){
        throw new Error("Failed to delete the Album");
    }
    return response.json();
}