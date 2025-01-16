export type ObservationScreenshot = {
  id: number;
  created_at: string;
  modified_at: string;

  include_with_report: boolean;
  latitude: number;
  longitude: number;
  observation_id: number;
  opacity: number;
  revised_opacity: number | null;
  timestamp: string;

  asset: {
    object_name: string;
    public_url: string;
  };
};
