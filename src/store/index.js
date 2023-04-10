import tabsSlice from "./slices/tabs";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({
  reducer: {
    tabs: tabsSlice.reducer,
  },
  devTools: true,
});
export default store;
