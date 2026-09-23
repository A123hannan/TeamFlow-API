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
  const cols = 5;
  const COLS_WIDTH_MAP: Record<number, string> = {
    2: "w-full sm:w-[calc(50%-16px)] max-w-[488px] sm:max-w-none",
    3: "w-full min-[810px]:w-[calc(50%-16px)] 2xl:w-[calc(33.333%-14px)] max-w-[488px] sm:max-w-none",
    4: "w-full sm:w-[calc(50%-16px)] min-[1115px]:w-[calc(33.333%-22px)] 2xl:w-[calc(25%-15px)] max-w-[488px] sm:max-w-none",
    5: "w-full sm:w-[calc(50%-16px)] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)] 2xl:w-[calc(20%-16px)] max-w-[488px] sm:max-w-none",
  };
  const widthClass = COLS_WIDTH_MAP[cols] ?? COLS_WIDTH_MAP[3];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {details.map((detail, index) => (
        <div
          key={`${detail.title}-${index}`}
          className={`${widthClass} flex justify-center`}
        >
          <Card
            Icon={detail.icon}
            number={detail.Number}
            title={detail.title}
            subTitle={detail.subTitle}
          />
        </div>
      ))}
    </div>
  );
}

export default component2;
