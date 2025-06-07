// import { useState } from 'react'
import styles from "./index.module.scss";
import { TicketFilters } from "./components/TicketFilters/TicketFilters";
import { TicketList } from "./components/TicketList/TicketList";
import HeaderLogo from "./components/HeaderLogo/HeaderLogo";

function App() {
  return (
    <>
      <HeaderLogo />
      <div className={`${styles.app_wrap}`}>
        <TicketFilters />
        <TicketList />
      </div>
    </>
  );
}

export default App;
