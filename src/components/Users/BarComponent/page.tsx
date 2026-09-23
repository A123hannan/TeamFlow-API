"use client";
import React from "react";
import { Search } from "lucide-react";
import { useState } from "react";
import { useUsers } from "@/src/hooks/useUsers";
import TableComponent from "../TableComponent/page";

function page() {
  const { users, loading, error } = useUsers();
  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("All Companies");
  const [city, setCity] = useState("All Cities");
  const [sort, setSort] = useState("Sort:ID");
  const distinctCompanies = [
    ...new Set(users.map((user) => user.company.name)),
  ];
  const distinctCities = [...new Set(users.map((user) => user.address.city))];

  const columnNames = [
    "Member",
    "username",
    "Email",
    "Company",
    "City",
    "Actions",
  ];
  const filteredUsers = users.filter((user) => {
    const searchMatch = [
      user.name,
      user.username,
      user.email,
      user.company.name,
      user.address.city,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    const companyMatch =
      company === "All Companies" || user.company.name === company;
    const cityMatch = city === "All Cities" || user.address.city === city;
    return searchMatch && companyMatch && cityMatch;
  });
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sort === "Sort:ID") {
      return a.id - b.id;
    }
    if (sort === "Name A-Z") {
      return a.name.localeCompare(b.name);
    }
    if (sort === "Name Z-A") {
      return b.name.localeCompare(a.name);
    }
    return 0;
  });
  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
        {error}
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100 p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search
              size={14}
              className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              placeholder="Search members"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
            />
          </div>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full cursor-pointer px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 sm:w-auto"
          >
            <option value="All Companies">All Companies</option>
            {distinctCompanies.map((company) => (
              <option key={company} value={company}>
                {company}
              </option>
            ))}
          </select>
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full cursor-pointer px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 sm:w-auto"
          >
            <option value="All Cities">All Cities</option>
            {distinctCities.map((city) => (
              <option value={city} key={city}>
                {city}
              </option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full cursor-pointer px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 sm:w-auto"
          >
            <option value="Sort:ID">Sort:ID</option>
            <option value="Name A-Z">Name A-Z</option>
            <option value="Name Z-A">Name Z-A</option>
          </select>
        </div>
      </div>
      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Loading members...
        </div>
      ) : (
        <TableComponent
          key={`${search}-${company}-${city}-${sort}`}
          sortedUsers={sortedUsers}
        />
      )}
    </>
  );
}

export default page;
