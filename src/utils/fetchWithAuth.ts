const AUTH_URL = "https://skypro-music-api.skyeng.tech/user";

export async function refreshToken(refreshToken: string): Promise<string> {
  const res = await fetch(AUTH_URL + "/token/refresh/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  if (!res.ok) {
    throw new Error("Failed to refresh token");
  }

  const data = await res.json();
  return data.access;
}

export async function fetchWithAuth(
  url: string,
  options: RequestInit,
  refresh: string
): Promise<Response> {
  let res = await fetch(url, options);

  if (res.status === 401) {
    const newAccessToken = await refreshToken(refresh);

    // Повторный запрос с новым токеном
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${newAccessToken}`,
    };
    res = await fetch(url, options);
  }

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res;
}
