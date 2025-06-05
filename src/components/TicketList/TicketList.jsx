import { useEffect, useState} from 'react'
import { Ticket } from '../Ticket/Ticket'
import { TicketSort } from '../TicketSort/TicketSort'
import { useGetIdQuery, useLazyGetTicketsQuery } from '../../store/ticketSearchAPI'
import { addTicketsToList } from '../../store/ticketListSlice'
import { Button, Empty } from 'antd'
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
    const {data: idData} = useGetIdQuery()
    const [loadTickets, {data: ticketsData, isError, error, isFetching}] = useLazyGetTicketsQuery()
    
    useEffect(() => {
        if(idData?.searchId){
            loadTickets(idData.searchId)
        }
    }, [idData])

    useEffect(() => {
        if(ticketsData?.tickets) {
            dispatch(addTicketsToList(ticketsData.tickets))
        }

        if((ticketsData?.tickets && !ticketsData?.stop && !isError)) loadTickets(idData.searchId)
        
    }, [ticketsData, idData])

    useEffect(() => {
        if(isError && error) {
            console.log(error);
        }
    }, [isError, error])

    const [index, setIndex] = useState(5)
    const ticketList = useSelector(state => state.ticketList)
    const filters = useSelector(state => state.filters)

    const activeFilters = Object.entries(filters)
        .filter(([name, isChecked]) => name !== 'Все' && isChecked)
        .map(([name]) => 
            name === 'Без пересадок' ? 0 :
            name === '1 пересадка' ? 1 :
            name ===  '2 пересадки' ? 2 : 3
        )

    const sort = useSelector(state => state.sort)
    const filterTicket = [...ticketList].filter((ticket) => 
        ticket.segments.some((segment) => activeFilters.includes(segment.stops.length))
    )
    const sortedTicket = 
        sort === 'cheap' ?  [...filterTicket].sort((a, b) => a.price - b.price) :
        sort === 'fast' ? [...filterTicket].sort((a, b) => a.segments[0].duration - b.segments[0].duration) :
        [...filterTicket]

    function clickButton () {
        setIndex(prevState => prevState + 5)
    }
    console.log(ticketList.length);
    
    const ticketsToShow = sortedTicket.slice(0, index)

    const isTicketListEmpty = ticketsToShow.length === 0

    return (
        <>
                <section className={`${styles.search_page}`}> 
                <TicketSort/>
                    {isError ? (
                        <>
                        <div>упс</div>
                        </>
                    ) :
                    isTicketListEmpty ? (
                        <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" description={'Рейсов, подходящих под заданные фильтры, не найдено'}/>
                    ):
                    <>
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
                    </>
                    }
            </section>
             

        </>
        
    )
}
