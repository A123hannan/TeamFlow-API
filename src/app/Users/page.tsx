"use client";

import React from "react";
import Header from "@/src/components/header/page";
import Component1 from "@/src/components/dashboardComponets/Component1/component1";
import BarComponent from "@/src/components/Users/BarComponent/page";
import { useUsers } from "@/src/hooks/useUsers";

function page() {
  const { loading, error } = useUsers();

  return (
    <div className="flex flex-col pb-[100px]">
      <Header title="Members" />
      <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <Component1
          heading="Members"
          subheading="Manage and explore your team members."
          buttonText="Add Member"
          button={true}
        />

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            Loading members...
          </div>
        ) : (
          <BarComponent />
        )}
      </div>
    </div>
  );
}

export default page;
