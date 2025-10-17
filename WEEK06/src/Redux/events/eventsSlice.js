import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEvents = createAsyncThunk("events/fetchEvents", async () => {
  const res = await axios.get("http://localhost:5000/events");
  return res.data;
});

const eventsSlice = createSlice({
  name: "events",
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchEvents.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default eventsSlice.reducer;
