"use client";
import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface props {
  title?: string;
}

function Header({ title }: props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";
  const [search, setSearch] = useState(currentQuery);

  const admin = "Team Admin";

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = search.trim();

    if (!value) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(value)}`);
  };

  return (
    <div className="min-h-[64px] shrink-0 w-full flex items-center justify-center px-4 pl-16 sm:px-5 sm:pl-20 lg:h-[80px] lg:px-6 lg:pl-6 bg-white border-b-[2px] border-border gap-3 sm:gap-4">
      <h1 className="shrink-0 text-base sm:text-lg font-semibold text-slate-900">
        {title}
      </h1>
      <div className="min-w-0 flex-1 max-w-[500px] lg:flex-none lg:w-[500px]">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search TeamFlow..."
              className="w-full min-w-0 pl-10 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-slate-400 transition-all duration-300"
            />
          </div>
        </form>
      </div>
      <div className="shrink-0 cursor-pointer flex items-center gap-2">
        <div className="flex items-center justify-center rounded-full h-[32px] w-[32px] text-xs font-semibold text-white bg-indigo-600">
          {admin
            .trim()
            .split(" ")
            .slice(0, 2)
            .map((word) => word[0].toUpperCase())
            .join("")}
        </div>
        <span className="text-xs font-medium text-slate-700 hidden md:block">
          Admin
        </span>
        <ChevronDown size={16} className="text-slate-400 hidden sm:block" />
      </div>
    </div>
  );
}

export default Header;
