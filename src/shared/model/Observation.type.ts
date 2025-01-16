export type ObservationType = "test" | "reference";

export type Observation = {
  id: number;
  uid: string;
  user_id: number;
  type: ObservationType;
  created_at: string;
  modified_at: string;

  device_id?: string | null;

  observation_date: string;
  start_time: string;
  end_time: string;

  // Nano seconds
  observation_frequency: number;

  // Facility & Source Information
  facility_name?: string | null;
  facility_address?: string | null;
  facility_contact_name?: string | null;
  facility_contact_phone?: string | null;
  permit_number?: string | null;
  process_equipment_id?: string | null;
  process_equipment_operating_mode?: string | null;
  control_equipment_id?: string | null;
  control_equipment_operating_mode?: string | null;

  // Observation Point & Plume Information
  longitude?: number | null;
  latitude?: number | null;
  height_relative_to_observer?: number | null;
  distance_relative_to_observer?: number | null;
  viewing_angle?: number | null;
  direction_from_observer?: number | null;
  plume_shape?:
    | "no-emissions"
    | "fanning"
    | "fumigating"
    | "coning"
    | "looping"
    | "lofting"
    | null;
  emission_type?: "point-source" | "fugitive" | null;
  emission_color?: string | null;
  water_vapour_plume?: "none" | "attached" | "detached" | null;

  // Atmospheric Data
  percent_cloud_cover_start?: number | null;
  percent_cloud_cover_end?: number | null;
  ambient_temperature_start?: number | null;
  ambient_temperature_end?: number | null;
  wind_speed_start?: number | null;
  wind_speed_end?: number | null;
  wind_direction_start?: string | null;
  wind_direction_end?: string | null;
  relative_humidity_start?: number | null;
  relative_humidity_end?: number | null;
  wet_bulb_temperature_start?: number | null;
  wet_bulb_temperature_end?: number | null;

  // Observer Information
  observer_name?: string | null;
  observer_company?: string | null;
  certification_issued_by?: string | null;
  certification_date?: string | null;

  averaging_period?: number | null;
  comments?: string | null;
};
