"use client";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useUsers } from "@/src/hooks/useUsers";
import UserCard from "./UserCard/page";
function page() {
  const { users } = useUsers();
  const RecentUsers = users.slice(0, 5);
  return (
    <div className="bg-white rounded-xl border border-slate-100">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-50">
        <h3 className="text-sm font-semibold text-slate-900">Recent Members</h3>
        <Link
          href="/Users"
          className="text-xs font-medium text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
        >
          View all
          <ArrowRight size={12} />
        </Link>
      </div>
      <div className="divide-y divide-slate-50">
        {RecentUsers.map((user) => (
          <Link href={`/Users/${user.id}`} className="" key={user.id}>
            <UserCard id={user.id} fullName={user.name} email={user.email} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default page;
