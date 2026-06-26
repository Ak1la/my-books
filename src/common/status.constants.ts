export const ReadingStatus = {
  TO_READ: 'TO_READ',
  CURRENTLY_READING: 'CURRENTLY_READING',
  PAUSED: 'PAUSED',
  READ: 'READ',
  DNF: 'DNF',
} as const;

export type ReadingStatusValue = (typeof ReadingStatus)[keyof typeof ReadingStatus];

export const PredictionStatus = {
  OPEN: 'OPEN',
  HIT: 'HIT',
  MISS: 'MISS',
  PARTIAL: 'PARTIAL',
  CANCELLED: 'CANCELLED',
} as const;

export type PredictionStatusValue = (typeof PredictionStatus)[keyof typeof PredictionStatus];
