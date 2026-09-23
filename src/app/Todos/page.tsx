"use client";

import React from "react";
import Header from "@/src/components/header/page";
import Component1 from "@/src/components/dashboardComponets/Component1/component1";
import C1 from "@/src/components/Todos/Component1/page";
import BarComponent from "@/src/components/Todos/BarComponent/page";
import { useTodos } from "@/src/hooks/useTodos";

function page() {
  const { loading, error } = useTodos();

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

        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
            Loading tasks...
          </div>
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
