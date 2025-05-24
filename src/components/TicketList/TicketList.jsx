import { Ticket } from '../Ticket/Ticket'
import { TicketSort } from '../TicketSort/TicketSort'
import styles from './ticketList.module.scss'

export function TicketList () {
    return (
        <section className={`${styles.search_page}`}> 
            <TicketSort/>
            <ul className={`${styles.search_results}`}>
                <Ticket/>
            </ul>
        </section>
    )
}