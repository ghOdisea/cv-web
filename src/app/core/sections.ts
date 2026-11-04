/** Anchor ids of the page sections, in display order. Labels come from `nav.<id>`. */
export const NAV_SECTIONS = [
  'about',
  'path',
  'experience',
  'projects',
  'skills',
  'education',
  'contact',
] as const;

export type SectionId = (typeof NAV_SECTIONS)[number];
