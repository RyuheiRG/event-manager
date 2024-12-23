import { Box, Button, Typography } from "@mui/material"
import { FormValues } from "../utils/types"
import { useEvents } from "../hooks/useEvents"
import { useModal } from "../hooks/useModal"

export const EventItem = ({ id, nombre, fecha, hora, descripcion }: FormValues) => {
    const { closeModal } = useModal(false)
    const { removeEvent } = useEvents(closeModal)

    const styles = {
        eventItem: {
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          borderRadius: '8px',
          background: 'linear-gradient(135deg,rgba(66, 180, 37, 0.92),rgba(72, 236, 67, 0.92))',
          color: '#000',
          padding: '16px',
          transition: 'transform 0.3s, box-shadow 0.3s',
          margin: '8px 0',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.3)',
          },
        },
        eventTitle: {
          fontWeight: 'bold',
          fontSize: '1.2rem',
        },
        eventDateAndTime: {
          fontSize: '1rem',
          color: '#333',
        },
        eventDescription: {
          fontSize: '0.9rem',
          color: '#fff',
          fontWeight: 'bold'
        },
        eventButton: {
          backgroundColor: '#ff5252',
          color: '#fff',
          alignItems: 'center',
          transition: 'background-color 0.3s, transform 0.3s',
          '&:hover': {
            backgroundColor: '#ff1744',
            transform: 'scale(1.05)',
          },
        },
      }      

    const descriptionStyle = {
        wordWrap: 'break-word',
        maxHeight: '100px',
        overflowY: 'auto',
        textAlign: 'wrapper',
        marginTop: '8px'
    }

    return (
        <Box component="li" key={id} sx={styles.eventItem}>
            <Typography variant="h6" component="h4" sx={styles.eventTitle}>{nombre}</Typography>
            <Typography variant="h6" component="h4" sx={styles.eventDateAndTime}>
            {new Date(fecha + 'T00:00:00').toLocaleDateString()}
            </Typography>
            <Typography variant="h6" component="h4" sx={styles.eventDateAndTime}>{hora}</Typography>
            {descripcion && (
                <Typography variant="body2" component="p" sx={{...descriptionStyle, ...styles.eventDescription}}>
                    {descripcion}
                </Typography>
            )}
            <Button color="error" sx={styles.eventButton} variant="contained" onClick={() => removeEvent(id)}>Borrar Evento</Button>
        </Box>
    )
}