import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { ModalForm } from '../components/ModalForm'
import { configureStore } from '@reduxjs/toolkit'
import eventsReducer, { addEvent } from '../redux/eventsSlice'

describe('ModalForm', () => {
    let store

    beforeEach(() => {
        store = configureStore({
            reducer: {
                events: eventsReducer,
            },
        })
    })

    test('renders EventForm and submits a valid form', async () => {
        const closeModalMock = jest.fn()

        render(
            <Provider store={store}>
                <ModalForm isOpen={true} closeModal={closeModalMock} />
            </Provider>
        )

        // Verificar que el formulario se haya renderizado
        await waitFor(() => {
            expect(screen.getByLabelText(/Nombre del evento/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/Fecha/i)).toBeInTheDocument()
            expect(screen.getByLabelText(/Hora/i)).toBeInTheDocument()
        })

        // Rellenar el formulario con datos válidos
        fireEvent.change(screen.getByLabelText(/Nombre del evento/i), { target: { value: 'Concierto de prueba' } })
        fireEvent.change(screen.getByLabelText(/Fecha/i), { target: { value: '2025-12-30' } })
        fireEvent.change(screen.getByLabelText(/Hora/i), { target: { value: '18:00' } })
        fireEvent.change(screen.getByPlaceholderText('Descripción...'), { target: { value: 'Hola mundo' } })

        // Simular el envío del formulario
        fireEvent.submit(screen.getByRole('button', { name: /Agregar evento/i }))

        // Verificar que la acción fue despachada y el estado de Redux se ha actualizado
        await waitFor(() => {
            const state = store.getState().events.events
            expect(state).toContainEqual(
                expect.objectContaining({
                    nombre: 'Concierto de prueba',
                    fecha: '2025-12-30',
                    hora: '18:00',
                    descripcion: 'Hola mundo',
                    id: expect.any(String),
                })
            )
        })

        // Verificar que closeModal se haya llamado
        expect(closeModalMock).toHaveBeenCalled()
    })
})
