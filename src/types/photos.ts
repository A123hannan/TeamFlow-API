export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export interface CreatePhotoPayload {
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}