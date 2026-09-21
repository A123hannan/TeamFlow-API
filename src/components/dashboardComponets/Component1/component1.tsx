"use client";
import React, { useState } from "react";
import { RefreshCcw, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import AddUserCard from "@/src/components/Users/AddUserCard/card";
import AddPostCard from "@/src/components/Posts/AddPostCard/Card";
import AddTodoCard from "@/src/components/Todos/AddTodoCard/Card";
import AddAlbumCard from "@/src/components/Albums/AlbumAddCard/Card";
interface props {
  heading: string;
  subheading: string;
  button?: boolean;
  buttonText?: string;
}
function component1({ heading, subheading, button, buttonText }: props) {
  const router = useRouter();
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [addPostOpen, setAddPostOpen] = useState(false);
  const [addTodoOpen, setAddTodoOpen] = useState(false);
  const [addAlbumOpen, setAddAlbumOpen] = useState(false);
  const PathName = usePathname();

  const handleRefresh = () => {
    router.refresh();
  };
  const handleClick = () => {
    if (!button) {
      handleRefresh();
    } else {
      if (PathName === "/Users") {
        setAddUserOpen(true);
      }
      if (PathName === "/Posts") {
        setAddPostOpen(true);
      }
      if (PathName === "/Todos") {
        setAddTodoOpen(true);
      }
      if (PathName === "/Albums") {
        setAddAlbumOpen(true);
      }
    }
  };

  return (
    <>
      <div className="mb-[24px] mt-[36px] flex flex-row  items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{heading}</h2>
          <p className="text-sm text-slate-500  mt-[2px]">{subheading}</p>
        </div>
        <button
          onClick={handleClick}
          className={`flex items-center gap-[8px] px-3 py-2 text-sm font-medium   border border-slate-200 rounded-lg  transition-colors cursor-pointer ${button ? "bg-primary text-white" : "bg-white hover:bg-slate-50 text-slate-600"}`}
        >
          {button ? (
            <>
              <Plus />
              {buttonText}
            </>
          ) : (
            <>
              <RefreshCcw />
              {"Refresh"}
            </>
          )}
        </button>
      </div>
      {addUserOpen ? (
        <AddUserCard setAddUserOpen={setAddUserOpen} />
      ) : addPostOpen ? (
        <AddPostCard setAddPostOpen={setAddPostOpen} />
      ) : addTodoOpen ? (
        <AddTodoCard setAddTodoOpen={setAddTodoOpen} />
      ) : addAlbumOpen ? (
        <AddAlbumCard setAddAlbumOpen={setAddAlbumOpen} />
      ) : (
        ""
      )}
    </>
  );
}

export default component1;
