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
    <header className="sticky top-0 z-40 h-16 w-full shrink-0 border-b-2 border-border bg-white px-3 pl-16 sm:px-5 sm:pl-20 lg:h-20 lg:px-6 lg:pl-6">
      <div className="max-w-7xl mx-auto flex h-full min-w-0 items-center justify-between gap-3 sm:gap-4">
        <h1 className="min-w-0 max-w-[30%] shrink-0 truncate text-base font-semibold text-slate-900 sm:max-w-none sm:text-lg">
          {title}
        </h1>
        <div className="min-w-0 flex-1 lg:w-[500px] lg:flex-none">
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
        <div className="flex shrink-0 cursor-pointer items-center gap-2">
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
    </header>
  );
}

export default Header;
