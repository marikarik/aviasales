import styles from './Ticket.module.scss'

export function Ticket () {
    return (
       <>
       <li className={`${styles.ticket}`}>
            <header className={`${styles.ticket__header}`}>
                <span>12 500₽</span>
                {/* <span>₽</span> */}
                <img alt='oops'/>
            </header>
            <div className={`${styles.ticket__info}`}>
                <div className={`${styles.ticket__rout}`}>
                    <span className={`${styles.ticket__rout_name}`}>MOW_HKT</span>
                    <span className={`${styles.ticket__rout_time}`}>12:05 - 14:02</span>
                </div>
                <div className={`${styles.ticket__duration}`}>
                    <span className={`${styles.ticket__duration_label}`}>В пути</span>
                    <span className={`${styles.ticket__duration_time}`}>21ч 15мин</span>
                </div>
                <div className={`${styles.ticket__transfers}`}>
                    <span className={`${styles.ticket__transfers_count}`}>2 пересадки</span>
                    <span className={`${styles.ticket__transfers_rout}`}>HKT MOW</span>
                </div>
            </div>
            <div className={`${styles.ticket__info}`}>
                <div className={`${styles.ticket__rout}`}>
                    <span className={`${styles.ticket__rout_name}`}>MOW_HKT</span>
                    <span className={`${styles.ticket__rout_time}`}>12:05 - 14:02</span>
                </div>
                <div className={`${styles.ticket__duration}`}>
                    <span className={`${styles.ticket__duration_label}`}>В пути</span>
                    <span>21ч 15мин</span>
                </div>
                <div className={`${styles.ticket__transfers}`}>
                    <span className={`${styles.ticket__transfers_count}`}>2 пересадки</span>
                    <span className={`${styles.ticket__transfers_rout}`}>HKT MOW</span>
                </div>
            </div>
       </li>
       </>
    )
}