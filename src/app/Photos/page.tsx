"use client";

import Image from "next/image";
import { usePhotos } from "@/src/hooks/usePhotos";
import ResourceState from "@/src/components/common/ResourceState";
import { PhotoCardSkeleton } from "@/src/components/LoadingSkeleton/page";

export default function PhotosPage() {
  const { photos, loading, error } = usePhotos();
  return (
    <main className="min-h-screen bg-slate-50 p-4 sm:p-6">
      <div className="mx-auto max-w-7xl space-y-5">
        <h1 className="text-xl font-semibold text-slate-900">Photos</h1>
        {loading && photos.length === 0 ? (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {Array.from({ length: 10 }, (_, index) => (
              <PhotoCardSkeleton key={index} />
            ))}
          </div>
        ) : error && photos.length === 0 ? (
          <ResourceState message={`Unable to load photos: ${error}`} error />
        ) : photos.length === 0 ? (
          <ResourceState message="No photos found." />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {photos.map((photo) => (
              <article
                key={photo.id}
                className="overflow-hidden rounded-xl border border-slate-100 bg-white"
              >
                <Image
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  width={150}
                  height={150}
                  className="aspect-square w-full object-cover"
                />
                <p className="p-3 text-xs text-slate-600">{photo.title}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
