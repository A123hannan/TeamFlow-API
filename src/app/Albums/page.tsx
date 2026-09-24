"use client";

import React from "react";
import Header from "@/src/components/header/page";
import Component1 from "@/src/components/dashboardComponets/Component1/component1";
import BarComponent from "@/src/components/Albums/BarComponent/page";
import { useAlbum } from "@/src/hooks/useAlbum";
import ResourceState from "@/src/components/common/ResourceState";
import { AlbumCardSkeleton } from "@/src/components/LoadingSkeleton/page";

function AlbumsPage() {
  const { albums, loading, error } = useAlbum();

  return (
    <div className="flex flex-col pb-[100px]">
      <Header title="Albums" />
      <div className="w-full max-w-7xl space-y-6 mx-auto px-4 sm:px-6">
        <Component1
          heading="Albums"
          subheading="Browse photos collection created by team members"
          buttonText="Create Album"
          button={true}
        />

        {loading && albums.length === 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <AlbumCardSkeleton key={index} />
            ))}
          </div>
        ) : error && albums.length === 0 ? (
          <ResourceState message={`Unable to load albums: ${error}`} error />
        ) : (
          <BarComponent />
        )}
      </div>
    </div>
  );
}

export default AlbumsPage;
