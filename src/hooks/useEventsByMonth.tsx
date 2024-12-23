import { useMemo } from "react"
import * as d3 from 'd3'
import { FormValues } from "../utils/types"

export const useEventsByMonth = (events: FormValues[]) => {
    const eventsByMonth = useMemo(() => {
        const groupedEvents = d3.rollups(
          events,
          v => v.length,
          d => new Date(d.fecha).getMonth()
        )
      
        return Array.from(groupedEvents, ([month, count]) => ({
          month: new Date(0, month).toLocaleString('default', { month: 'long' }),
          count
        }))
      }, [events])

    return eventsByMonth
}