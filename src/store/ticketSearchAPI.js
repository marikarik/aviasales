import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react"

const baseQuery = retry(fetchBaseQuery({baseUrl: 'https://aviasales-test-api.kata.academy/'}),
{maxRetries: 10})

export const ticketSearchAPI = createApi({
    reducerPath: 'ticketSearchApi',
    baseQuery,
    endpoints: (build) => ({
        getId: build.query({
            query: () => 'search'
        }),
        getTickets: build.query({
            query: (id) => `tickets?searchId=${id}`
        })
    })
})

export const {useGetIdQuery} = ticketSearchAPI
export const {useGetTicketsQuery, useLazyGetTicketsQuery} = ticketSearchAPI
