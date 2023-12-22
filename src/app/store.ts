import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";
import todoSlice from "../features/todoSlice";
import applicationSlice from "../features/applicationSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    todo: todoSlice,
    application: applicationSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
