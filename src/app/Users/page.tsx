"use client";

import React from "react";
import Header from "@/src/components/header/page";
import Component1 from "@/src/components/dashboardComponets/Component1/component1";
import BarComponent from "@/src/components/Users/BarComponent/page";
import { useUsers } from "@/src/hooks/useUsers";
import ResourceState from "@/src/components/common/ResourceState";
import { UserSkeleton } from "@/src/components/LoadingSkeleton/page";

function UsersPage() {
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

        {loading && users.length === 0 ? (
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
            <table className="w-full">
              {Array.from({ length: 5 }, (_, index) => (
                <UserSkeleton key={index} />
              ))}
            </table>
          </div>
        ) : error && users.length === 0 ? (
          <ResourceState message={`Unable to load members: ${error}`} error />
        ) : (
          <BarComponent />
        )}
      </div>
    </div>
  );
}

export default UsersPage;
