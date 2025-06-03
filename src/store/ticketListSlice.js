import { createSlice } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from 'uuid'

const initialState = []

const ticketList = createSlice({
    name: 'ticketList',
    initialState,
    reducers: {
        addTicketsToList(state, action) {
            const ticketsWithId = action.payload.map((ticket) => ({
                ...ticket,
                __id: uuidv4()
            }))
            state.push(...ticketsWithId)
        }
    }
})

export const { addTicketsToList } = ticketList.actions
export default ticketList.reducer