"use client";

import { useState } from "react";
import { getTokens, getUser } from "@/store/features/userSlice";
import FormContainer from "@/components/Form/Container/Container";
import Form from "@/components/Form/Form";
import { InputFieldType, SigninFormType } from "@/types/form";
import { useAppDispatch } from "@/hooks/store";
import { useRouter } from "next/navigation";

const inputFields: InputFieldType<SigninFormType>[] = [
  {
    className: "login",
    type: "text",
    name: "email",
    placeholder: "Почта",
  },
  {
    className: "password",
    type: "password",
    name: "password",
    placeholder: "Пароль",
  },
];

export default function SigninPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");

  const queryFn = async (formData: SigninFormType) => {
    try {
      await Promise.all([
        dispatch(getTokens(formData)).unwrap(),
        dispatch(getUser(formData)).unwrap(),
      ]);

      router.push("/");
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
      else setError("Неизвестная ошибка");
    }
  };

  return (
    <FormContainer>
      <Form<SigninFormType>
        inputFields={inputFields}
        buttonText="Войти"
        linkText="Зарегистрироваться"
        link="/signup"
        queryFn={queryFn}
        error={error}
      />
    </FormContainer>
  );
}
