"use client";
import React from "react";
import { useState } from "react";
import { useTodos } from "@/src/hooks/useTodos";
import { useUsers } from "@/src/hooks/useUsers";
import { SearchIcon, ChevronLeft, ChevronRight } from "lucide-react";
import TodoCard from "../BarComponent/todoCard/todoCard";
function page() {
  const { todos } = useTodos();
  const { users } = useUsers();

  const [member, setMember] = useState("All members");
  const [sort, setSort] = useState("Default");
  const [active, setActive] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const handleAll = () => {
    setActive("All");
    setCurrentPage(0);
  };
  const handleCompleted = () => {
    setActive("Completed");
    setCurrentPage(0);
  };
  const handlePending = () => {
    setActive("Pending");
    setCurrentPage(0);
  };

  const filteredTodos = todos.filter((todo) => {
    const user = users.find((user) => user.id === todo.userId);
    const memberMatch =
      member === "All members" || user?.id.toString() === member;
    const statusMatch =
      active === "All" ||
      (active === "Completed" && todo.completed) ||
      (active === "Pending" && !todo.completed);
    const searchMatch = todo.title
      .toLowerCase()
      .includes(search.toLowerCase().trim());

    return memberMatch && statusMatch && searchMatch;
  });
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sort === "Default") {
      return b.id - a.id;
    }

    if (sort === "Title A-Z") {
      return a.title.localeCompare(b.title);
    }

    if (sort === "By Member") {
      const userA = users.find((user) => user.id === a.userId);
      const userB = users.find((user) => user.id === b.userId);

      return (userA?.name || "").localeCompare(userB?.name || "");
    }

    return 0;
  });
  const cardsPerPage = 15;
  const totalPages = Math.ceil(sortedTodos.length / cardsPerPage);
  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };
  const getVisiblePagesIndex = () => {
    const pages = 4;
    let start = Math.max(0, currentPage - 1);
    const end = Math.min(totalPages, start + pages);
    if (end - start < pages) {
      start = Math.max(0, end - pages);
    }
    const tpages = [];
    for (let i = start; i < end; i++) {
      tpages.push(i);
    }
    return tpages;
  };
  const todosToShow = sortedTodos.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage,
  );
  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100 p-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex rounded-lg border border-slate-200 overflow-hidden shrink-0">
            <button
              className={`cursor-pointer px-3 py-2 text-xs font-medium capitalize transition-colors ${active === "All" ? " bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}
              onClick={handleAll}
            >
              All
            </button>
            <button
              className={`cursor-pointer px-3 py-2 text-xs font-medium capitalize transition-colors ${active === "Completed" ? " bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}
              onClick={handleCompleted}
            >
              Completed
            </button>
            <button
              className={` cursor-pointer px-3 py-2 text-xs font-medium capitalize transition-colors ${active === "Pending" ? " bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-50"}`}
              onClick={handlePending}
            >
              Pending
            </button>
          </div>

          {/* input bar */}
          <div className="relative flex-1 min-w-40">
            <SearchIcon
              size={13}
              className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(0);
              }}
              className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Distinct Members */}
          <select
            onChange={(e) => {
              setMember(e.target.value);
              setCurrentPage(0);
            }}
            value={member}
            className="w-full cursor-pointer px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 sm:w-auto"
          >
            <option value="All members">All members</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>

          {/* Sorting */}
          <select
            onChange={(e) => {
              setSort(e.target.value);
              setCurrentPage(0);
            }}
            className="w-full cursor-pointer px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 sm:w-auto"
            value={sort}
          >
            <option value="Default">Default</option>
            <option value="Title A-Z">Title A-Z</option>
            <option value="By Member">By member</option>
          </select>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="divide-y divide-slate-50">
          {todosToShow.map((todo) => (
            <TodoCard
              key={todo.id}
              id={todo.id}
              userId={todo.userId}
              title={todo.title}
              completed={todo.completed}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-slate-50 px-5 flex items-center justify-between">
        <p className="text-xs text-slate-400 py-3">
          {sortedTodos.length} tasks
        </p>
        <div
          className={`${totalPages <= 1 ? "hidden" : ""} flex items-center justify-center gap-1 py-4`}
        >
          <button
            className="cursor-pointer  flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            onClick={handlePrevious}
            disabled={currentPage === 0}
          >
            <ChevronLeft size={14} />
            Prev
          </button>
          {/* {Array.from({ length: noOfPages }).map((_, index) => ( */}
          {sortedTodos.length > 0 &&
            getVisiblePagesIndex().map((index) => (
              <button
                className={`cursor-pointer  w-8 h-8 text-sm font-medium rounded-lg transition-colors ${index === currentPage ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                onClick={() => setCurrentPage(index)}
                key={index}
              >
                {index + 1}
              </button>
            ))}
          <button
            className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            onClick={handleNext}
            disabled={currentPage >= totalPages - 1}
          >
            Next
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </>
  );
}

export default page;
