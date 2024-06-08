import { fetchWithAuth } from "@/utils/fetchWithAuth";

const API_URL = "https://skypro-music-api.skyeng.tech/catalog";

export async function getTracks() {
  const res = await fetch(API_URL + "/track/all/");

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}

export async function likeTrack({
  trackId,
  access,
  refresh,
}: {
  trackId: number;
  access: string;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    API_URL + `/track/${trackId}/favorite/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh
  );

  return res.json();
}

export async function dislikeTrack({
  trackId,
  access,
  refresh,
}: {
  trackId: number;
  access: string;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    API_URL + `/track/${trackId}/favorite/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh
  );

  return res.json();
}

export const fetchFavoriteTracks = async (accessToken: string) => {
  try {
    const response = await fetch(
      "https://skypro-music-api.skyeng.tech/catalog/track/favorite/all/",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch favorite tracks");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching favorite tracks:", error);
    throw error;
  }
};
