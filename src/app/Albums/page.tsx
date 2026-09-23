"use client";

import React from "react";
import Header from "@/src/components/header/page";
import Component1 from "@/src/components/dashboardComponets/Component1/component1";
import BarComponent from "@/src/components/Albums/BarComponent/page";
import { useAlbum } from "@/src/hooks/useAlbum";

function page() {
  const { loading, error } = useAlbum();

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

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            Loading albums...
          </div>
        ) : (
          <BarComponent />
        )}
      </div>
    </div>
  );
}

export default page;
