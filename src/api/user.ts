import { SigninFormType } from "@/types/form";
import { UserType } from "@/types/user";
import { API_URL } from "../constants";

const USER_API_URL = `${API_URL}/user`;

export const fetchUser = async ({
  email,
  password,
}: SigninFormType): Promise<UserType> => {
  try {
    const response = await fetch(USER_API_URL + "/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
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

export const fetchTokens = async ({ email, password }: SigninFormType) => {
  try {
    const response = await fetch(USER_API_URL + "/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
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
