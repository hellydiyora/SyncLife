import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosNew from "./axioInstance";

export const aiSlice = createSlice({
  name: "ai",
  initialState: {
    insights: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearInsights: (state) => {
      state.insights = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAIInsights.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAIInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.insights = action.payload;
        state.error = null;
      })
      .addCase(fetchAIInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to generate insights";
      });
  },
});

export const { clearInsights } = aiSlice.actions;

export const fetchAIInsights = createAsyncThunk(
  "ai/fetchInsights",
  async (userToken, { rejectWithValue }) => {
    try {
      const response = await axiosNew.post(
        "/ai/insights",
        {},
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching AI insights:", error);
      const message =
        error.response?.data?.error || "Failed to generate insights. Please try again.";
      return rejectWithValue(message);
    }
  }
);

export default aiSlice.reducer;
