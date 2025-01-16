import { PAUSE_TYPES } from "../lib";

export type ObservationPauseType = (typeof PAUSE_TYPES)[number];

export type ObservationPause = {
  id: number;
  created_at: string;
  modified_at: string;
  observation_id: number;
  pause_start: string;
  pause_end: string;
  time_added: number;
  pause_type: ObservationPauseType;
  notes?: string;
};
