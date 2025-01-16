export type ObservationAsset =
  | {
      include_with_report: boolean;
      id: number;
      uid: string;
      observation_id: number;
      created_at: string;
      type: "image" | "verification-video";
      asset: {
        url: string;
      };
    }
  | {
      include_with_report: boolean;
      id: number;
      uid: string;
      observation_id: number;
      created_at: string;
      type: "sun-position";
      asset: {
        x: number;
        y: number;
      };
    };

export type ObservationSunPositionAssetData = {
  x: number;
  y: number;
};
