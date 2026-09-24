"use client";
import React, { useState } from "react";
import { RefreshCcw, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/src/redux-toolkit/store/store";
import { fetchUsers } from "@/src/redux-toolkit/slices/userslice";
import { fetchPosts } from "@/src/redux-toolkit/slices/postSlice";
import { fetchTodos } from "@/src/redux-toolkit/slices/todoSlice";
import { fetchAlbums } from "@/src/redux-toolkit/slices/albumSlice";
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
function Component1({ heading, subheading, button, buttonText }: props) {
  const dispatch = useDispatch<AppDispatch>();
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [addPostOpen, setAddPostOpen] = useState(false);
  const [addTodoOpen, setAddTodoOpen] = useState(false);
  const [addAlbumOpen, setAddAlbumOpen] = useState(false);
  const PathName = usePathname();

  const handleRefresh = () => {
    if (PathName === "/Users") dispatch(fetchUsers());
    if (PathName === "/Posts") dispatch(fetchPosts());
    if (PathName === "/Todos") dispatch(fetchTodos());
    if (PathName === "/Albums") dispatch(fetchAlbums());
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
      <div className="mb-6 mt-8 flex flex-col items-start justify-between gap-3 min-[420px]:flex-row min-[420px]:items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{heading}</h2>
          <p className="text-sm text-slate-500  mt-[2px]">{subheading}</p>
        </div>
        <button
          onClick={handleClick}
          className={`flex shrink-0 items-center justify-center gap-2 px-3 py-2 text-sm font-medium border border-slate-200 rounded-lg transition-colors cursor-pointer ${button ? "bg-primary text-white" : "bg-white hover:bg-slate-50 text-slate-600"}`}
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

export default Component1;
