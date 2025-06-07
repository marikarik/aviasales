import { Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { toggleFilters } from "../../store/filtersSlice";

import styles from "./ticketFilters.module.scss";

export function TicketFilters() {
  const checkboxes = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  return (
    <aside className={`${styles.filters}`}>
      <h2 className={`${styles.filters_header}`}>Количество пересадок</h2>
      <ul className={`${styles.filters_list}`}>
        {Object.keys(checkboxes).map((checkboxName) => (
          <li className={`${styles.filters_list__item}`} key={checkboxName}>
            <Checkbox
              checked={checkboxes[checkboxName]}
              onChange={() => dispatch(toggleFilters(checkboxName))}
            >
              {checkboxName}
            </Checkbox>
          </li>
        ))}
      </ul>
    </aside>
  );
}
