"use client"
import React,{useState} from 'react'
import EditCard from "@/src/components/Users/UpdateUserCard/page"
async function page({params}:{params:Promise<{id:string}>}) {
    const [updateUserOpen,setUpdateUserOpen]=useState(false)
    const {id}=await params;
  return (
    <div>
      <EditCard setUpdateUserOpen={setUpdateUserOpen} id={Number(id)}/>
    </div>
  )
}

export default page
