import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';

const mockStore = configureStore();
const store = mockStore({
  events: { events: [] },
});

test('renders App component with header and add event button', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  // Verificar que el encabezado esté presente
  expect(screen.getByText(/Lista de eventos agregados/i)).toBeInTheDocument();

  // Verificar que el botón para añadir eventos esté presente
  const addButton = screen.getByRole('button', { name: /Agregar evento/i });
  expect(addButton).toBeInTheDocument();
});

test('opens the modal when the add event button is clicked', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  const addButton = screen.getByRole('button', { name: /Agregar evento/i });
  fireEvent.click(addButton);

  // Verificar que el modal del formulario se abre
    const eventName = await screen.findByLabelText(/Nombre del evento/i);
    expect(eventName).toBeInTheDocument();
});
