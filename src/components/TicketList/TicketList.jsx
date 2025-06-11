import { useEffect, useState } from "react";
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
import { selectorFilteredSortedTickets } from "./ticketSelector";

import styles from "./ticketList.module.scss";

export function TicketList() {
  const dispatch = useDispatch();

  const { data: idData } = useGetIdQuery();
  const [loadTickets, { data: ticketsData, isError, isFetching }] =
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
  }, [ticketsData?.tickets, dispatch]);

  useEffect(() => {
    if (ticketsData && !ticketsData.stop && !isError && !isFetching) {
      loadTickets(idData.searchId);
    }
  }, [ticketsData?.stop, isError, isFetching, idData, loadTickets]);

  const [index, setIndex] = useState(5);

  function clickButton() {
    setIndex((prevState) => prevState + 5);
  }

  let tickets = useSelector(selectorFilteredSortedTickets);
  const ticketsToShow = tickets.slice(0, index);

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
