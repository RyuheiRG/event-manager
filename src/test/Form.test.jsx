import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { ModalForm } from '../components/ModalForm'

const mockStore = configureStore()

describe('ModalForm', () => {
    let store

    beforeEach(() => {
        store = mockStore({
            events: { events: [] },
        })
    })

    test('renders EventForm and submits a valid form', async () => {
        render(
            <Provider store={store}>
                <ModalForm />
            </Provider>
        )

        // Verifica que el formulario se haya renderizado
        expect(screen.getByLabelText(/Nombre del evento/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Fecha/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Hora/i)).toBeInTheDocument()

        // Rellenar el formulario con datos válidos
        fireEvent.change(screen.getByLabelText(/Nombre del evento/i), { target: { value: 'Concierto de prueba' } })
        fireEvent.change(screen.getByLabelText(/Fecha/i), { target: { value: '2025-12-30' } })
        fireEvent.change(screen.getByLabelText(/Hora/i), { target: { value: '18:00' } })
        fireEvent.change(screen.getByLabelText(/Descripción/i), { target: { value: 'Un evento de prueba' } })

        // Simular el envío del formulario
        fireEvent.click(screen.getByRole('button', { name: /Enviar/i }))

        // Verifica que la acción de Redux haya sido despachada (si es relevante)
        expect(store.getActions()).toContainEqual(expect.objectContaining({
            type: "ADD_EVENT",
            payload: expect.objectContaining({
                nombre: "Concierto de prueba",
                fecha: "2025-12-30",
                hora: "18:00",
                descripcion: "Un evento de prueba",
            }),
        }))
    })

    test('shows error message for invalid date', async () => {
        render(
            <Provider store={store}>
                <ModalForm />
            </Provider>
        )

        // Rellenar el formulario con una fecha inválida (por ejemplo, fecha pasada)
        fireEvent.change(screen.getByLabelText(/Nombre del evento/i), { target: { value: 'Evento con fecha inválida' } })
        fireEvent.change(screen.getByLabelText(/Fecha/i), { target: { value: '2020-01-01' } })
        fireEvent.click(screen.getByRole('button', { name: /Enviar/i }))

        // Verifica que el mensaje de error aparece
        expect(await screen.findByText(/Fecha inválida/i)).toBeInTheDocument()
    })
})
