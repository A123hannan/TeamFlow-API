"use client";
import React, { useState } from "react";

import { useUsers } from "@/src/hooks/useUsers";
import { usePosts } from "@/src/hooks/usePosts";
import { useTodos } from "@/src/hooks/useTodos";
import { useAlbum } from "@/src/hooks/useAlbum";
import { usePhotos } from "@/src/hooks/usePhotos";

import { useParams } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Mail, Building2, MapPin, Phone, Globe } from "lucide-react";
import { Circle, CircleCheckBig, FolderOpen } from "lucide-react";
import Link from "next/link";
function page() {
  const params = useParams();

  const { users } = useUsers();
  const { posts } = usePosts();
  const { todos } = useTodos();
  const { albums } = useAlbum();
  const { photos } = usePhotos();

  const user = users.find((user) => user.id === Number(params?.id));
  const userPosts = posts.filter((post) => post.userId === user?.id);
  const userTodos = todos.filter((todo) => todo.userId === user?.id);
  const userAlbums = albums.filter((album) => album.userId === user?.id);

  const [active, setActive] = useState("Posts");
  const [todoCategorey, setTodoCategorey] = useState("All");
  const [todoStatus, setTodoStatus] = useState<Record<number, boolean>>({});
  const handleTodoCategorey = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTodoCategorey(e.currentTarget.value);
  };
  const handleTodoToggle = (todoId: number, completed: boolean) => {
    setTodoStatus((currentStatus) => ({
      ...currentStatus,
      [todoId]: !completed,
    }));
  };

  const todosToShow = userTodos.filter((todo) => {
    const completed = todoStatus[todo.id] ?? todo.completed;

    if (todoCategorey === "Completed") {
      return completed === true;
    }

    if (todoCategorey === "Pending") {
      return completed === false;
    }

    return true;
  });
  return (
    <main className="flex-1 overflow-y-auto p-4 lg:p-6">
      <div className="max-w-5xl mx-auto space-y-5">
        <Link
          href="/Users"
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft size={14} /> Back to Members
        </Link>

        {/* First Portion */}
        <div className="bg-white rounded-xl border border-slate-100 p-6">
          <div className="flex flex-col sm:flex-row items-start gap-5">
            <div className="w-16 h-16 text-xl rounded-full flex items-center justify-center font-semibold text-white shrink-0 bg-cyan-600">
              {user?.name
                .trim()
                .split(" ")
                .slice(0, 2)
                .map((word) => word[0].toUpperCase())
                .join("")}
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-semibold text-slate-900">
                {user?.name}
              </h2>
              <p className="text-sm text-slate-500">@Bret</p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Mail size={13} className="text-slate-400" />
                  {user?.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 size={13} className="text-slate-400" />
                  {user?.company.name}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={13} className="text-slate-400" />
                  {user?.address.city}
                </span>
              </div>
            </div>
            {/* <button className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shrink-0">
              Edit Member
            </button> */}
          </div>
        </div>

        {/* Second Portion */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Contact
            </h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-slate-700">
                <Mail size={13} className="text-slate-400 shrink-0" />
                <span className="truncate">{user?.email}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <Phone size={13} className="text-slate-400 shrink-0" />
                <span>{user?.phone}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-700">
                <Globe size={13} className="text-slate-400 shrink-0" />
                <Link
                  href={`https://user?.website`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:underline flex items-center gap-1"
                >
                  {user?.website}
                  <ExternalLink size={13} />
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Address
            </h3>
            <div className="space-y-1 text-sm text-slate-700">
              <p>{user?.address.street}</p>
              <p>
                {user?.address.city},{user?.address.zipcode}
              </p>
              <p>Gwenborough, 92998-3874</p>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
              Company
            </h3>
            <div className="space-y-1 text-sm text-slate-700">
              <p className="font-medium">{user?.company.name}</p>
              {/* <p className="text-slate-500 text-xs italic">"Multi-layered client-server neural-net"</p> */}
              {/* <p className="text-slate-400 text-xs capitalize">harness real-time e-markets</p> */}
            </div>
          </div>
        </div>
        {/* Third Portion */}
        <div className="bg-white rounded-xl border border-slate-100">
          <div className="flex border-b border-slate-100 px-5">
            <button
              onClick={() => setActive("Posts")}
              className={`cursor-pointer py-3.5 px-4 text-sm font-medium capitalize transition-colors  -mb-px ${active === "Posts" ? "border-b-2 border-indigo-600 text-indigo-700" : "text-slate-500 hover:text-slate-700"}`}
            >
              Posts ({userPosts.length})
            </button>
            <button
              onClick={() => setActive("Todos")}
              className={`cursor-pointer py-3.5 px-4 text-sm font-medium capitalize transition-colors  -mb-px ${active === "Todos" ? "border-b-2 border-indigo-600 text-indigo-700" : "text-slate-500 hover:text-slate-700"}`}
            >
              Tasks ({userTodos.length})
            </button>
            <button
              onClick={() => setActive("Albums")}
              className={`cursor-pointer py-3.5 px-4 text-sm font-medium capitalize transition-colors  -mb-px ${active === "Albums" ? "border-b-2 border-indigo-600 text-indigo-700" : "text-slate-500 hover:text-slate-700"}`}
            >
              Albums ({userAlbums.length})
            </button>
          </div>
          <div className="p-5">
            {active === "Posts" ? (
              userPosts.map((post) => (
                <div className="space-y-3" key={post.id}>
                  <div className="border border-slate-100 rounded-lg p-4 hover:border-slate-200 transition-colors">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 capitalize truncate">
                          {post.title}
                        </p>
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                          {post.body}
                        </p>
                      </div>
                      <Link
                        className="text-xs font-medium text-indigo-600 hover:text-indigo-700 shrink-0 flex items-center gap-1"
                        href="/Posts"
                        data-discover="true"
                      >
                        View <ExternalLink size={10} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : active === "Todos" ? (
              <>
                <div className="flex gap-2 mb-4">
                  <button
                    value="All"
                    onClick={handleTodoCategorey}
                    className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${todoCategorey === "All" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"} `}
                  >
                    all
                  </button>
                  <button
                    value="Completed"
                    onClick={handleTodoCategorey}
                    className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${todoCategorey === "Completed" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"} `}
                  >
                    completed
                  </button>
                  <button
                    value="Pending"
                    onClick={handleTodoCategorey}
                    className={`cursor-pointer px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${todoCategorey === "Pending" ? "bg-indigo-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"} `}
                  >
                    pending
                  </button>
                </div>
                {todosToShow.map((todo) => {
                  const completed = todoStatus[todo.id] ?? todo.completed;

                  return (
                    <div className="space-y-1.5" key={todo.id}>
                      <button
                        type="button"
                        onClick={() => handleTodoToggle(todo.id, completed)}
                        className="w-full flex items-start gap-3 py-2.5 px-3 rounded-lg hover:bg-slate-50 transition-colors text-left cursor-pointer"
                      >
                        {completed ? (
                          <CircleCheckBig
                            size={15}
                            className="lucide lucide-circle-check-big lucide-check-circle text-green-500 mt-0.5 shrink-0"
                          />
                        ) : (
                          <Circle
                            size={15}
                            className="lucide lucide-circle text-slate-300 mt-0.5 shrink-0"
                          />
                        )}
                        <span
                          className={`text-sm  ${completed ? "line-through text-slate-400" : "text-slate-700"}`}
                        >
                          {todo.title}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </>
            ) : active === "Albums" ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {userAlbums.map((Album) => (
                  <Link
                    key={Album.id}
                    href={`/Albums/${Album.id}`}
                    className="border border-slate-100 rounded-lg p-4 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center transition-colors">
                        <FolderOpen
                          size={16}
                          className="text-slate-400 group-hover:text-indigo-500"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-slate-900 capitalize truncate">
                          {Album.title}
                        </p>
                        <p className="text-xs text-slate-400">
                          {
                            photos.filter((photo) => photo.albumId === Album.id)
                              .length
                          }{" "}
                          photos
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default page;
