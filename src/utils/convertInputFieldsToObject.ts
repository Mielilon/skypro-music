import { InputFieldType } from "@/types/form";

export const convertInputFieldsToObject = <T extends Record<string, string>>(
  fields: InputFieldType<T>[]
): T =>
  fields.reduce((acc, field) => {
    acc[field.name] = field.value || "";
    return acc;
  }, {} as Record<string, string>) as T;
