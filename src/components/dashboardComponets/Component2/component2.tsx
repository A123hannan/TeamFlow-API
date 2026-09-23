"use client";
import React from "react";
import {
  Users,
  FileText,
  MessageSquare,
  ListCheck,
  FolderOpen,
  Image as ImageIcon,
} from "lucide-react";
import { useUsers } from "@/src/hooks/useUsers";
import { usePosts } from "@/src/hooks/usePosts";
import { useComments } from "@/src/hooks/useComments";
import { useTodos } from "@/src/hooks/useTodos";
import { useAlbum } from "@/src/hooks/useAlbum";
import { usePhotos } from "@/src/hooks/usePhotos";
import Card from "./card";

function component2() {
  const { users } = useUsers();
  const { posts } = usePosts();
  const { comments } = useComments();
  const { todos } = useTodos();
  const { albums } = useAlbum();
  const { photos } = usePhotos();
  const details = [
    {
      icon: Users,
      Number: users.length,
      title: "Total Members",
      subTitle: "Active",
    },
    {
      icon: FileText,
      Number: posts.length,
      title: "Total Posts",
      subTitle: "Across all members",
    },
    {
      icon: MessageSquare,
      Number: comments.length,
      title: "Total Comments",
      subTitle: "Comminity engagement",
    },
    {
      icon: ListCheck,
      Number: todos.length,
      title: "Total Tasks",
      subTitle: "Tracked to-dos",
    },
    {
      icon: FolderOpen,
      Number: albums.length,
      title: "Total Albums",
      subTitle: "Photo Collection",
    },
    {
      icon: ImageIcon,
      Number: photos.length,
      title: "Total Photos",
      subTitle: "Stored in albums",
    },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {details.map((detail) => (
        <Card
          key={detail.title}
          Icon={detail.icon}
          number={detail.Number}
          title={detail.title}
          subTitle={detail.subTitle}
        />
      ))}
    </div>
  );
}

export default component2;
