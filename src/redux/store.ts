import { configureStore } from "@reduxjs/toolkit"
import eventsReducer from './eventsSlice'

const store = configureStore({
    reducer: {
        events: eventsReducer,
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export default store