"use client";

import React from "react";
import Header from "@/src/components/header/page";
import Component1 from "@/src/components/dashboardComponets/Component1/component1";
import BarComponent from "@/src/components/Albums/BarComponent/page";
import { useAlbum } from "@/src/hooks/useAlbum";
import ResourceState from "@/src/components/common/ResourceState";

function page() {
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

        {loading ? (
          <ResourceState message="Loading albums. Please wait..." />
        ) : error ? (
          <ResourceState message={`Unable to load albums: ${error}`} error />
        ) : (
          <BarComponent />
        )}
      </div>
    </div>
  );
}

export default page;
