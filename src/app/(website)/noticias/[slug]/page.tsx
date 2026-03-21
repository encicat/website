import { notFound } from 'next/navigation';

import { reader } from '@/src/helpers/reader';
import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { Share } from '@/src/components/Share';

export async function generateStaticParams() {
  const posts = await reader.collections.posts.all();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <div className="max-w-5xl mx-auto py-20 px-4 lg:px-0">
        <h2 className="text-4xl">{post.title}</h2>
      </div>
      <div
        className="h-[60vh] w-full"
        style={{
          backgroundImage: `url(${post.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="max-w-5xl mx-auto py-20 px-4 lg:px-0">
        <DocumentRenderer document={await post.content()} />
        <div className="mt-16">
          <Share shareText="Ayúdanos a difundir la noticia" />
        </div>
      </div>
    </article>
  );
}
