import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { FormValues } from '../utils/types'
import { EventItem } from '../components/EventItem'
import configureStore from 'redux-mock-store'

const mockStore = configureStore()
const store = mockStore({
  events: { events: [] },
})

const mockEvent: FormValues = {
  id: 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx',
  nombre: 'Concierto de prueba',
  fecha: '2025-12-30',
  hora: '18:00',
  descripcion: 'Un evento de prueba'
}

describe('EventItem Component', () => {
  test('renders EventItem with provided props', () => {
    render(
      <Provider store={store}>
        <EventItem {...mockEvent} />
      </Provider>
    )

    // Verifica que el componente renderice correctamente
    expect(screen.getByText(/Concierto de prueba/i)).toBeInTheDocument()
    expect(screen.getByText('18:00')).toBeInTheDocument()
    expect(screen.getByText(/Un evento de prueba/i)).toBeInTheDocument()
  })
})
