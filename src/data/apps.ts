export type AppStatus = 'live' | 'beta' | 'building' | 'idea'

export interface OrbitApp {
  id: string
  name: string
  short: string // 2–3 letter monogram
  url: string
  description: string
  category: string
  status: AppStatus
  color: string // accent hex
  logo?: string // path or data URL
  pinned?: boolean
  builtIn?: boolean
  tags?: string[]
}

export const STATUS_META: Record<AppStatus, { label: string; color: string }> = {
  live: { label: 'Live', color: '#6CC04A' },
  beta: { label: 'Beta', color: '#38BDF8' },
  building: { label: 'In development', color: '#F58220' },
  idea: { label: 'Idea', color: '#A78BFA' },
}

export const CATEGORIES = [
  'Programs',
  'Education',
  'Media',
  'Facilities',
  'Engagement',
  'Organization',
  'Insights',
  'Other',
]

export const BRAND_COLORS = ['#1E5BD8', '#6CC04A', '#F58220', '#FCD34D', '#38BDF8', '#A78BFA', '#F43F5E', '#14B8A6']

export const SEED_APPS: OrbitApp[] = [
  {
    id: 'eys-camp',
    name: 'Extraordinary Youth Summer Camp',
    short: 'EY',
    url: 'https://eyscorbitcampmanagement.vercel.app/',
    description: 'Camp management for the Extraordinary Youth summer program — registrations, campers, schedules and daily tracking.',
    category: 'Programs',
    status: 'live',
    color: '#F58220',
    pinned: true,
    builtIn: true,
    tags: ['youth', 'camp', 'tracking'],
  },
  {
    id: 'ignite-academy',
    name: 'Ignite Academy',
    short: 'IA',
    url: 'https://igniteacademy-orcin.vercel.app/',
    description: 'Learning platform for Ignite Academy — courses, learners and progress in one place.',
    category: 'Education',
    status: 'live',
    color: '#22C55E',
    logo: '/logos/ignite.png',
    pinned: true,
    builtIn: true,
    tags: ['learning', 'courses'],
  },
  {
    id: 'cm2-presence',
    name: 'CM2 Digital Presence',
    short: 'DP',
    url: 'https://cm-2-digital-presence.vercel.app/',
    description: 'The digital presence hub for Community Matters 2 — brand, social and outreach in one view.',
    category: 'Media',
    status: 'live',
    color: '#1E5BD8',
    builtIn: true,
    tags: ['brand', 'social'],
  },
  {
    id: 'community-center',
    name: 'CM2 Community Center',
    short: 'CC',
    url: '',
    description: '2D and 3D block model of the CM2 Community Center — explore the space before it is built.',
    category: 'Facilities',
    status: 'building',
    color: '#FCD34D',
    builtIn: true,
    tags: ['2d', '3d', 'facility'],
  },
  {
    id: 'cm2-survey',
    name: 'Community Input Survey',
    short: 'CS',
    url: 'https://cm2-survey.vercel.app/',
    description: 'Collect community voice — a survey that feeds what the Community Center should become.',
    category: 'Engagement',
    status: 'live',
    color: '#6CC04A',
    pinned: true,
    builtIn: true,
    tags: ['survey', 'feedback'],
  },
  {
    id: 'opinion-wall',
    name: 'Opinion Live Wall',
    short: 'LW',
    url: 'https://cm2-survey.vercel.app/display',
    description: 'A live display wall of community opinions about the Community Center, updated as responses arrive.',
    category: 'Engagement',
    status: 'live',
    color: '#38BDF8',
    builtIn: true,
    tags: ['live', 'display'],
  },
  {
    id: 'cm2-website',
    name: 'CM2 Website',
    short: 'CM',
    url: 'https://www.communitymatters2.org/',
    description: 'The official Community Matters 2 website — mission, programs and ways to get involved.',
    category: 'Organization',
    status: 'live',
    color: '#A78BFA',
    logo: '/logos/cm2.png',
    builtIn: true,
    tags: ['website', 'public'],
  },
]
