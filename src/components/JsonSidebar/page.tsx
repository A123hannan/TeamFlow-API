"use client";
import React from "react";
import {
  Zap,
  LayoutGrid as Dashboard,
  UsersRound as Users,
  FileText as Posts,
  ListChecks as Todo,
  Image as albums,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const navLinks = [
  { logo: Dashboard, title: "Dashboard", path: "/" },
  { logo: Users, title: "Users", path: "/Users" },
  { logo: Posts, title: "Posts", path: "/Posts" },
  { logo: Todo, title: "Todos", path: "/Todos" },
  { logo: albums, title: "Albums", path: "/Albums" },
];
function page() {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen flex-col w-1/5 lg:w-1/6 bg-white gap-[32px] border-r-[2px] border-border">
      <div className="h-[80px] shrink-0 px-[20px] flex items-center gap-[10px] border-b-[2px] border-border">
        <div className="bg-primary h-[32px] w-[32px] flex items-center justify-center rounded-[5px]">
          <Zap className="text-white" />
        </div>
        <p className="text-[20px] font-[700] leading-[100%] tracking-[0%] text-slate-900 font-semibold">
          Team Flow
        </p>
      </div>
      <div className="px-[24px] flex flex-col gap-[4px] py-4">
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            WORKSPACE
          </p>
        </div>
        {navLinks.map((link) => {
          const Icon = link.logo;
          const isActive =
            link.path === "/"
              ? pathname === "/"
              : pathname.startsWith(link.path);

          return (
            <Link
              href={link.path}
              key={link.title}
              className={`group cursor-pointer flex gap-3  px-[14px] py-[10px]  rounded-[8px]  ${isActive ? "bg-bg-active text-user-active" : "text-bg-active hover:bg-bg-active text-user"}`}
            >
              <div>
                <Icon className="group-hover:text-primary" />
              </div>
              <div
                className={`flex items-center font-medium text-sm leading-[100%] tracking-[0%] text-slate-600 group-hover:text-primary ${isActive ? "bg-bg-active text-user-active" : ""} group-cursor-pointer:`}
              >
                {link.title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default page;
