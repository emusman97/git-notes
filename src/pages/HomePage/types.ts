export const GistsLayouts = {
  Table: 'table',
  Grid: 'grid',
} as const;

export type GistsLayout = (typeof GistsLayouts)[keyof typeof GistsLayouts];
