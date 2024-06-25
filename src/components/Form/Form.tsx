"use client";

import Image from "next/image";
import cn from "classnames";
import styles from "./Form.module.css";
import Link from "next/link";
import { InputFieldType, SigninFormType } from "@/types/form";
import { convertInputFieldsToObject } from "@/utils/convertInputFieldsToObject";
import { useState } from "react";

type FormProps<F extends Record<string, string>> = {
  inputFields: InputFieldType<F>[];
  buttonText: string;
  linkText?: string;
  link?: string;
  error?: string;
  queryFn: (formData: F) => void;
};

export default function Form<F extends Record<string, string>>({
  inputFields,
  buttonText,
  linkText,
  link,
  error,
  queryFn,
}: FormProps<F>) {
  const [formData, setFormData] = useState<F>(
    convertInputFieldsToObject<F>(inputFields)
  );

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    queryFn(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form className={styles.modalFormLogin}>
      <div className={styles.modalLogo}>
        <Image src="/img/logo_modal.png" alt="logo" width={140} height={21} />
      </div>
      <div className={styles.fieldsWrapper}>
        {inputFields.map((field) => (
          <input
            key={field.name}
            {...field}
            className={cn(styles.modalInput, field.className)}
            value={formData[field.name as keyof F]}
            onChange={handleChange}
          />
        ))}
        {error && <div className={styles.modalError}>{error}</div>}
      </div>
      <button onClick={handleSubmit} className={styles.modalBtnEnter}>
        {buttonText}
      </button>
      {linkText && link && (
        <Link className={styles.modalBtnSignup} href={link}>
          {linkText}
        </Link>
      )}
    </form>
  );
}
