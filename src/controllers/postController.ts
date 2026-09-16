import {CreatePostPayload,Posts} from "@/src/types/posts"
const API_URL="https://jsonplaceholder.typicode.com"

export const getPosts=async():Promise<Posts[]>=>{
    const posts=await fetch(`${API_URL}/posts`);
    if(!posts.ok){
        throw new Error("Failed to fetch posts");
    }
    return posts.json();
}

export const createPost=async(Post:CreatePostPayload):Promise<Posts>=>{
const response=await fetch(`${API_URL}/posts`,{
    method:"POST",
    headers:{
        "content-type":"application/json"
    },
    body:JSON.stringify(Post)
})
return response.json()
}

