/**
 * THE ORBIT 360 APP LIST
 * ----------------------
 * This file is the single source of truth for which apps appear in Orbit 360.
 * Visitors cannot add or change apps. To add, edit or remove an app:
 *   1. Edit the SUITE list below.
 *   2. Commit and push to GitHub. Vercel redeploys automatically.
 */

export type AppStatus = 'live' | 'beta' | 'building'
export type Tone = 'blue' | 'green' | 'orange' | 'gold' | 'plum' | 'teal'
export type Pillar = 'outcomes' | 'records' | 'insights' | 'tracking'

export interface OrbitApp {
  id: string // used in the page address: /apps/<id>
  name: string
  short: string // 2-letter monogram shown when there is no logo
  url: string // leave '' while the app is not live yet
  tagline: string // one line
  description: string
  category: string
  status: AppStatus
  tone: Tone // accent color
  pillars: Pillar[] // which ORBIT areas the app supports
  logo?: string // file in /public/logos
  featured?: boolean
}

export const STATUS_LABEL: Record<AppStatus, string> = {
  live: 'Live',
  beta: 'Beta',
  building: 'In development',
}
export const STATUS_TONE: Record<AppStatus, Tone> = { live: 'green', beta: 'blue', building: 'orange' }

export const SUITE: OrbitApp[] = [
  {
    id: 'summer-camp',
    name: 'Extraordinary Youth Summer Camp',
    short: 'EY',
    url: 'https://eyscorbitcampmanagement.vercel.app/',
    tagline: 'Camp management for the Extraordinary Youth summer program.',
    description:
      'Registrations, campers, schedules and day-to-day tracking for the Extraordinary Youth Summer Camp, in one place for staff and families.',
    category: 'Programs',
    status: 'live',
    tone: 'orange',
    pillars: ['outcomes', 'records', 'tracking'],
    featured: true,
  },
  {
    id: 'ignite-academy',
    name: 'Ignite Academy',
    short: 'IA',
    url: 'https://igniteacademy-orcin.vercel.app/',
    tagline: 'Learning platform for courses, learners and progress.',
    description: 'Ignite Academy brings courses, learners and their progress together, so every student’s growth is visible.',
    category: 'Education',
    status: 'live',
    tone: 'green',
    pillars: ['outcomes', 'tracking'],
    logo: '/logos/ignite.png',
    featured: true,
  },
  {
    id: 'digital-presence',
    name: 'CM2 Digital Presence',
    short: 'DP',
    url: 'https://cm-2-digital-presence.vercel.app/',
    tagline: 'Brand, social and outreach for Community Matters 2.',
    description: 'The digital presence hub for Community Matters 2: how the organization shows up online, across brand, social and outreach.',
    category: 'Media',
    status: 'live',
    tone: 'blue',
    pillars: ['insights'],
  },
  {
    id: 'community-center',
    name: 'CM2 Community Center',
    short: 'CC',
    url: '',
    tagline: '2D and 3D block model of the future Community Center.',
    description: 'An interactive 2D and 3D block model of the CM2 Community Center, so the community can explore the space before it is built.',
    category: 'Facilities',
    status: 'building',
    tone: 'gold',
    pillars: ['records'],
  },
  {
    id: 'community-survey',
    name: 'Community Input Survey',
    short: 'CS',
    url: 'https://cm2-survey.vercel.app/',
    tagline: 'Tell us what the Community Center should become.',
    description: 'A survey that collects the community’s voice and shapes what the Community Center offers.',
    category: 'Engagement',
    status: 'live',
    tone: 'teal',
    pillars: ['insights'],
    featured: true,
  },
  {
    id: 'opinion-wall',
    name: 'Opinion Live Wall',
    short: 'LW',
    url: 'https://cm2-survey.vercel.app/display',
    tagline: 'Community opinions, displayed live.',
    description: 'A live wall that shows community opinions about the Community Center as responses arrive.',
    category: 'Engagement',
    status: 'live',
    tone: 'plum',
    pillars: ['insights'],
  },
  {
    id: 'cm2-website',
    name: 'CM2 Website',
    short: 'CM',
    url: 'https://www.communitymatters2.org/',
    tagline: 'The official home of Community Matters 2.',
    description: 'The official Community Matters 2 website: our mission, programs and ways to get involved.',
    category: 'Organization',
    status: 'live',
    tone: 'blue',
    pillars: ['records'],
    logo: '/logos/cm2.png',
  },
]

export const PILLARS: { key: Pillar; letter: string; title: string; tone: Tone; text: string }[] = [
  { key: 'outcomes', letter: 'O', title: 'Outcomes', tone: 'blue', text: 'What changes for the youth and families we serve, measured over time.' },
  { key: 'records', letter: 'R', title: 'Records', tone: 'green', text: 'One trusted home for people, programs and places.' },
  { key: 'insights', letter: 'BI', title: 'Behavioral Insights', tone: 'orange', text: 'What the community tells us, and how it engages.' },
  { key: 'tracking', letter: 'T', title: 'Tracking', tone: 'teal', text: 'Every camp day, course and project followed from start to finish.' },
]

export const tone = (t: Tone, alpha = 1) => `rgb(var(--a-${t}) / ${alpha})`
export const indexOf = (app: OrbitApp) => String(SUITE.indexOf(app) + 1).padStart(2, '0')
export const findApp = (id?: string) => SUITE.find((a) => a.id === id)
