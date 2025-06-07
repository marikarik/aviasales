import { configureStore } from "@reduxjs/toolkit";
import toggleFiltersReducer from "./store/filtersSlice";
import ticketListReducer from "./store/ticketListSlice";
import sortSliceReducer from "./store/sortSlice";
import { ticketSearchAPI } from "./store/ticketSearchAPI";

export default configureStore({
  reducer: {
    filters: toggleFiltersReducer,
    sort: sortSliceReducer,
    ticketList: ticketListReducer,
    [ticketSearchAPI.reducerPath]: ticketSearchAPI.reducer,
  },
  middleware: (getDefaultMiddlware) =>
    getDefaultMiddlware().concat(ticketSearchAPI.middleware),
});
