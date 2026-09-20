import React from "react";
import Header from "@/src/components/header/page";
import Component1 from "@/src/components/dashboardComponets/Component1/component1";
import BarComponent from "@/src/components/Posts/BarComponent/page";
function page() {
  return (
    <div className="flex flex-col pb-[100px]">
      <Header title="Members" />
      <div className="space-y-6 max-w-7xl mx-auto  px-4 sm:px-6  ">
        <Component1
          heading="Posts"
          subheading="Explore posts shared by team members."
          buttonText="Create Post"
          button={true}
        />
        <BarComponent />
      </div>
    </div>
  );
}

export default page;
