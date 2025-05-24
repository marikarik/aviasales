// import { useState } from 'react'
import './index.scss'
import { TicketFilters } from './components/TicketFilters/TicketFilters'
import { TicketSort } from './components/TicketSort/TicketSort'
import { TicketList } from './components/TicketList/TicketList'

function App() {

  return (
    <>
    <TicketFilters/>
    <TicketList/>
    </>
  )
}

export default App
