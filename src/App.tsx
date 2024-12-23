import { useModal } from './hooks/useModal'
import { ModalForm } from './components/ModalForm'
import { Header } from './components/Header'
import { AddEvent } from './components/AddEvent'
import { Container } from '@mui/material'
import { Events } from './components/Events'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'

function App() {
  const events = useSelector((state: RootState) => state.events)
  const { isOpen, openModal, closeModal } = useModal(false)

  return (
    <Container maxWidth='md' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '24px', padding: '16px' }}>
      <Header />
      <AddEvent openModal={openModal} />

      {events.events.length > 0 && <Events />}

      {isOpen && <ModalForm isOpen={isOpen} closeModal={closeModal} />}
    </Container>
  )
}

export default App
