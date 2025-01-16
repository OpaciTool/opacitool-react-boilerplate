import { z, ZodType } from "zod";
import { ObservationFormData } from "../model";

export const ObservationFormSchema: ZodType<ObservationFormData> = z.object({
  // Basic Information
  observation_date: z.string(),
  start_time: z.string(),
  end_time: z.string(),

  // Facility & Source Information
  facility_name: z.string().nullable().default(null),
  facility_address: z.string().nullable().default(null),
  facility_contact_name: z.string().nullable().default(null),
  facility_contact_phone: z.string().nullable().default(null),
  permit_number: z.string().nullable().default(null),
  process_equipment_id: z.string().nullable().default(null),
  process_equipment_operating_mode: z.string().nullable().default(null),
  control_equipment_id: z.string().nullable().default(null),
  control_equipment_operating_mode: z.string().nullable().default(null),

  // Observation Point & Plume Information
  latitude: z
    .union([z.number().min(-90).max(90), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  longitude: z
    .union([z.number().min(-180).max(180), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  height_relative_to_observer: z
    .union([z.number(), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  distance_relative_to_observer: z
    .union([z.number(), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  viewing_angle: z
    .union([z.number().min(0).max(360), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  direction_from_observer: z
    .union([z.number().min(0).max(360), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  plume_shape: z
    .enum([
      "no-emissions",
      "fanning",
      "fumigating",
      "coning",
      "looping",
      "lofting",
    ])
    .default("no-emissions")
    .nullable()
    .optional()
    .transform((value) => {
      return value ?? "no-emissions";
    }),
  emission_type: z
    .enum(["point-source", "fugitive"])
    .nullable()
    .default(null)
    .optional(),
  emission_color: z.string().nullable().default(null),
  water_vapour_plume: z
    .enum(["none", "attached", "detached"])
    .nullable()
    .default(null)
    .optional(),

  // Atmospheric Data
  percent_cloud_cover_start: z
    .union([z.number(), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  percent_cloud_cover_end: z
    .union([z.number(), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  ambient_temperature_start: z
    .union([z.number(), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  ambient_temperature_end: z
    .union([z.number(), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  wind_speed_start: z
    .union([z.number(), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  wind_speed_end: z
    .union([z.number(), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  wind_direction_start: z.string().nullable().default(null),
  wind_direction_end: z.string().nullable().default(null),
  relative_humidity_start: z
    .union([z.number(), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  relative_humidity_end: z
    .union([z.number(), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  wet_bulb_temperature_start: z
    .union([z.number(), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),
  wet_bulb_temperature_end: z
    .union([z.number(), z.nan(), z.null()])
    .optional()
    .transform((value) => (Number.isNaN(value) ? null : value)),

  // Observer Information
  observer_name: z.string().nullable().default(null),
  observer_company: z.string().nullable().default(null),
  certification_issued_by: z.string().nullable().default(null),
  certification_date: z
    .union([z.string(), z.null()])
    .nullable()
    .default(null)
    .transform((value) => (!value ? null : value)),
  averaging_period: z
    .union([z.number().min(4).max(30).default(24), z.nan(), z.null()])
    .transform((value) => (value == null ? 24 : value)),
  comments: z.string().nullable().default(null),

  observation_frequency: z
    .number()
    .transform((nanoseconds) => nanoseconds / 1e9)
    .refine((seconds) => seconds >= 1 && seconds <= 60, {
      message: "observation_frequency must be between 1 and 60 seconds",
    })
    .transform((seconds) => seconds * 1e9),
});
