import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStartups = createAsyncThunk("startups/fetchStartups", async () => {
  const res = await axios.get("http://localhost:5000/startups"); // adapte ton port JSON Server
  return res.data;
});

const startupsSlice = createSlice({
  name: "startups",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStartups.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStartups.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchStartups.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default startupsSlice.reducer;
