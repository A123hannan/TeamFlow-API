"use client";
import React from "react";
import { Search, ChevronDown } from "lucide-react";
interface props {
  title?: string;
}
function page({ title }: props) {
  const admin = "Team Admin";
  const handleSubmit = () => {};
  return (
    <div className="h-[80px] shrink-0 w-full flex items-center justify-center px-[16px] lg:px-[24px] bg-white border-b-[2px] border-border gap-[16px]">
      <h1 className="text-lg font-semibold text-slate-900 ">{title}</h1>
      <div className=" sm:ml-[36px]">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input
              placeholder="Search TeamFlow..."
              className="min-w-[200px] w-[500px] pl-10 pr-3 py-1.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-400 transition-all duration-300"
            />
          </div>
        </form>
      </div>
      <div className="cursor-pointer sm:ml-[36px] flex items-center gap-[8px]">
        <div className="flex items-center justify-center rounded-full h-[32px] w-[32px] text-xs font-semibold text-white bg-indigo-600">
          {admin
            .trim()
            .split(" ")
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join("")}
        </div>
        <span className="text-xs font-medium text-slate-700 hidden sm:block">
          Admin
        </span>
        <ChevronDown className=" text-slate-400" />
      </div>
    </div>
  );
}

export default page;
