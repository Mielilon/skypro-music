"use client";
import { useState } from "react";
import FormContainer from "@/components/Form/Container/Container";
import Form from "@/components/Form/Form";
import { useAppDispatch } from "@/hooks/store";
import { InputFieldType, SignupFormType } from "@/types/form";
import { getUser } from "@/api/user";
import { setUser } from "@/store/features/userSlice";

const inputFields: InputFieldType<SignupFormType>[] = [
  {
    className: "login",
    type: "text",
    name: "email",
    placeholder: "Почта",
  },
  {
    className: "password-first",
    type: "password",
    name: "password",
    placeholder: "Пароль",
  },
  {
    className: "username",
    type: "password",
    name: "username",
    placeholder: "Повторите пароль",
  },
];

export default function SignupPage() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>("");

  const queryFn = async (formData: SignupFormType) => {
    try {
      const userData = await getUser(formData);
      dispatch(setUser(userData));
    } catch (error: unknown) {
      if (error instanceof Error) setError(error.message);
      else setError("Неизвестная ошибка");
    }
  };

  return (
    <FormContainer>
      <Form<SignupFormType>
        inputFields={inputFields}
        buttonText="Зарегистрироваться"
        queryFn={queryFn}
        error={error}
      />
    </FormContainer>
  );
}
