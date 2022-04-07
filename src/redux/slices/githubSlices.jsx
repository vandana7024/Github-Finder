import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// create action  for repos
export const fetchReposAction = createAsyncThunk(
  "repos/list",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      };

      const { data } = await axios.get(
        `https://api.github.com/users/${user}/repos?per_page=30&sort=asc`,
        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// create action for user profile
export const fetchProfileAction = createAsyncThunk(
  "profile/list",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      };
      const { data } = await axios.get(
        `https://api.github.com/users/${user}`,
        config
      );
      console.log("data", data);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

// slices

const reposSlices = createSlice({
  name: "repos",
  initialState: {
    user: "",
  },
  extraReducers: (builder) => {
    builder.addCase(fetchReposAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchReposAction.fulfilled, (state, action) => {
      state.reposList = action.payload;
      state.loading = false;
      state.error = undefined;
    });

    // profile
    builder.addCase(fetchProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
      state.error = undefined;
    });
    builder.addCase(fetchProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.profile = undefined;
    });
  },
});

export default reposSlices.reducer;
