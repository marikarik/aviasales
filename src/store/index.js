import { configureStore } from "@reduxjs/toolkit";
import toggleFiltersReducer  from './filtersSlice'

export default configureStore({
    reducer: {
        filters: toggleFiltersReducer
    }
})