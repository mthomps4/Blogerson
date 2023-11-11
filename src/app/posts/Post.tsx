import { Post } from '@prisma/client';

type ComponentProps = {
  post: Post;
};

export const PostCard = ({ post }: ComponentProps) => {
  const randomImageId = Math.floor(Math.random() * 50);

  return (
    <div key={post.id} className="bg-slate-100 rounded-md p-5 shadow-sm">
      <img
        width="400"
        height="300"
        className="border-2 border-gray-300 rounded-md shadow-xl mb-8"
        src={`https://picsum.photos/id/${randomImageId}/400/300`}
        alt={`blog-image-${post.title}`}
      />

      <h3 className="text-3xl text-slate-800">{post.title}</h3>
      <p className="text-slate-700">{post.content}</p>
    </div>
  );
};
