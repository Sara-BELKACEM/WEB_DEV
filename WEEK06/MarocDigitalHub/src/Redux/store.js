import { configureStore } from "@reduxjs/toolkit";
import startupsReducer from "./startups/startupsSlice";
import eventsReducer from "./events/eventsSlice";

export const store = configureStore({
  reducer: {
    startups: startupsReducer,
    events: eventsReducer,
  },
});
