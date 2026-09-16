"use client"
import {useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsers,fetchUsers } from "@/src/redux-toolkit/slices/userslice";
import { RootState, AppDispatch } from "@/src/redux-toolkit/store/store";
import {CreateUserPayload} from "@/src/types/users"

export const useUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector((state: RootState) => state.users); 
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const addUser = (user: CreateUserPayload) => {
    dispatch(addUsers(user));
  };
  return { users, loading, error, addUser };
}