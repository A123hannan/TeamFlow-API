"use client";
import React, { useState } from "react";
import Link from "next/link";
const navLinks = [
  { title: "Dashboard", path: "/" },
  { title: "Users", path: "/Users" },
  { title: "Posts", path: "/posts" },
  { title: "Todos", path: "/Todos" },
  { title: "Comments", path: "/Comments" },
  { title: "Photos", path: "/Photos" },
  { title: "Photos", path: "/Photos" },
];
function page() {
  const [active, setActive] = useState("Dashboard");
  return (
    <div className="flex flex-col w-1/3 bg-white gap-[32px] pt-[28px] px-[24px]  border-r border-border h-screen">
      <p className="text-[20px] font-[700] leading-[100%] tracking-[0%] text-primary">
        JsonBoard
      </p>
      <div className="flex flex-col gap-[4px]">
        {navLinks.map((link) => (
          <Link
            href={link.path}
            key={link.title}
            className={`px-[14px] py-[10px] font-semibold text-[14px] leading-[100%] tracking-[0%] rounded-[8px]  ${active === link.title ? "bg-bg-active text-user-active" : "text-bg-active hover:bg-bg-active text-user"}`}
            onClick={() => setActive(link.title)}
          >
            {link.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default page;
