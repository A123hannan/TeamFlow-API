import { CreatePhotoPayload, Photo } from "@/src/types/photos";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getPhotos = async (): Promise<Photo[]> => {
  const response = await fetch(`${API_URL}/photos`);
  if (!response.ok) throw new Error("Failed to fetch photos");
  return response.json();
};

export const createPhoto = async (
  photo: CreatePhotoPayload,
): Promise<Photo> => {
  const response = await fetch(`${API_URL}/photos`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(photo),
  });
  if (!response.ok) throw new Error("Failed to create photo");
  return response.json();
};