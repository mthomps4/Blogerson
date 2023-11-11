import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Posts Page',
  description: 'Our cool Posts page...',
};

type LayoutProps = {
  children: React.ReactNode;
};

export default async function PostsLayout({ children }: LayoutProps) {
  return (
    <div className="p-5 h-screen bg-slate-200 flex justify-center">
      <div className="max-w-6xl">{children}</div>
    </div>
  );
}
