import { Bug, Cat, CheckCheck, Cpu, Syringe } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import { Age } from '@/src/components/Age';
import { Button } from '@/src/components/Button';
import { Chip } from '@/src/components/Chip';
import { DocumentRenderer } from '@/src/components/DocumentRenderer';
import { Gender } from '@/src/components/Gender';
import { Hero } from '@/src/components/Hero';
import { Share } from '@/src/components/Share';
import { reader } from '@/src/helpers/reader';

export async function generateStaticParams() {
  const adoptions = await reader.collections.adoptions.all();
  return adoptions.map((adoption) => ({
    slug: adoption.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const adoption = await reader.collections.adoptions.read(slug);
  if (!adoption) {
    return {};
  }
  return {
    title: `${adoption.name} busca hogar`,
    description: `Adopta a ${adoption.name} en EnciCat.`,
    openGraph: adoption.image ? { images: [adoption.image] } : undefined,
  };
}

export default async function AdoptionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const adoption = await reader.collections.adoptions.read(slug);

  if (!adoption) {
    notFound();
  }

  return (
    <article>
      <Hero bgImgSrc="/images/bg.png">
        <h2 className="text-4xl uppercase">{adoption?.name}</h2>
      </Hero>

      <div className="max-w-5xl mx-auto py-20 px-4 lg:px-0">
        <div className="grid grid-col-1 md:grid-cols-2 gap-8 mb-12">
          {adoption.image && adoption.image !== '' && (
            <div className="relative h-100 border-gray-100 border">
              <Image
                src={adoption.image}
                fill
                className="object-contain"
                alt={`Foto principal de ${adoption?.name}`}
              />
            </div>
          )}
          <div>
            <div className="mb-8 flex gap-4 flex-wrap">
              <Gender gender={adoption.gender as 'male' | 'female'} />
              <Age birthdate={String(adoption.birthdate)} />
              {adoption.friendly === 'yes' && (
                <Chip icon={<Cat />}>Amistoso</Chip>
              )}
            </div>
            <div className="mb-8 flex gap-4 flex-wrap">
              {adoption.dewormed === 'yes' && (
                <Chip icon={<Bug />}>Desparasitado</Chip>
              )}
              {adoption.vaccinated === 'yes' && (
                <Chip icon={<Syringe />}>Vacunado</Chip>
              )}
              {adoption.micro === 'yes' && (
                <Chip icon={<Cpu />}>Con microchip</Chip>
              )}
              {(adoption.tested === 'yes' || adoption.tested === 'no') && (
                <Chip
                  style={adoption.tested === 'yes' ? 'info' : 'error'}
                  icon={<CheckCheck />}
                >
                  Testado FELV/FIV{' '}
                  {adoption.tested === 'yes' ? 'negativo' : 'positivo'}
                </Chip>
              )}
            </div>
          </div>
        </div>

        <div className="">
          <DocumentRenderer document={await adoption.content()} />
        </div>

        {adoption.adoptedAt && adoption.adoption_text && (
          <div className="mt-16 px-4 lg:px-0">
            <div className="text-2xl mb-8 uppercase">Su historia</div>
            <p>{adoption.adoption_text}</p>
          </div>
        )}

        {!adoption.adoptedAt && (
          <div className="mt-16 flex flex-wrap justify-center gap-4 px-4 lg:px-0">
            <Button href="/ayudanos/adopcion">Adóptame</Button>
            <Button href="/ayudanos/apadrinamiento">Apadríname</Button>
          </div>
        )}
        {!adoption.adoptedAt && (
          <div className="mt-16">
            <Share shareText="Ayúdanos a conseguir la adopción responsable" />
          </div>
        )}
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
