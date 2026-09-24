"use client";

import React from "react";
import Header from "@/src/components/header/page";
import Component1 from "@/src/components/dashboardComponets/Component1/component1";
import C1 from "@/src/components/Todos/Component1/page";
import BarComponent from "@/src/components/Todos/BarComponent/page";
import { useTodos } from "@/src/hooks/useTodos";
import ResourceState from "@/src/components/common/ResourceState";
import { TaskSkeleton } from "@/src/components/LoadingSkeleton/page";

function TodosPage() {
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

        {loading && todos.length === 0 ? (
          <div className="overflow-hidden rounded-xl border border-slate-100 bg-white">
            {Array.from({ length: 8 }, (_, index) => (
              <TaskSkeleton key={index} />
            ))}
          </div>
        ) : error && todos.length === 0 ? (
          <ResourceState message={`Unable to load tasks: ${error}`} error />
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

export default TodosPage;
