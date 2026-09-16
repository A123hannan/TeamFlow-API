"use client";

import Image from "next/image";
import { usePhotos } from "@/src/hooks/usePhotos";

export default function PhotosPage() {
  const { photos, loading, error } = usePhotos();
  return (
    <main>
      <h1>Photos</h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {photos.map((photo) => (
        <article key={photo.id}>
          <Image
            src={photo.thumbnailUrl}
            alt={photo.title}
            width={150}
            height={150}
          />
          <p>{photo.title}</p>
        </article>
      ))}
    </main>
  );
}
