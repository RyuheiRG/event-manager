import { FormValues, EventId } from '../components/utils/types'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { addEvent, deleteEvent } from '../redux/eventsSlice'
import { v4 as uuidv4 } from 'uuid'

export const useEvents = (closeModal: () => void) => {
    const dispatch = useAppDispatch()

    const submitForm = (values: FormValues) => {
        if (!values.fecha) {
            alert("Por favor, introduce una fecha.")
            return
        }

        const inputDate = new Date(values.fecha)
        inputDate.setDate(inputDate.getDate() + 1)
        inputDate.setHours(0, 0, 0, 0)

        const utcDate = new Date(Date.UTC(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate()))
        if (isNaN(utcDate.getTime())) {
            alert("Por favor, introduce una fecha válida.")
            return
        }

        const newEvent = {
            ...values,
            id: uuidv4() as EventId,
            fecha: utcDate.toISOString().split('T')[0],
        }

        dispatch(addEvent(newEvent))
        closeModal()
    }

    const removeEvent = (id: EventId) => {
        dispatch(deleteEvent(id))
    }

    return { submitForm, removeEvent }
}