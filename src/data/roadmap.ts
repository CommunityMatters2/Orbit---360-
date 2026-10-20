/**
 * Public roadmap shown on the Roadmap page.
 * Edit this list to share what Community Matters 2 is working on next.
 */
export type Stage = 'planned' | 'building' | 'live'

export interface RoadmapItem {
  title: string
  note: string
  stage: Stage
}

export const STAGES: { key: Stage; title: string; text: string }[] = [
  { key: 'planned', title: 'Planned', text: 'On the horizon' },
  { key: 'building', title: 'Building', text: 'In development now' },
  { key: 'live', title: 'Live', text: 'Shipped and in orbit' },
]

export const ROADMAP: RoadmapItem[] = [
  { title: 'One sign-in for every CM2 app', note: 'A single account across the whole suite.', stage: 'planned' },
  { title: 'Outcomes dashboard', note: 'Program results from camp and academy, in one view.', stage: 'planned' },
  { title: 'CM2 Community Center: 2D & 3D block', note: 'Explore the future Community Center.', stage: 'building' },
  { title: 'Orbit 360', note: 'The home for every CM2 app.', stage: 'live' },
  { title: 'Community Input Survey', note: 'Collecting the community’s voice.', stage: 'live' },
  { title: 'Opinion Live Wall', note: 'Responses displayed as they arrive.', stage: 'live' },
]
