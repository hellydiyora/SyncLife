import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosNew from "./axioInstance";
import axios from "axios";
export const moodSlice = createSlice({
  name: "mood",
  initialState: {
    moodData: [],
  },
  reducers: {
    setMoodData: (state, action) => {
      state.moodData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => state);
  },
});

export const { setMoodData } = moodSlice.actions;

export const fetchMoodData = createAsyncThunk(
  "mood/fetchMoodData",
  async (userToken) => {
    try {
      const response = await axiosNew.get("/mood", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("error in fetching mood data: ", error);
      throw error;
    }
  }
);

export const addMoodData = createAsyncThunk(
  "mood/addMoodData",
  async ({ date, feeling, activity, userToken }) => {
    
   try{
      await axiosNew.post(
        "/mood",
        { date, feeling,activity },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      return {  date, feeling , activity };
    } catch (error) {
      console.error("Error in adding mood data: ", error);
    }
  }
);

export default moodSlice.reducer;
