import { delay, http, HttpResponse } from "msw";
import {
  MOCK_OBSERVATION_ASSETS,
  MOCK_OBSERVATION_PAUSES,
  MOCK_OBSERVATIONS,
  MOCK_USER_DEVICE,
} from "./mock";

export const HANDLERS = [
  http.get("/users/me/subscription", async () => {
    await delay();
    return HttpResponse.json({
      status: "active",
      currentPeriodEnd: 1630454400, // 2021-09-01
    });
  }),
  http.get("/users/me", async () => {
    await delay();
    return HttpResponse.json({
      id: 1,
      uid: "1",
      firebase_uid: "1",
      email: "test@test.com",
    });
  }),
  http.get("/users/me", async () => {
    await delay();
    return HttpResponse.json({
      id: 1,
      uid: "1",
      firebase_uid: "1",
      email: "test@test.com",
    });
  }),
  http.get("/users/:id/observations", async () => {
    await delay();
    return HttpResponse.json({
      cursor: "1",
      observations: MOCK_OBSERVATIONS,
    });
  }),
  http.get("/users/:id/observations/:observationUID", async () => {
    await delay();
    return HttpResponse.json({
      ...MOCK_OBSERVATIONS[0],
    });
  }),
  http.get("/users/:id/observations/:observationUID/devices", async () => {
    await delay();
    return HttpResponse.json({
      ...MOCK_USER_DEVICE,
    });
  }),
  http.get("/users/:id/observations/:observationUID/assets", async () => {
    await delay();
    return HttpResponse.json([...MOCK_OBSERVATION_ASSETS]);
  }),
  http.get(
    "/users/:id/observations/:observationUID/assets/:assetId",
    async () => {
      await delay();
      return HttpResponse.json({ ...MOCK_OBSERVATION_ASSETS[0] });
    },
  ),
  http.get("/users/:id/observations/:observationUID/pauses", async () => {
    await delay();
    return HttpResponse.json([...MOCK_OBSERVATION_PAUSES]);
  }),
  http.get("/users/:id/observations/:observationUID/readings", async () => {
    return HttpResponse.json([]);
  }),
  http.get("/users/:id/observations/:observationUID/screenshots", async () => {
    return HttpResponse.json([]);
  }),
  http.post(
    "/users/:id/observations/:observationUID/readings",
    async ({ request }) => {
      const data = await request.formData();
      const opacity = data.get("opacity");
      if (opacity == null) {
        return new HttpResponse(null, { status: 400 });
      }
      await delay();
      return new HttpResponse(null, { status: 201 });
    },
  ),
];
