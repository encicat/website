import { notFound } from 'next/navigation';
import { Node } from '@markdoc/markdoc';
import Image from 'next/image';

import { reader } from '@/src/helpers/reader';
import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { Gender } from '@/src/components/Gender';
import { Age } from '@/src/components/Age';
import { Share } from '@/src/components/Share';

export async function generateStaticParams() {
  const adoptions = await reader.collections.adoptions.all();
  return adoptions.map((adoption) => ({
    slug: adoption.slug,
  }));
}

export default async function AdoptionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const adoption = await reader.collections.adoptions.read(slug);
  const adoption_page = await reader.singletons.adoption_page.read();
  const conditions = (await adoption_page?.content()) as { node: Node };

  if (!adoption) {
    notFound();
  }

  return (
    <article>
      <div className="max-w-5xl mx-auto py-20 px-4 lg:px-0">
        <h2 className="text-4xl">{adoption.name}</h2>
      </div>

      {adoption.image && adoption.image !== '' && (
        <div
          className="h-[60vh] w-full"
          style={{
            backgroundImage: `url(${adoption.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
      <div className="max-w-5xl mx-auto py-20 px-4 lg:px-0">
        <div className="mb-8 flex gap-4">
          <Gender gender={adoption.gender as 'male' | 'female'} />
          <Age birthdate={String(adoption.birthdate)} />
        </div>
        <DocumentRenderer document={await adoption.content()} />
        <div className="mt-16">
          <div className="text-2xl mb-8 uppercase">Condiciones de adopción:</div>
          <DocumentRenderer document={conditions} />
        </div>
        <div className="mt-16">
          <Share shareText="Ayudanos a conseguir la adopción responsable" />
        </div>
      </div>
      <div className="grid grid-cols-4">
        {adoption.image && adoption.image !== '' && (
          <div className="relative h-100">
            <Image
              src={String(adoption.image)}
              alt={`Foto principal de la adopción de ${adoption.name}`}
              fill
              className="object-cover"
            />
          </div>
        )}
        {adoption.images.map((image) => (
          <div key={image} className="relative h-100">
            <Image
              src={String(image)}
              alt={String(image)}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </article>
  );
}
