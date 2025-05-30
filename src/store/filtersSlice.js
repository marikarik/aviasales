import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    'Все': true,
    'Без пересадок': true,
    '1 пересадка': true,
    '2 пересадки': true,
    '3 пересадки': true,
}

const filtersSlice = createSlice({
    name: 'ticketFilters',
    initialState,
    reducers: {
        toggleFilters(state, action) {
            const nameCheckbox = action.payload
            const allCheked = state['Все']

            if(nameCheckbox === 'Все' && allCheked){
                Object.keys(state).forEach((key) => {
                    state[key] = false
                })
            } else if(nameCheckbox === 'Все' && !allCheked){
                Object.keys(state).forEach((key) => {
                    state[key] = true
                })
            } else if (nameCheckbox !== 'Все'){
                if(state[nameCheckbox] && allCheked){
                    state['Все'] = false
                    state[nameCheckbox] = false
                }
                state[nameCheckbox] = !state[nameCheckbox]
            } 
            const areAllFiltersSelected = Object.keys(state).filter((key) => key !== 'Все').every(key => state[key])
            if(areAllFiltersSelected){
                state['Все'] = true
            }
        }
    }
})

export const {toggleFilters} = filtersSlice.actions
export default filtersSlice.reducer