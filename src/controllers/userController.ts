import {CreateUserPayload,User,UpdateUserPayload}from "@/src/types/users"
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

export const updateUser=async(User:UpdateUserPayload)=>{
    const response=await fetch(`${API_URL}/Users/${User.id}`,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(User)
    })
    if(!response.ok){
        throw new Error("Failed to Update User")
    }
    return response.json();
}
export const DeletedUser=async(id:number)=>{
    const response=await fetch(`${API_URL}/Users/${id}`,{
        method:"DELETE"
    })
    if(!response.ok){
        throw new Error ("Failed to Delete User")
    }
    return response.json();
}