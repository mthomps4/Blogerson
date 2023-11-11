import type { Metadata } from 'next';

import { Post } from '@prisma/client';
import { fetchPosts } from '@/server/posts';

import { PostCard } from './Post';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Posts Page',
  description: 'Our cool Posts page...',
};

type PageProps = {};

export default async function PostsPage(_props: PageProps) {
  const posts: Post[] = await fetchPosts();

  return (
    <div>
      <h1 className="w-full text-center text-slate-800 text-6xl mb-10">
        Posts
      </h1>
      <div className="flex justify-end items-center my-4">
        <Link href="/posts/new" className="underline text-blue-500">
          + Create Post
        </Link>
      </div>
      <div className="w-full flex justify-center">
        <div className="grid grid-cols-3 gap-20 max-w-6xl">
          {posts.map((post) => (
            <div className="col-span-1">
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
