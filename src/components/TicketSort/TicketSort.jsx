import { Flex, Radio } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeSort } from "../../store/sortSlice";

import styles from "./ticketSort.module.scss";
const options = [
  { label: "Самый дешевый", value: "cheap" },
  { label: "Самый быстрый", value: "fast" },
  { label: "Оптимальный", value: "optimal" },
];
export function TicketSort() {
  const dispatch = useDispatch();
  const sort = useSelector((state) => state.sort);
  return (
    <Flex vertical gap="middle" className={`${styles.sort_list}`}>
      <Radio.Group
        block
        options={options}
        defaultValue={sort}
        optionType="button"
        buttonStyle="solid"
        onChange={(e) => dispatch(changeSort(e.target.value))}
      />
    </Flex>
  );
}
