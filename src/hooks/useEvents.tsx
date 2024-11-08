import { FormValues } from '../components/utils/types'
import { useAppDispatch } from '../hooks/useAppDispatch'
import { addEvent, deleteEvent } from '../redux/eventsSlice'

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
            id: crypto.randomUUID(),
            fecha: utcDate.toISOString().split('T')[0],
        }

        dispatch(addEvent(newEvent))
        closeModal()
    }

    const removeEvent = (id: string) => {
        dispatch(deleteEvent(id))
    }

    return { submitForm, removeEvent }
}