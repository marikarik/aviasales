import { useEffect, useState, useMemo } from "react";
import { Ticket } from "../Ticket/Ticket";
import { TicketSort } from "../TicketSort/TicketSort";
import Loading from "../Loading/Loading";
import {
  useGetIdQuery,
  useLazyGetTicketsQuery,
} from "../../store/ticketSearchAPI";
import { addTicketsToList } from "../../store/ticketListSlice";
import { Button, Empty, Alert } from "antd";
import { useSelector, useDispatch } from "react-redux";

import styles from "./ticketList.module.scss";

export function TicketList() {
  const dispatch = useDispatch();

  const { data: idData } = useGetIdQuery();
  const [loadTickets, { data: ticketsData, isError }] =
    useLazyGetTicketsQuery();

  useEffect(() => {
    if (idData?.searchId) {
      loadTickets(idData.searchId);
    }
  }, [idData, loadTickets]);

  useEffect(() => {
    if (ticketsData?.tickets) {
      dispatch(addTicketsToList(ticketsData.tickets));
    }

    if (ticketsData?.tickets && !ticketsData?.stop && !isError)
      loadTickets(idData.searchId);
  }, [ticketsData, idData, loadTickets, isError, dispatch]);

  const [index, setIndex] = useState(5);
  const ticketList = useSelector((state) => state.ticketList);
  const filters = useSelector((state) => state.filters);

  const activeFilters = Object.entries(filters)
    .filter(([name, isChecked]) => name !== "Все" && isChecked)
    .map(([name]) =>
      name === "Без пересадок"
        ? 0
        : name === "1 пересадка"
          ? 1
          : name === "2 пересадки"
            ? 2
            : 3,
    );

  const sort = useSelector((state) => state.sort);
  const filterTicket = useMemo(
    () =>
      [...ticketList].filter((ticket) =>
        ticket.segments.some((segment) =>
          activeFilters.includes(segment.stops.length),
        ),
      ),
    [activeFilters, ticketList],
  );

  const sortedTicket = useMemo(() => {
    return sort === "cheap"
      ? [...filterTicket].sort((a, b) => a.price - b.price)
      : sort === "fast"
        ? [...filterTicket].sort(
            (a, b) => a.segments[0].duration - b.segments[0].duration,
          )
        : [...filterTicket];
  }, [sort, filterTicket]);

  function clickButton() {
    setIndex((prevState) => prevState + 5);
  }

  const ticketsToShow = sortedTicket.slice(0, index);

  const isTicketListEmpty = ticketsToShow.length === 0;

  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (!ticketsData?.stop) {
      setIsloading(true);
    } else setIsloading(false);
  }, [ticketsData]);

  return (
    <>
      <section className={`${styles.search_page}`}>
        <TicketSort />
        {isError ? (
          <Alert
            className={`${styles.search_error}`}
            message="Упс! Что-то пошло не так. Мы уже работаем над устранением ошибки. 
                            Попробуйте загрузить билеты снова через несколько минут."
            type="warning"
          />
        ) : isTicketListEmpty ? (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description={"Рейсов, подходящих под заданные фильтры, не найдено"}
          />
        ) : (
          <>
            {isLoading && <Loading />}
            <ul className={`${styles.search_results}`}>
              {ticketsToShow.map((ticket) => {
                return (
                  <li key={ticket.__id} className={`${styles.ticket}`}>
                    <Ticket ticket={ticket} />
                  </li>
                );
              })}
            </ul>
            <Button type="primary" block onClick={clickButton}>
              ПОКАЗАТЬ ЕЩЕ
            </Button>
          </>
        )}
      </section>
    </>
  );
}
