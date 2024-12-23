import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { FormValues } from "../utils/types"

interface EventsState {
    events: FormValues[]
}
  
const initialState: EventsState = {
    events: [],
}  

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action: PayloadAction<FormValues>) => {
      state.events.push(action.payload)
    },
    deleteEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter((event) => event.id !== action.payload)
    },
  },
})

export const { addEvent, deleteEvent } = eventsSlice.actions
export default eventsSlice.reducer