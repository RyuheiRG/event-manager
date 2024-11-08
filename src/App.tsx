import { useModal } from './hooks/useModal'
import { Box, Container, Typography } from "@mui/material"
import { ModalForm } from './components/ModalForm'
import { Header } from './components/Header'
import { AddEvent } from './components/AddEvent'
import { EventItem } from './components/EventItem'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import BarPlot from './D3/BarPlot'
import { useMemo } from 'react'
import * as d3 from 'd3'

function App() {
  const { isOpen, openModal, closeModal } = useModal(false)
  const events = useSelector((state: RootState) => state.events)

  const eventsByMonth = useMemo(() => {
    const groupedEvents = d3.rollups(
      events.events,
      v => v.length,
      d => new Date(d.fecha).getMonth()
    )
  
    return Array.from(groupedEvents, ([month, count]) => ({
      month: new Date(0, month).toLocaleString('default', { month: 'long' }),
      count
    }))
  }, [events])  

  const styleContainerItems = {
    display: 'grid',
    width: '100%',
    gridTemplateColumns: `repeat(
      auto-fit,
      minmax(
        200px,
        1fr
      )
    )`,
    gap: '16px',
  }

  return (
    <Container maxWidth='md' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '24px' }}>
      <Header />
      <AddEvent openModal={openModal} />

      <Box sx={{ width: '100%' }}>
        <Typography variant='h6' component='h3' align='center'>
          Lista de eventos agregados
        </Typography>
        
        <Box component="ul" sx={styleContainerItems}>
          {events.events.map((event) => (
            <EventItem key={event.id} {...event} />
          ))}
        </Box>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant='h6' component='h3' align='center'>
          Grafica de eventos por mes
        </Typography>
        {events.events.length > 0 && <BarPlot data={eventsByMonth} />}
      </Box>
      {isOpen && (
        <ModalForm isOpen={isOpen} closeModal={closeModal} />
      )}
    </Container>
  )
}

export default App
