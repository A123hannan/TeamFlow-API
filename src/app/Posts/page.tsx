"use client";

import React from "react";
import Header from "@/src/components/header/page";
import Component1 from "@/src/components/dashboardComponets/Component1/component1";
import BarComponent from "@/src/components/Posts/BarComponent/page";
import { usePosts } from "@/src/hooks/usePosts";
import ResourceState from "@/src/components/common/ResourceState";
import { PostCardSkeleton } from "@/src/components/LoadingSkeleton/page";

function PostsPage() {
  const { posts, loading, error } = usePosts();

  return (
    <div className="flex flex-col pb-[100px]">
      <Header title="Posts" />
      <div className="w-full max-w-7xl space-y-6 mx-auto px-4 sm:px-6">
        <Component1
          heading="Posts"
          subheading="Explore posts shared by team members."
          buttonText="Create Post"
          button={true}
        />

        {loading && posts.length === 0 ? (
          <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        ) : error && posts.length === 0 ? (
          <ResourceState message={`Unable to load posts: ${error}`} error />
        ) : (
          <BarComponent />
        )}
      </div>
    </div>
  );
}

export default PostsPage;
