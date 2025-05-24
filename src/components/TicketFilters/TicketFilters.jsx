import { Checkbox } from "antd";
import styles from './ticketFilters.module.scss'

export function TicketFilters () {
    return (
        <aside className={`${styles.filters}`}>
            <h2 className={`${styles.filters_header}`}>Количество пересадок</h2>
            <ul className={`${styles.filters_list}`}>
                <li className={`${styles.filters_list__item}`}>
                    <Checkbox>Все</Checkbox>
                </li>
                <li className={`${styles.filters_list__item}`}>
                    <Checkbox>Без пересадок</Checkbox>
                </li>
                <li className={`${styles.filters_list__item}`}>
                    <Checkbox>1 пересадка</Checkbox>
                </li>
                <li className={`${styles.filters_list__item}`}>
                    <Checkbox>2 пересадки</Checkbox>
                </li>
                <li className={`${styles.filters_list__item}`}>
                    <Checkbox>3 пересадки</Checkbox>
                </li>
            </ul>
        </aside>
    )
}