import {CreateUserPayload,User}from "@/src/types/users"
const API_URL="https://jsonplaceholder.typicode.com";

export const getUsers=async():Promise<User[]>=>{
    const reponse=await fetch(`${API_URL}/users`)
    if(!reponse.ok){
        throw new Error("Failed to fetch users");
    }
    const users=await reponse.json();
    return users;
}

export const createUser =async(user:CreateUserPayload)=>{
    const response=await fetch (`${API_URL}/Users`,{
        method:"POST",
        headers:{
            "content-Type":"application/json"
        },
        body:JSON.stringify(user)
    })
    if(!response.ok){
        throw new Error("Failed to create user");
    }
    // const createdUser=await respone.json();
    // return createdUser;
    return response.json()
}