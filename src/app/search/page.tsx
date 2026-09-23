"use client";

import { Suspense, useMemo } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUsers } from "@/src/hooks/useUsers";
import { usePosts } from "@/src/hooks/usePosts";
import { useAlbum } from "@/src/hooks/useAlbum";
import { useTodos } from "@/src/hooks/useTodos";

const typeLabelMap = {
  members: "MEMBERS",
  posts: "POSTS",
  tasks: "TASKS",
  albums: "ALBUMS",
};

function SearchPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").trim();
  const { users } = useUsers();
  const { posts } = usePosts();
  const { albums } = useAlbum();
  const { todos } = useTodos();

  const results = useMemo(() => {
    if (!query) return [];

    const q = query.toLowerCase();

    const members = users
      .filter((user) =>
        [
          user.name,
          user.username,
          user.email,
          user.company.name,
          user.address.city,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
      .map((user) => ({
        type: "members",
        title: user.name,
        subtitle: `@${user.username} • ${user.company.name}`,
        detail: user.email,
      }));

    const postsResults = posts
      .filter((post) =>
        [post.title, post.body].join(" ").toLowerCase().includes(q),
      )
      .slice(0, 5)
      .map((post) => ({
        type: "posts",
        title: post.title,
        subtitle: `Post #${post.id}`,
        detail: post.body,
      }));

    const tasksResults = todos
      .filter((todo) => todo.title.toLowerCase().includes(q))
      .slice(0, 5)
      .map((todo) => ({
        type: "tasks",
        title: todo.title,
        subtitle: `Task #${todo.id}`,
        detail: todo.completed ? "Completed" : "Pending",
      }));

    const albumsResults = albums
      .filter((album) => album.title.toLowerCase().includes(q))
      .slice(0, 5)
      .map((album) => ({
        type: "albums",
        title: album.title,
        subtitle: `Album #${album.id}`,
        detail: `User ${album.userId}`,
      }));

    return [...members, ...postsResults, ...tasksResults, ...albumsResults];
  }, [albums, posts, query, todos, users]);

  const handleSearchChange = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) {
      router.push("/search");
      return;
    }
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <div className="h-[80px] border-b border-slate-200 bg-white px-4 sm:px-6 flex items-center gap-3">
        <div className="flex-1 max-w-[760px] mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              value={query}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search TeamFlow..."
              className="w-full rounded-xl border-2 border-indigo-500 bg-slate-50 py-3 pl-12 pr-4 text-base text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-2 text-3xl font-semibold text-slate-900">Search</h1>
          <p className="mb-8 text-base text-slate-500">
            Search across members, posts, tasks, and albums.
          </p>

          <div className="relative max-w-[760px] mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              value={query}
              onChange={(event) => handleSearchChange(event.target.value)}
              placeholder="Search TeamFlow..."
              className="w-full rounded-xl border-2 border-indigo-500 bg-slate-50 py-4 pl-12 pr-4 text-lg text-slate-700 outline-none placeholder:text-slate-400"
            />
          </div>

          {!query ? null : (
            <div className="mt-8 max-w-[760px] mx-auto">
              <p className="mb-4 text-sm text-slate-500">
                {results.length} result{results.length === 1 ? "" : "s"} for
                &quot;{query}&quot;
              </p>

              {results.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-500">
                  No matching results found.
                </div>
              ) : (
                results.map((item, index) => (
                  <div
                    key={`${item.type}-${item.title}-${index}`}
                    className="mb-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                  >
                    <div className="mb-2 text-[11px] font-semibold tracking-[0.12em] text-slate-500">
                      {typeLabelMap[item.type as keyof typeof typeLabelMap]}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100 text-sm font-bold text-cyan-700">
                        {item.title.slice(0, 2).toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-lg font-semibold text-slate-800">
                          {item.title}
                        </div>
                        <div className="text-sm text-slate-500">
                          {item.subtitle}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-slate-600">
                      {item.detail}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-500">
          Loading search...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
}
