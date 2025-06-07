import styles from "./ticket.module.scss";
import {
  formatFlightTimeRange,
  calculateFlightDuration,
} from "../../helpers/timeHelper";

export function Ticket({ ticket }) {
  const { price, carrier, segments, __id } = ticket;

  return (
    <>
      <div className={`${styles.ticket}`}>
        <header className={`${styles.ticket__header}`}>
          <span>{price}₽</span>
          <img
            src={`https://pics.avs.io/110/36/${carrier}.png`}
            alt={`Логотип ${carrier}`}
          />
        </header>
        {segments.map(({ origin, destination, date, duration, stops }) => {
          return (
            <div className={`${styles.ticket__info}`} key={duration + __id}>
              <div className={`${styles.ticket__rout}`}>
                <span className={`${styles.ticket__rout_name}`}>
                  {origin}_{destination}
                </span>
                <span className={`${styles.ticket__rout_time}`}>
                  {formatFlightTimeRange(date, duration)}
                </span>
              </div>
              <div className={`${styles.ticket__duration}`}>
                <span className={`${styles.ticket__duration_label}`}>
                  В пути
                </span>
                <span className={`${styles.ticket__duration_time}`}>
                  {calculateFlightDuration(duration)}
                </span>
              </div>
              <div className={`${styles.ticket__transfers}`}>
                <span className={`${styles.ticket__transfers_count}`}>
                  {stops.length === 0
                    ? "БЕЗ ПЕРЕСАДОК"
                    : stops.length === 1
                      ? "1 ПЕРЕСАДКА"
                      : `${stops.length} ПЕРЕСАДКИ`}
                </span>
                <span className={`${styles.ticket__transfers_rout}`}>
                  {stops.map((stop) => `${stop} `)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
