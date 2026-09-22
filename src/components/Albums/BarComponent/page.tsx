"use client";
import React from "react";
import { useState } from "react";
import { useAlbum } from "@/src/hooks/useAlbum";
import { useUsers } from "@/src/hooks/useUsers";
import { usePhotos } from "@/src/hooks/usePhotos";
import { SearchIcon, ChevronLeft, ChevronRight } from "lucide-react";
import AlbumCard from "../AlbumsCard/page";
function page() {
  const { albums } = useAlbum();
  const { users } = useUsers();
  const { photos } = usePhotos();

  const [member, setMember] = useState("All members");

  const filteredalbums = albums.filter((album) => {
    const user = users.find((user) => user.id === album.userId);
    const memberMatch =
      member === "All members" || user?.id.toString() === member;

    return memberMatch;
  });

  const cardsPerPage = 12;
  const totalPages = Math.ceil(filteredalbums.length / cardsPerPage);
  const [currentPage, setCurrentPage] = useState(0);
  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };
  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };
  const getVisiblePagesIndex = () => {
    let pages = 4;
    let start = Math.max(0, currentPage - 1);
    let end = Math.min(totalPages, start + pages);
    if (end - start < pages) {
      start = Math.min(0, end - pages);
    }
    const tpages = [];
    for (let i = start; i < end; i++) {
      tpages.push(i);
    }
    return tpages;
  };
  const albumsToShow = filteredalbums.slice(
    currentPage * cardsPerPage,
    (currentPage + 1) * cardsPerPage,
  );
  console.log(filteredalbums);
  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100 p-4">
        <div className="flex flex-wrap gap-3">
          {/* input bar */}
          <div className="relative flex-1 min-w-48">
            <SearchIcon
              size={13}
              className="lucide lucide-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full pl-8 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></input>
          </div>

          {/* Distinct Members */}
          <select
            onChange={(e) => setMember(e.target.value)}
            value={member}
            className="cursor-pointer px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
          >
            <option value="All members">All members</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {albumsToShow.map((album, index) => {
          const albumAuthor =
            users.find((user) => user.id === album.userId)?.name || "unknown";
          const noOfPhotosInAlbums = photos.filter(
            (photo) => photo.albumId === album.id,
          ).length;
          return (
            <AlbumCard
              key={album.id}
              id={album.id}
              albumTitle={album.title}
              noOfPhotosInAlbum={noOfPhotosInAlbums}
              albumAuthor={albumAuthor}
              index={index}
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
