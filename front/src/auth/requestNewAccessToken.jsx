import { API_URL } from "./authConstants";

export default async function requestNewAccessToken(refreshToken) {
  const response = await fetch(`${API_URL}/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (response.ok) {
    const json = await response.json();

    if (json.error) {
      throw new Error(json.error);
    }
    return json.body.accessToken;
  } else {
    throw new Error("Unable to refresh access token.");
  }
}