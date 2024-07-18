import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { API_URL } from "../constants";

const TRACKS_API_URL = `${API_URL}/catalog`;

export async function getTracks() {
  const res = await fetch(TRACKS_API_URL + "/track/all/");

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json().then((e) => e.data);
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
    TRACKS_API_URL + `/track/${trackId}/favorite/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
    TRACKS_API_URL + `/track/${trackId}/favorite/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    },
    refresh
  );

  return res.json();
}

export const fetchFavoriteTracks = async (accessToken: string) => {
  try {
    const response = await fetch(TRACKS_API_URL + "/track/favorite/all/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Ошибка при получении избранных треков");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
