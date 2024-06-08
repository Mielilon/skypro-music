import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "@/types/user";

type UserStateType = {
  user: null | UserType;
  tokens: {
    access: string | null;
    refresh: string | null;
  };
};

const initialState: UserStateType = {
  user: null,
  tokens: {
    access: null,
    refresh: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setTokens: (
      state,
      action: PayloadAction<{
        access?: string;
        refresh?: string;
      }>
    ) => {
      if (action.payload.access) {
        state.tokens.access = action.payload.access;
      }
      if (action.payload.refresh) {
        state.tokens.refresh = action.payload.refresh;
      }
    },
    logout: (state) => {
      state.user = null;
      state.tokens.access = null;
      state.tokens.refresh = null;
    },
  },
});

export const { setUser, setTokens, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;
