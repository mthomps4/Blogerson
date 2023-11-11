import { Post } from '@prisma/client';
import { z } from 'zod';
import { AppServerResponse } from './server';

export const createPostSchema = z.object({
  title: z
    .string({
      required_error: 'title is required',
      invalid_type_error: 'title must be a string',
    })
    .min(1, { message: 'Title must be at least 1 character long' }),
  content: z.string().optional(),
});

export type CreatePostSchema = z.infer<typeof createPostSchema>;

export type CreatePostResponse = AppServerResponse<Post>;
