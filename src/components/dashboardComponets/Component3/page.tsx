import React from "react";
import C1 from "./C1RecentPosts/page";
import C2 from "./C2/page";

function page() {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <C1 />
      <C2 />
    </div>
  );
}

export default page;
