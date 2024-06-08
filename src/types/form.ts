export type InputFieldType<FT extends Record<string, string>> = {
  className: string;
  type: string;
  name: Extract<keyof FT, string>;
  placeholder: string;
  value?: string;
};

export type SigninFormType = {
  email: string;
  password: string;
};

export type SignupFormType = {
  email: string;
  password: string;
  username: string;
};
