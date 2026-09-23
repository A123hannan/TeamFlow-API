"use client"
import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsers,fetchUsers ,EditUser,RemoveUser} from "@/src/redux-toolkit/slices/userslice";
import { RootState, AppDispatch } from "@/src/redux-toolkit/store/store";
import {CreateUserPayload,UpdateUserPayload} from "@/src/types/users"

export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users); 
  useEffect(() => {
    if (users.length === 0 && !loading && !error) {
      dispatch(fetchUsers()).unwrap();
    }
  }, [dispatch, error, loading, users.length]);

  const addUser = (user: CreateUserPayload) => {
    dispatch(addUsers(user)).unwrap();
  };
   const updateUser =(user: UpdateUserPayload) =>{ 
    dispatch(EditUser(user)).unwrap()
  }

  const deleteUser=(id: number) =>{
    dispatch(RemoveUser(id)).unwrap()

  }

  return { users, loading, error, addUser,updateUser,deleteUser };
}