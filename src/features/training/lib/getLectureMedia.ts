const API_URL = "https://consumer-api-838911323978.us-central1.run.app/api/v1/lecture"

export function getLectureMediaUrl(objectName: string) {
  return `${API_URL}/${objectName}`;
}

