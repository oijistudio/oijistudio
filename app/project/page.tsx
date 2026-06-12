import type { Metadata } from 'next';
import ProjectsCatalog from '@/components/project/ProjectsCatalog';

const description =
  'Explore tools, experiments, games, interactive stories, and digital products built by OijiStudio.';

export const metadata: Metadata = {
  title: 'Oiji Projects',
  description,
  alternates: {
    canonical: '/project',
  },
  openGraph: {
    title: 'Oiji Projects | OIJI Studio',
    description,
    url: '/project',
    type: 'website',
  },
  twitter: {
    title: 'Oiji Projects | OIJI Studio',
    description,
  },
};

export default function ProjectPage() {
  return <ProjectsCatalog />;
}
