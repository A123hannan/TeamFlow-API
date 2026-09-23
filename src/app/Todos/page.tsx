"use client";

import React from "react";
import Header from "@/src/components/header/page";
import Component1 from "@/src/components/dashboardComponets/Component1/component1";
import C1 from "@/src/components/Todos/Component1/page";
import BarComponent from "@/src/components/Todos/BarComponent/page";
import { useTodos } from "@/src/hooks/useTodos";
import ResourceState from "@/src/components/common/ResourceState";

function page() {
  const { todos, loading, error } = useTodos();

  return (
    <div className="flex flex-col pb-[100px]">
      <Header title="Tasks" />
      <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6">
        <Component1
          heading="Tasks"
          subheading="Track Tasks and progress across your team."
          buttonText="Create Task"
          button={true}
        />

        {loading ? (
          <ResourceState message="Loading tasks. Please wait..." />
        ) : error ? (
          <ResourceState message={`Unable to load tasks: ${error}`} error />
        ) : todos.length === 0 ? (
          <ResourceState message="No tasks are available yet." />
        ) : (
          <>
            <C1 />
            <BarComponent />
          </>
        )}
      </div>
    </div>
  );
}

export default page;
