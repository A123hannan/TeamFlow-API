"use client";
import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
  const pathname = usePathname();
  return (
    <>
      {/* LAptops and above screens */}
      <div className="hidden lg:flex min-h-screen flex-col w-1/5 lg:w-1/6 bg-white gap-[32px] border-r-[2px] border-border">
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

      {/* Tablet and Mobile Screen */}
      <button
        onClick={toggleMenu}
        className={`fixed top-5 left-5 z-[101] flex cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full bg-transparent p-2.5 backdrop-blur-md transition-transform lg:hidden`}
      >
        <span
          className={`h-[3px] w-[26px] origin-center rounded-full bg-primary transition-all duration-300 ${isOpen ? "translate-y-[8px] rotate-45" : ""}`}
        />
        <span
          className={`h-[3px] w-[26px] rounded-full bg-primary transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"}`}
        />
        <span
          className={`h-[3px] w-[26px] origin-center rounded-full bg-primary transition-all duration-300 ${isOpen ? "-translate-y-[8px] -rotate-45" : ""}`}
        />
      </button>
      {/* Backdrop overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen ? "pointer-events-auto opacity-70" : "pointer-events-none opacity-0"}`}
      />

      {/* Mobile / Tablet Sidebar Drawer */}
      <aside
        className={`fixed top-0 left-0 z-[90] flex h-full w-[280px] flex-col justify-between bg-primary p-8 transition-transform duration-300 ease-in-out sm:w-[320px] lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-6 pt-16">
          {navLinks.map(({ path, title }) => (
            <Link
              key={path}
              href={path}
              onClick={() => setIsOpen(false)}
              className="border-b border-white/10 py-2 text-lg font-medium text-white uppercase transition-colors last:border-b-0 hover:text-[#E9482B]"
            >
              {title}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
}

export default page;
