"use client";
import React, { use, useState } from "react";
import Link from "next/link";
import { User } from "@/src/types/users";
import UpdateUserCard from "../UpdateUserCard/page";
import DelteUserCard from "../DeleteUserCard/page";
import {
  Eye,
  Pencil as Edit,
  Trash2 as Delete,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
type props = {
  sortedUsers: User[];
};
const columnNames = [
  "Member",
  "username",
  "Email",
  "Company",
  "City",
  "Actions",
];
function page({ sortedUsers }: props) {
  // sortedUsers=Array.from({length:10}).flatMap(()=>sortedUsers)

  // for Updating the User
  const [updateUserOpen, setUpdateUserOpen] = useState(false);
  const [updateUserId, setUpdateUserId] = useState<number | null>(null);
  const handleUpdate = (id: number) => {
    setUpdateUserOpen(true);
    setUpdateUserId(id);
  };
  // for deleting the User
  const [deleteUserOpen, setDeleteUserOpen] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const handleDelete = (id: number) => {
    setDeleteUserOpen(true);
    setDeleteUserId(id);
  };
  const usersPerPage = 5;
  const noOfPages = sortedUsers.length / usersPerPage;
  const [currentPage, setCurrentPage] = useState(0);
  const usersToShow = sortedUsers.slice(
    currentPage * usersPerPage,
    (currentPage + 1) * usersPerPage,
  );
  const handleNext = (e: any) => {
    setCurrentPage((prev) => (prev < noOfPages - 1 ? prev + 1 : noOfPages - 1));
  };
  const handlePrevious = (e: any) => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const getVisiblePagesindex = () => {
    const pages = 3;
    let start = Math.max(0, currentPage - 1);
    let end = Math.min(noOfPages, start + pages);
    if (end - start < pages) {
      start = Math.max(0, end - pages);
    }
    const totalpages = [];
    for (let i = start; i < end; i++) {
      totalpages.push(i);
    }
    return totalpages;
  };
  return (
    <>
      <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225 text-sm">
            {/* Header Column-Names */}
            <thead>
              <tr className="border-b border-slate-100 text-left bg-slate-50/50">
                {columnNames.map((column) => (
                  <th
                    key={column}
                    className={`px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider ${column === "Actions" ? "text-right" : ""}`}
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Body Column-Data */}
            <tbody className="divide-y divide-slate-50">
              {usersToShow.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  {/* First Column */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className=" bg-cyan-600 w-7 h-7 text-xs rounded-full flex items-center justify-center font-semibold text-white shrink-0 ">
                        {user.name
                          .trim()
                          .split(" ")
                          .slice(0, 2)
                          .map((word) => word[0].toUpperCase())
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          {user.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  {/* Second Column */}
                  <td className="px-5 py-3.5 text-slate-500">
                    {user.username}
                  </td>
                  {/* Third Column */}
                  <td className="px-5 py-3.5 text-slate-500">{user.email}</td>
                  {/* Forth Column */}
                  <td className="px-5 py-3.5 text-slate-500">
                    {user.company.name}
                  </td>
                  {/* Fifth Column */}
                  <td className="px-5 py-3.5 text-slate-500">
                    {user.address.city}
                  </td>
                  {/* Sixth Column */}
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/Users/${user.id}`}
                        className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                      >
                        <Eye size={14} className="" />
                      </Link>
                      <button
                        // href={`/Users/${user.id}/Edit`}
                        onClick={() => handleUpdate(user.id)}
                        className="cursor-pointer p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
                        // href="#"
                        className="cursor-pointer p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                      >
                        <Delete size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-slate-50 px-5 flex items-center justify-between">
          <p className="text-xs text-slate-400 py-3">
            Showing {currentPage * usersPerPage + 1}-
            {(currentPage + 1) * usersPerPage} of {sortedUsers.length} members
          </p>
          <div
            className={`${sortedUsers.length < usersPerPage ? "hidden" : ""}flex items-center justify-center gap-1 py-4`}
          >
            <button
              className={`${currentPage === 0 ? "cursor-no-drop  disabled:opacity-45" : "cursor-pointer"}  flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors`}
              onClick={handlePrevious}
            >
              <ChevronLeft size={14} />
              Prev
            </button>
            {/* {Array.from({ length: noOfPages }).map((_, index) => ( */}
            {getVisiblePagesindex().map((index) => (
              <button
                key={index}
                className={`cursor-pointer  w-8 h-8 text-sm font-medium rounded-lg transition-colors ${index === currentPage ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
                onClick={() => setCurrentPage(index)}
              >
                {index + 1}
              </button>
            ))}
            <button
              className="cursor-pointer flex items-center gap-1 px-3 py-1.5 text-sm font-medium text-slate-600 rounded-lg hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              onClick={handleNext}
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
      {updateUserOpen && updateUserId !== null && (
        <UpdateUserCard
          id={updateUserId}
          setUpdateUserOpen={setUpdateUserOpen}
        />
      )}
      {deleteUserOpen && deleteUserId !== null && (
        <DelteUserCard
          id={deleteUserId}
          setDeleteUserOpen={setDeleteUserOpen}
        />
      )}
    </>
  );
}

export default page;
