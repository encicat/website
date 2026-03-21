import Link from 'next/link';

import { Section } from '@/src/components/Section';
import { Button } from '@/src/components/Button';
import Layout from './(website)/layout';

export default function NotFound() {
  return (
    <Layout>
      <Section>
        <div className="text-4xl font-bold">404: Página no encontrada</div>
        <div className="mt-8">
          Puedes volver a la página de inicio desde{' '}
          <Link href="/" className="link">
            aquí
          </Link>
          .
        </div>
        <div className="mt-8">
          <Button href="/">Inicio</Button>
        </div>
      </Section>
    </Layout>
  );
}
