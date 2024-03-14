import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosNew from "./axioInstance";

export const gratiSlice = createSlice({
  name: "gratitude",
  initialState: { gratitudes: [] },
  reducers: {
    setGratitudes: (state, action) => {
      state.gratitudes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addDefaultCase((state) => state);
  },
});

export const { setGratitudes } = gratiSlice.actions;

export const fetchGratitudes = createAsyncThunk(
  "gratitude/fetchGratitudes",
  async (userToken) => {
    try {
      const response = await axiosNew.get("/gratitude", {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error in fetching gratitudes:", error);
      throw error;
    }
  }
);

export const addGratitude = createAsyncThunk(
  "gratitude/addGratitude",
  async ({
    date,
    greatfulFor,
    lookingForward,
    goodThings,
    better,
    userToken,
  }) => {
    
    try {
      await axiosNew.post(
        "/gratitude",
        {
            date, greatfulFor, lookingForward, goodThings, better
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      return { date, greatfulFor, lookingForward, goodThings, better };
    } catch (error) {
      console.error("Error in adding gratitudes:", error);
      throw error;
    }
  }
);

export default gratiSlice.reducer;
