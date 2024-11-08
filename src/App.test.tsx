import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import App from './App'

const mockStore = configureStore()
const store = mockStore({
  events: { events: [] }, // Estado inicial vacío para eventos
})

test('renders App component with header and add event button', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  // Verificar que el encabezado esté presente
  expect(screen.getByText(/Lista de eventos agregados/i)).toBeInTheDocument()

  // Verificar que el botón para añadir eventos esté presente
  const addButton = screen.getByRole('button', { name: /Añadir evento/i })
  expect(addButton).toBeInTheDocument()

  // Verificar que el gráfico o la lista estén vacíos al inicio
  expect(screen.getByText(/Grafica de eventos por mes/i)).toBeInTheDocument()
  expect(screen.getByRole('list')).toBeInTheDocument()
})
