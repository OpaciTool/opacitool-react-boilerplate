import type {
  Observation,
  ObservationAsset,
  ObservationPause,
  ObservationReading,
  User,
  UserDevice,
} from "@/shared/model";

/* ---------------------------------- User ---------------------------------- */

export const MOCK_USER: User = {
  id: 1,
  uid: "abc-123",
  firebase_uid: "1",
  email: "test@test.com",
  created_at: "2021-09-01T00:00:00Z",
  modified_at: "2021-09-01T00:00:00Z",
};

/* ------------------------------- User Device ------------------------------ */

export const MOCK_USER_DEVICE: UserDevice = {
  id: "1",
  user_id: MOCK_USER.id,
  created_at: "2021-09-01T00:00:00Z",
  modified_at: "2021-09-01T00:00:00Z",
  platform: "iOS",
  model: "iPhone 12",
  camera: "12MP Wide",
};

/* ------------------------------- Observation ------------------------------ */

export const MOCK_OBSERVATIONS: Observation[] = [
  {
    created_at: "2021-09-01T00:00:00Z",
    modified_at: "2021-09-01T00:00:00Z",
    id: 1,
    uid: "09885d97-ac98-4ca8-8085-e243114169a7",
    device_id: MOCK_USER_DEVICE.id,
    user_id: MOCK_USER.id,
    facility_name: "Facility 1",
    observation_frequency: 15000000000,
    type: "test",
    observation_date: "2024-07-28T00:00:00Z",
    start_time: "2024-07-28T10:00:00Z",
    end_time: "2024-07-28T11:00:00Z",
    facility_address: null,
    facility_contact_name: null,
    facility_contact_phone: null,
    permit_number: null,
    process_equipment_id: null,
    process_equipment_operating_mode: null,
    control_equipment_id: null,
    control_equipment_operating_mode: null,
    latitude: null,
    longitude: null,
    height_relative_to_observer: null,
    distance_relative_to_observer: null,
    viewing_angle: null,
    direction_from_observer: null,
    plume_shape: null,
    emission_type: null,
    emission_color: null,
    water_vapour_plume: null,
    percent_cloud_cover_start: null,
    percent_cloud_cover_end: null,
    ambient_temperature_start: null,
    ambient_temperature_end: null,
    wind_speed_start: null,
    wind_speed_end: null,
    wind_direction_start: null,
    wind_direction_end: null,
    relative_humidity_start: null,
    relative_humidity_end: null,
    wet_bulb_temperature_start: null,
    wet_bulb_temperature_end: null,
    observer_name: null,
    observer_company: null,
    certification_issued_by: null,
    certification_date: null,
    comments: null,
    averaging_period: null,
  },
  {
    created_at: "2021-09-02T00:00:00Z",
    modified_at: "2021-09-02T00:00:00Z",
    id: 2,
    uid: "9ea291f1-1028-4fa5-b627-688a84b7d778",
    user_id: MOCK_USER.id,
    type: "reference",
    observation_date: "2024-08-28T00:00:00Z",
    start_time: "2024-08-28T10:00:00Z",
    end_time: "2024-08-28T12:00:00Z",
    observation_frequency: 15000000000,
    facility_name: "Facility 2",
    facility_address: null,
    facility_contact_name: null,
    facility_contact_phone: null,
    permit_number: null,
    process_equipment_id: null,
    process_equipment_operating_mode: null,
    control_equipment_id: null,
    control_equipment_operating_mode: null,
    latitude: null,
    longitude: null,
    height_relative_to_observer: null,
    distance_relative_to_observer: null,
    viewing_angle: null,
    direction_from_observer: null,
    plume_shape: null,
    emission_type: null,
    emission_color: null,
    water_vapour_plume: null,
    percent_cloud_cover_start: null,
    percent_cloud_cover_end: null,
    ambient_temperature_start: null,
    ambient_temperature_end: null,
    wind_speed_start: null,
    wind_speed_end: null,
    wind_direction_start: null,
    wind_direction_end: null,
    relative_humidity_start: null,
    relative_humidity_end: null,
    wet_bulb_temperature_start: null,
    wet_bulb_temperature_end: null,
    observer_name: null,
    observer_company: null,
    certification_issued_by: null,
    certification_date: null,
    comments: null,
    averaging_period: null,
    device_id: "4531f0a8-7c48-4ea4-a087-c01a254de4a2",
  },
];

/* ---------------------------- Observation Asset --------------------------- */

export const MOCK_OBSERVATION_ASSETS: ObservationAsset[] = [
  {
    id: 1,
    uid: "1",
    observation_id: MOCK_OBSERVATIONS[0].id,
    created_at: "2021-09-01T00:00:00Z",
    asset: {
      url: "https://www.example.com",
    },
    type: "image",
    include_with_report: false,
  },
  {
    id: 2,
    uid: "2",
    observation_id: MOCK_OBSERVATIONS[0].id,
    created_at: "2021-09-01T00:00:00Z",
    asset: {
      url: "https://www.example.com",
    },
    type: "verification-video",
    include_with_report: false,
  },
];

/* -------------------------- Observation Readings -------------------------- */

export const MOCK_OBSERVATION_READINGS: ObservationReading[] = [
  {
    id: 1,
    observation_id: MOCK_OBSERVATIONS[0].id,
    created_at: "2021-09-01T00:00:00Z",
    modified_at: "2021-09-01T00:00:00Z",
    opacity: 0.5,
    sort_order: 1000,
  },
];

/* --------------------------- Observation Pauses --------------------------- */

export const MOCK_OBSERVATION_PAUSES: ObservationPause[] = [
  {
    id: 1,
    observation_id: MOCK_OBSERVATIONS[0].id,
    created_at: "2021-09-01T00:00:00Z",
    modified_at: "2021-09-01T00:00:00Z",
    pause_start: "2024-07-28T10:30:00Z",
    pause_end: "2024-07-28T10:45:00Z",
    time_added: 900000000000,
    pause_type: "uncontrollable",
    notes: "Test notes",
  },
];
