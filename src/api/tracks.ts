const API_URL = "https://skypro-music-api.skyeng.tech/catalog";

export async function getTracks() {
  const res = await fetch(API_URL + "/track/all/");

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return res.json();
}
