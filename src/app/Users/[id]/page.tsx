"use client";
import React from "react";
import { getUser } from "@/src/components/Users/getUser";
import { useUsers } from "@/src/hooks/useUsers";
import { useParams } from "next/navigation";
function page() {
  const params = useParams();
  const { users } = useUsers();
  const user = users.find((user) => user.id === Number(params?.id));
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <h1 className="text-5xl font-bold text-zinc-950 bg-amber-50">
        {user?.name}
      </h1>
    </div>
  );
}

export default page;
