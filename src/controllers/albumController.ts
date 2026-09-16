import {Albums,CreateAlbumPayload} from "@/src/types/albums"
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