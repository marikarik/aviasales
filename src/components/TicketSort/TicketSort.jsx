import { Flex, Radio } from 'antd';
import styles from './ticketSort.module.scss'
const options = [
  { label: 'Самый дешевый', value: 'Самый дешевый' },
  { label: 'Самый быстрый', value: 'Самый быстрый' },
  { label: 'Оптимальный', value: 'Оптимальный' },
];
export function TicketSort () {
    return (
    <Flex vertical gap="middle" className={`${styles.sort_list}`}>
        <Radio.Group
            block
            options={options}
            defaultValue="Самый дешевый"
            optionType="button"
            buttonStyle="solid"
        />
    </Flex>
    )
}