/**
 * Definisi tipe union untuk status project.
 * Memastikan hanya nilai-nilai spesifik ini yang bisa digunakan.
 */
export type ProjectStatus =
  | 'Release'
  | 'Beta'
  | 'Development'
  | 'Archived';

/**
 * Definisi tipe union untuk kategori project.
 * Memastikan konsistensi kategori di seluruh platform.
 */
export type ProjectCategory =
  | 'Interactive Story'
  | 'Games'
  | 'AI Projects'
  | 'Tools'
  | 'Websites'
  | 'Experiments'
  | 'Coming Soon';

/**
 * Interface utama untuk entitas Project.
 * Menjadi single source of truth untuk struktur data project di aplikasi.
 */
export interface Project {
  /** ID unik project (biasanya digunakan sebagai slug URL) */
  id: string;
  /** Nama project */
  title: string;
  /** Kategori utama project */
  category: ProjectCategory;
  /** Deskripsi singkat mengenai project */
  description: string;
  /** URL absolut ke gambar thumbnail project */
  thumbnail: string;
  /** URL absolut ke aplikasi/website project */
  url: string;
  /** Status fase rilis project saat ini */
  status: ProjectStatus;
  /** Menentukan apakah project ini di-highlight di halaman utama/hero */
  featured: boolean;
  /** Kumpulan kata kunci untuk keperluan filter atau pencarian */
  tags: string[];
  /** Tahun pembuatan atau rilis project */
  year: number;
  /** Flag boolean jika project masih berstatus segera hadir */
  comingSoon: boolean;
}

export const PROJECT_FILTER_CATEGORIES = [
  'All',
  'Featured',
  'Interactive Story',
  'Games',
  'AI Projects',
  'Tools',
  'Websites',
  'Experiments',
  'Coming Soon',
] as const;

export type ProjectFilterCategory = (typeof PROJECT_FILTER_CATEGORIES)[number];

export function getFeaturedProject(projectList: Project[]): Project | undefined {
  return projectList.find((p) => p.featured);
}

export const PROJECT_THUMBNAIL_FALLBACK = '/assets/logo/logo.png';

/**
 * Koleksi data seluruh project OijiStudio.
 * Data ini diekspor untuk dirender di halaman `/project` atau halaman lainnya.
 *
 * Cara menambahkan project baru:
 * Copy object project yang ada, paste di dalam array ini, lalu ubah nilainya.
 */
export const projects: Project[] = [
  {
    id: 'novel',
    title: 'Selamanya itu lama banget ya?',
    category: 'Interactive Story',
    description: 'Novel Interaktif Ariel & Alie',
    thumbnail: 'https://cdn.jsdelivr.net/gh/oijistudio/OijiStudio-assets/project/preview.webp',
    url: 'https://novel-ariel-alie.vercel.app/',
    status: 'Release',
    featured: false,
    tags: ['Story', 'Interactive'],
    year: 2026,
    comingSoon: false,
  },
  {
    id: 'portofolio-ardy',
    title: 'Portofolio Ardyieelpng',
    category: 'Websites',
    description: 'Website portofolio pribadi Ardyieelpng',
    thumbnail: 'https://cdn.jsdelivr.net/gh/oijistudio/OijiStudio-assets/project/ardyieel.webp',
    url: 'https://ardyieelpng.vercel.app/',
    status: 'Release',
    featured: false,
    tags: ['PDF', 'Reader', 'Tool'],
    year: 2026,
    comingSoon: false,
  },
  {
    id: 'portofolio-rejii1',
    title: 'Portofolio Rejii1_',
    category: 'Websites',
    description: 'Website portofolio pribadi Rejii1_',
    thumbnail: 'https://cdn.jsdelivr.net/gh/oijistudio/OijiStudio-assets/project/rejii1.webp',
    url: 'https://rejii1.vercel.app/',
    status: 'Release',
    featured: false,
    tags: ['PDF', 'Reader', 'Tool'],
    year: 2026,
    comingSoon: false,
  },
 {
    id: 'portofolio-wonyoung',
    title: 'Portofolio Wonyoung',
    category: 'Websites',
    description: 'Website portofolio pribadi Wonyoung',
    thumbnail: 'https://cdn.jsdelivr.net/gh/oijistudio/OijiStudio-assets/project/wonyoung.webp',
    url: 'https://wonyoung-portofolio.vercel.app/',
    status: 'Release',
    featured: true,
    tags: ['PDF', 'Reader', 'Tool'],
    year: 2026,
    comingSoon: false,
  },
];
