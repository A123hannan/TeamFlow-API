"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus, Pencil, Trash2 } from "lucide-react";

import UpdateAlbumCard from "@/src/components/Albums/UpdateAlbumCard/page";
import DeleteAlbumCard from "@/src/components/Albums/DeleteAlbumCard/page";

import { usePhotos } from "@/src/hooks/usePhotos";
import { useAlbum } from "@/src/hooks/useAlbum";
import { useUsers } from "@/src/hooks/useUsers";
function page() {
  const params = useParams();

  const { photos, addPhotos } = usePhotos();
  const { albums } = useAlbum();
  const { users } = useUsers();

  const [addPhotoOpen, setAddPhotoOpen] = useState(false);
  const [editAlbumOpen, setEditAlbumOpen] = useState(false);
  const [deletePhotoOpen, setDeletePhotoOpen] = useState(false);

  const albumPhotos = photos.filter(
    (photo) => photo.albumId === Number(params?.id),
  );
  const album = albums.find((album) => album.id === Number(params?.id));
  const author = users.find((user) => user.id === album?.userId);
  return (
    <>
      <main className="flex-1 overflow-y-auto p-4 pt-16 lg:p-6">
        <div className="w-full max-w-6xl mx-auto space-y-5">
          <Link
            href={"/Albums"}
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Albums
          </Link>
          <div className="bg-white rounded-xl border border-slate-100 p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 capitalize">
                  {album?.title}
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Created by{" "}
                  <Link
                    className="text-indigo-600 hover:underline"
                    href={`/Users/${author?.id}`}
                  >
                    {author?.name}
                  </Link>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {albumPhotos.length} photos
                </p>
              </div>
              <div className="flex gap-2 shrink-0 flex-wrap">
                {/* <button
                onClick={() => setAddPhotoOpen(true)}
                className="cursor-pointer flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
              >
                <Plus size={14} />
                Add Photo
              </button> */}
                <button
                  onClick={() => setEditAlbumOpen(true)}
                  className="cursor-pointer flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-slate-700 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Pencil size={14} />
                  Edit Album
                </button>
                <button
                  onClick={() => setDeletePhotoOpen(true)}
                  className="cursor-pointer flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {albumPhotos.map((albumPhoto) => {
              return (
                <div
                  key={albumPhoto.id}
                  className="group relative aspect-square bg-slate-100 rounded-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-indigo-400 transition-all"
                >
                  <img
                    alt="accusamus beatae ad facilis cum similique qui sunt"
                    className="w-full h-full object-cover group-hover:scale-120 transition-transform duration-300"
                    loading="lazy"
                    src={`https://picsum.photos/seed/${albumPhoto.id}/800/800`}
                  ></img>
                  {/* <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div> */}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      {editAlbumOpen && params?.id !== null && (
        <UpdateAlbumCard
          id={Number(params?.id)}
          setEditAlbumOpen={setEditAlbumOpen}
        />
      )}
      {deletePhotoOpen && params?.id !== null && (
        <DeleteAlbumCard
          setDeleteAlbumOpen={setDeletePhotoOpen}
          id={Number(params?.id)}
        />
      )}
    </>
  );
}

export default page;
