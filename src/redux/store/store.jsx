import { configureStore } from "@reduxjs/toolkit";
import reposReducer from "../slices/githubSlices";

export const store = configureStore({
  reducer: {
    repos: reposReducer,
  },
});
