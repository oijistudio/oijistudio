'use client';

import React, { useMemo, useState } from 'react';
import { Search, Star, ExternalLink } from 'lucide-react';
import ResolvedNextImage from '@/components/ResolvedNextImage';
import { useStudio } from '@/context/StudioContext';
import {
  projects,
  type Project,
  type ProjectStatus,
  PROJECT_FILTER_CATEGORIES,
  getFeaturedProject,
  PROJECT_THUMBNAIL_FALLBACK,
} from '@/lib/projects';

const THUMBNAIL_SIZES = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw';

function ProjectThumbnail({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);
  const imgSrc = hasError ? PROJECT_THUMBNAIL_FALLBACK : src;

  return (
    <ResolvedNextImage
      src={imgSrc}
      alt={alt}
      fill
      sizes={THUMBNAIL_SIZES}
      className={className}
      onError={() => setHasError(true)}
    />
  );
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const styles = {
    Release: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    Beta: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    Development: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    Archived: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[status]}`}
    >
      {status}
    </span>
  );
}

function matchesCategory(project: Project, activeCategory: string): boolean {
  if (activeCategory === 'All') return true;
  if (activeCategory === 'Featured') return project.featured;
  if (activeCategory === 'Coming Soon') {
    return project.comingSoon || project.category === 'Coming Soon';
  }
  return project.category === activeCategory;
}

function matchesSearch(project: Project, query: string): boolean {
  if (query.trim() === '') return true;

  const normalizedQuery = query.toLowerCase();
  return (
    project.title.toLowerCase().includes(normalizedQuery) ||
    project.category.toLowerCase().includes(normalizedQuery) ||
    project.description.toLowerCase().includes(normalizedQuery) ||
    project.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery)) ||
    String(project.year).includes(normalizedQuery)
  );
}

export default function ProjectsCatalog() {
  const { isSplashActive } = useStudio();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const topFeaturedProject = useMemo(() => getFeaturedProject(projects), []);

  const showFeaturedHero =
    Boolean(topFeaturedProject) && activeCategory === 'All' && searchQuery === '';

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      if (!matchesCategory(project, activeCategory)) return false;
      if (!matchesSearch(project, searchQuery)) return false;
      if (showFeaturedHero && project.id === topFeaturedProject?.id) return false;
      return true;
    });
  }, [searchQuery, activeCategory, showFeaturedHero, topFeaturedProject?.id]);

  if (isSplashActive) return null;

  return (
    <main className="relative min-h-screen bg-[#07080f] text-zinc-200 font-sans pt-24 md:pt-28 selection:bg-violet-500/30 selection:text-white">
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-violet-900/10 blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-900/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <header className="mb-16 md:mb-20 space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-400 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
            OijiStudio Ecosystem
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
            OIJI PROJECTS
          </h1>
          <h2 className="text-xl md:text-2xl text-violet-400 font-semibold tracking-wide">
            Build. Create. Experiment.
          </h2>
          <p className="text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl">
            Portal utama yang menyatukan seluruh karya digital, eksperimen interaktif, perangkat AI,
            hingga game yang dikembangkan di dalam ekosistem OijiStudio.
          </p>
        </header>

        {showFeaturedHero && topFeaturedProject && (
          <section className="mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            {topFeaturedProject.comingSoon ? (
              <div className="group relative block w-full rounded-3xl overflow-hidden bg-zinc-900/50 border border-white/10">
                <FeaturedHeroContent project={topFeaturedProject} />
              </div>
            ) : (
              <a
                href={topFeaturedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block w-full rounded-3xl overflow-hidden bg-zinc-900/50 border border-white/10 hover:border-violet-500/30 transition-all duration-500"
                aria-label={`Lihat project unggulan: ${topFeaturedProject.title}`}
              >
                <FeaturedHeroContent project={topFeaturedProject} />
              </a>
            )}
          </section>
        )}

        <section className="sticky top-16 md:top-20 z-30 pt-4 pb-6 bg-[#07080f]/80 backdrop-blur-xl border-b border-white/5 mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex flex-col xl:flex-row gap-4 items-start xl:items-center justify-between">
            <div className="relative w-full xl:w-96 group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500 group-focus-within:text-violet-400 transition-colors">
                <Search className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari project, kategori, atau tag..."
                className="w-full bg-zinc-900/50 border border-white/10 text-white placeholder-zinc-500 rounded-xl pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all shadow-inner"
                aria-label="Cari project"
              />
            </div>

            <nav
              className="flex items-center gap-2 w-full overflow-x-auto pb-2 xl:pb-0 no-scrollbar"
              aria-label="Filter Kategori Project"
            >
              {PROJECT_FILTER_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === category
                      ? 'bg-white text-black shadow-[0_0_15px_-3px_rgba(255,255,255,0.3)]'
                      : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-zinc-200 border border-transparent hover:border-white/10'
                  }`}
                  aria-pressed={activeCategory === category}
                >
                  {category}
                </button>
              ))}
            </nav>
          </div>
        </section>

        {filteredProjects.length > 0 ? (
          <section
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
            aria-label="Daftar Project"
          >
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </section>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 px-4 text-center animate-in fade-in duration-500">
            <div className="w-24 h-24 mb-6 rounded-full bg-zinc-900/50 border border-white/5 flex items-center justify-center text-zinc-600 shadow-inner">
              <Search className="w-10 h-10 opacity-40" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
              Karya Tidak Ditemukan
            </h3>
            <p className="text-zinc-500 max-w-md mx-auto mb-8">
              Kami tidak dapat menemukan project yang sesuai dengan kata kunci atau filter saat ini.
              Silakan coba kombinasi lain.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-zinc-300 rounded-lg border border-white/10 transition-all font-medium text-sm"
            >
              Reset Filter Pencarian
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

function FeaturedHeroContent({ project }: { project: Project }) {
  return (
    <>
      <div className="absolute inset-0 bg-gradient-to-t from-[#07080f] via-[#07080f]/60 to-transparent z-10 md:bg-gradient-to-r md:from-[#07080f] md:via-[#07080f]/80" />

      <div className="relative z-0 h-[400px] md:h-[500px] w-full">
        <ProjectThumbnail
          key={project.thumbnail}
          src={project.thumbnail}
          alt={project.title}
          className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105"
        />
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 md:p-12 md:w-2/3 lg:w-1/2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-500/20 text-violet-300 border border-violet-500/30 text-sm font-semibold mb-4 backdrop-blur-md w-fit">
          <Star className="w-4 h-4 fill-current" />
          Featured by OijiStudio
        </div>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-3 tracking-tight">
          {project.title}
        </h3>
        <p className="text-zinc-300 text-sm md:text-base line-clamp-2 md:line-clamp-3 mb-6 max-w-xl">
          {project.description}
        </p>

        <div className="flex flex-wrap items-center gap-3 mb-6">
          <StatusBadge status={project.status} />
          <span className="text-sm text-zinc-500">•</span>
          <span className="text-sm text-zinc-400 font-medium">{project.category}</span>
          <span className="text-sm text-zinc-500">•</span>
          <span className="text-sm text-zinc-400 font-medium">{project.year}</span>
        </div>

        {project.comingSoon ? (
          <span className="inline-flex items-center justify-center gap-2 bg-white/10 text-zinc-300 px-6 py-3 rounded-xl font-semibold w-full md:w-auto cursor-not-allowed">
            Segera Hadir
          </span>
        ) : (
          <span className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-xl font-semibold group-hover:bg-zinc-200 transition-colors duration-300 w-full md:w-auto">
            <span>Eksplorasi Project</span>
            <ExternalLink className="w-4 h-4" />
          </span>
        )}
      </div>
    </>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const thumbnailBlock = (
    <div className="relative block aspect-[16/9] w-full overflow-hidden">
      <ProjectThumbnail
        key={project.thumbnail}
        src={project.thumbnail}
        alt={`Thumbnail ${project.title}`}
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105 group-hover:opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
      <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
        <StatusBadge status={project.status} />
        {project.featured && (
          <div
            className="bg-violet-500/80 backdrop-blur-sm text-white p-1.5 rounded-md shadow-lg"
            title="Featured Project"
          >
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <article className="group flex flex-col bg-zinc-900/40 border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 hover:border-white/15 hover:shadow-[0_8px_30px_rgb(255,255,255,0.04)] hover:bg-zinc-900/60">
      {project.comingSoon ? (
        <div tabIndex={-1}>{thumbnailBlock}</div>
      ) : (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block"
          tabIndex={-1}
        >
          {thumbnailBlock}
        </a>
      )}

      <div className="flex flex-col flex-grow p-5 md:p-6">
        <div className="mb-1 text-xs font-semibold tracking-wider text-violet-400 uppercase">
          {project.category}
        </div>

        {project.comingSoon ? (
          <h3 className="text-xl font-bold text-zinc-100 mb-2 line-clamp-1">{project.title}</h3>
        ) : (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-sm"
          >
            <h3 className="text-xl font-bold text-zinc-100 mb-2 group-hover:text-white transition-colors line-clamp-1">
              {project.title}
            </h3>
          </a>
        )}

        <p className="text-sm text-zinc-400 line-clamp-3 mb-4 flex-grow">{project.description}</p>

        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[11px] text-zinc-400"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="px-2 py-1 bg-white/5 border border-white/5 rounded-md text-[11px] text-zinc-500">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        <div className="pt-4 border-t border-white/5 mt-auto">
          {project.comingSoon ? (
            <span className="flex items-center justify-between w-full text-sm font-medium text-zinc-500 cursor-not-allowed">
              <span>Segera Hadir</span>
            </span>
          ) : (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full text-sm font-medium text-zinc-300 group-hover:text-violet-400 transition-colors duration-300"
              aria-label={`Buka project ${project.title}`}
            >
              <span>Buka Project</span>
              <ExternalLink className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
