import { add, format } from 'date-fns'

function from (dateStart)  {
    return format(dateStart, 'HH:mm')
}

function to (dateStart, duration) {
    const arrivalDate = add(dateStart, {minutes: duration})
    return format(arrivalDate, 'HH:mm')
}

export function formatFlightTimeRange (dateStart, duration) {
    const departureTime = from(dateStart)
    const arrivalTime = to(dateStart, duration)
    
    return `${departureTime} - ${arrivalTime}` 
}

export function calculateFlightDuration (duration) {
    const hours = Math.floor(duration / 60)
    const minutes = duration % 60
    return `${hours}ч ${minutes}м`
}