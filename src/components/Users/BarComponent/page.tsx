"use client";
import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import { useUsers } from "@/src/hooks/useUsers";
function page() {
  const { users } = useUsers();
  const [company, setCompany] = useState("All Companies");
  const [city, setCity] = useState("All Cities");
  const distinctCompanies = [
    ...new Set(users.map((user) => user.company.name)),
  ];
  const distinctCities = [...new Set(users.map((user) => user.address.city))];
  return (
    <div className="bg-white rounded-xl border border-slate-100 p-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search
            size={14}
            className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
          <input
            placeholder="Search members"
            className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            type="text"
          />
        </div>
        <select
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
        >
          <option value="all">All Companies</option>
          {distinctCompanies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          {distinctCities.map((city) => (
            <option value={city} key={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default page;
