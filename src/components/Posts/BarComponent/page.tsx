"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { usePosts } from "@/src/hooks/usePosts";
import { useUsers } from "@/src/hooks/useUsers";
import { useComments } from "@/src/hooks/useComments";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PostCard from "../PostCard/page";
function page() {
  const { posts } = usePosts();
  const { users } = useUsers();
  const { comments } = useComments();

  const [author, setAuthor] = useState("All Authors");
  const [sort, setSort] = useState("Newest");

  const postsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(0);
  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };
  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };
  const getVisiblePagesIndex = () => {
    const pages = 5;
    let start = Math.max(0, currentPage - 1);
    let end = Math.min(totalPages, start + pages);
    if (end - start < pages) {
      start = Math.max(0, end - pages);
    }
    const tpages = [];
    for (let i = start; i < end; i++) {
      tpages.push(i);
    }
    return tpages;
  };
  const distinctAuthors = [
    ...new Set(
      posts.map((post) => {
        const user = users.find((user) => user.id === post.userId);
        return user;
      }),
    ),
  ];

  const filteredPosts = posts.filter((post) => {
    const user = users.find((user) => user.id === post.userId);

    const authorMatch = author === "All Authors" || user?.name === author;

    return authorMatch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sort === "Newest") {
      return b.id - a.id;
    }

    if (sort === "Name A-Z") {
      return a.title.localeCompare(b.title);
    }

    if (sort === "Name Z-A") {
      return b.title.localeCompare(a.title);
    }

    return 0;
  });
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);

  const postsToShow = sortedPosts.slice(
    currentPage * postsPerPage,
    postsPerPage * (currentPage + 1),
  );
  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100 p-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-48">
            <Search
              size={14}
              className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />

            <input
              placeholder="Search posts"
              className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
            />
          </div>

          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="cursor-pointer px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          >
            <option value="All Authors">All Authors</option>

            {distinctAuthors.map((author) => (
              <option key={author?.id} value={author?.name}>
                {author?.name}
              </option>
            ))}
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="cursor-pointer px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          >
            <option value="Newest">Newest</option>
            <option value="Name A-Z">Name A-Z</option>
            <option value="Name Z-A">Name Z-A</option>
          </select>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {postsToShow.map((post) => {
          const author =
            users.find((user) => user.id === post.userId)?.name || "Unknown";
          const authorUserName =
            users.find((user) => user.id === post.userId)?.username || "Unkown";
          const noOfComments = comments.filter(
            (comment) => comment.postId === post.id,
          ).length;
          return (
            <PostCard
              key={post.id}
              userId={post.userId}
              id={post.id}
              body={post.body}
              title={post.title}
              authorName={author}
              authorUserName={authorUserName}
              noOfComments={noOfComments}
            />
          );
        })}
      </div>
      <div className="bg-white rounded-xl border border-slate-100">
        <div className="flex items-center justify-center gap-1 py-4">
          <button
            onClick={handlePrevious}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={14} />
            Prev
          </button>
          {getVisiblePagesIndex().map((index) => (
            <button
              key={index}
              className={`cursor-pointer  w-8 h-8 text-sm font-medium rounded-lg transition-colors ${index === currentPage ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            className="flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </>
  );
}

export default page;
