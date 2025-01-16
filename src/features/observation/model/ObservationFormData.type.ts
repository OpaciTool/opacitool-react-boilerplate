import { Observation } from "@/shared/model";

export type ObservationFormData = Omit<
  Observation,
  "id" | "uid" | "user_id" | "type" | "device_id" | "created_at" | "modified_at"
>;
