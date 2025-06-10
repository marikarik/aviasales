import { createSelector } from "reselect";

const ticketList = (state) => state.ticketList;
const filters = (state) => state.filters;
const sortStatus = (state) => state.sort;

export const selectorFilteredSortedTickets = createSelector(
  [ticketList, filters, sortStatus],
  (ticketList, filters, sortStatus) => {
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

    const filterTicket = [...ticketList].filter((ticket) =>
      ticket.segments.some((segment) =>
        activeFilters.includes(segment.stops.length),
      ),
    );

    const sortedTicket =
      sortStatus === "cheap"
        ? [...filterTicket].sort((a, b) => a.price - b.price)
        : sortStatus === "fast"
          ? [...filterTicket].sort(
              (a, b) => a.segments[0].duration - b.segments[0].duration,
            )
          : [...filterTicket];

    return sortedTicket;
  },
);
