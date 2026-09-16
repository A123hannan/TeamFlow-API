"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPhoto, fetchPhotos } from "@/src/redux-toolkit/slices/photoSlice";
import { AppDispatch, RootState } from "@/src/redux-toolkit/store/store";
import { CreatePhotoPayload } from "@/src/types/photos";

export const usePhotos = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { photos, loading, error } = useSelector((state: RootState) => state.photos);
  useEffect(() => { dispatch(fetchPhotos()); }, [dispatch]);
  const addPhotos = (photo: CreatePhotoPayload) => dispatch(addPhoto(photo));
  return { photos, loading, error, addPhotos };
};