import React from "react";
import Header from "@/src/components/header/page";
import Component1 from "@/src/components/dashboardComponets/Component1/component1";
import C1 from "@/src/components/Todos/Component1/page";
import BarComponent from "@/src/components/Albums/BarComponent/page";
function page() {
  return (
    <div className="flex flex-col pb-[100px]">
      <Header title="Members" />
      <div className="space-y-6 w-full max-w-7xl mx-auto  px-4 sm:px-6  ">
        <Component1
          heading="Albums"
          subheading="Browse photos collection created by team members"
          buttonText="Create Album"
          button={true}
        />
        <BarComponent />
      </div>
    </div>
  );
}

export default page;
