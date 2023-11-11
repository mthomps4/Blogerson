'use server';

import { prisma } from '@/services/prisma';
import { CreatePostResponse, CreatePostSchema } from '@/types/posts';

export const fetchPosts = async () => {
  return prisma.post.findMany({});
};

export const createPost = async (
  input: CreatePostSchema,
): Promise<CreatePostResponse> => {
  try {
    const newPost = await prisma.post.create({
      data: input,
    });

    return { data: newPost, errors: undefined };
  } catch (errors) {
    console.error(errors);
    return { errors, data: undefined };
  }
};
