import { useEffect, useState} from 'react'
import { Ticket } from '../Ticket/Ticket'
import { TicketSort } from '../TicketSort/TicketSort'
import { useGetIdQuery, useLazyGetTicketsQuery } from '../../store/ticketSearchAPI'
import { addTicketsToList } from '../../store/ticketListSlice'
import { Button } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import styles from './ticketList.module.scss'


export function TicketList () {
    const dispatch = useDispatch()

    useEffect(() => {
    console.log('🔥 TicketList MOUNTED');
    return () => {
    console.log('💨 TicketList UNMOUNTED');
    };
    }, []);
    const {data: idSearch} = useGetIdQuery()
    const [loadTickets, {data: tickets, error, isFetching}] = useLazyGetTicketsQuery()
    
    useEffect(() => {
        if(idSearch?.searchId){
            loadTickets(idSearch.searchId)
        }
    }, [idSearch, loadTickets])

    useEffect(() => {
        if(tickets?.tickets) dispatch(addTicketsToList(tickets.tickets))
        if((tickets?.tickets && tickets?.tickets)) loadTickets(idSearch.searchId)
    }, [tickets, idSearch])

    const [index, setIndex] = useState(5)
    const ticketList = useSelector(state => state.ticketList)
    

    const sort = useSelector(state => state.sort)
    const sortedTicket = 
        sort === 'cheap' ?  [...ticketList].sort((a, b) => a.price - b.price) :
        sort === 'fast' ? [...ticketList].sort((a, b) => a.segments[0].duration - b.segments[0].duration) :
        [...ticketList]

    function clickButton () {
        setIndex(prevState => prevState + 5)
    }

    const ticketsToShow = sortedTicket.slice(0, index)

    return (
        <>
            <section className={`${styles.search_page}`}> 
                <TicketSort/>
                <ul className={`${styles.search_results}`}>
                    {ticketsToShow.map((ticket) => {
                        return (
                        <li key={ticket.__id} className={`${styles.ticket}`}>
                            <Ticket ticket={ticket}/> 
                        </li> 
                        )
                    })}
                </ul>
                <Button type="primary" block onClick={clickButton}>ПОКАЗАТЬ ЕЩЕ</Button>
            </section>
        </>
        
    )
}