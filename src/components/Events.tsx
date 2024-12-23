import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useEventsByMonth } from "../hooks/useEventsByMonth"
import { Box, Typography } from "@mui/material"
import BarPlot from "../D3/BarPlot"
import { EventItem } from "./EventItem"

export const Events = () => {
    const events = useSelector((state: RootState) => state.events)
    const eventsByMonth = useEventsByMonth(events.events)

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
        <>
            <Box sx={{ width: '100%', padding: '16px' }}> 
              <Typography variant='h6' component='h3' align='center'> 
                Lista de eventos agregados 
              </Typography> 
              <Box component="ul" sx={styleContainerItems}> 
                {events.events.map((event) => ( <EventItem key={event.id} {...event} /> ))} 
              </Box> 
            </Box> 
    
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Typography variant='h6' component='h3' align='center'>
                Grafica de eventos por mes
              </Typography>
              {events.events.length > 0 && <BarPlot data={eventsByMonth} />}
            </Box>
        </>
    )
}