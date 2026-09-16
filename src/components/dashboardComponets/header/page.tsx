import React from "react";

function page() {
  return (
    <div className="flex flex-col gap-[4px] p-[40px]">
      <p className="font-[700] text-[26px] leading-[100%] tracking-[0%] text-primary">
        Dashboard
      </p>
      <p className="font-[400] text-[14px] leading-[100%] tracking-[0%] text-user">
        Overview of your JSONPlaceolder data
      </p>
    </div>
  );
}

export default page;
