"use client";

import React from "react";
import Header from "@/src/components/header/page";
import Component1 from "@/src/components/dashboardComponets/Component1/component1";
import BarComponent from "@/src/components/Users/BarComponent/page";
import { useUsers } from "@/src/hooks/useUsers";
import ResourceState from "@/src/components/common/ResourceState";

function page() {
  const { users, loading, error } = useUsers();

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

        {loading ? (
          <ResourceState message="Loading members. Please wait..." />
        ) : error ? (
          <ResourceState message={`Unable to load members: ${error}`} error />
        ) : (
          <BarComponent />
        )}
      </div>
    </div>
  );
}

export default page;
