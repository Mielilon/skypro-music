import { SigninFormType } from "@/types/form";
import { UserType } from "@/types/user";

const API_URL = "https://skypro-music-api.skyeng.tech/user";

export const getUser = async ({
  email,
  password,
}: SigninFormType): Promise<UserType> => {
  try {
    const response = await fetch(API_URL + "/login/", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.detail);
    }

    return json as UserType;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    throw error;
  }
};

export const getTokens = async ({ email, password }: SigninFormType) => {
  try {
    const response = await fetch(API_URL + "/token/", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Возникла ошибка! Статус: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Ошибка при получении токена:", error);
    throw error;
  }
};
