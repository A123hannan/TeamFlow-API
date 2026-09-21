"use client";

import { useUsers } from "@/src/hooks/useUsers";
import { User } from "@/src/types/users";

export const getUser = ({ id }: { id: number }): User | undefined => {
  const { users } = useUsers();

  return users.find((user) => user.id === id);
};