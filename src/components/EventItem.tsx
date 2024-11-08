import { Box, Button, Typography } from "@mui/material"
import { FormValues } from "./utils/types"
import { useEvents } from "../hooks/useEvents"
import { useModal } from "../hooks/useModal"

export const EventItem = ({ id, nombre, fecha, hora, descripcion }: FormValues) => {
    const styleItem = {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        boxShadow: '0 0 10px 10px rgba(0, 0, 0, .12)',
        borderRadius: '4px',
        background: '#6f6fff90',
        color: '#000',
        padding: '16px',
    }

    const { closeModal } = useModal(false)
    const { removeEvent } = useEvents(closeModal)

    const descriptionStyle = {
        wordWrap: 'break-word',
        maxHeight: '100px',
        overflowY: 'auto',
        textAlign: 'justify'
    }

    return (
        <Box component="li" key={id} sx={styleItem}>
            <Typography variant="h6" component="h4">{nombre}</Typography>
            <Typography variant="h6" component="h4">
            {new Date(fecha + 'T00:00:00').toLocaleDateString()}
            </Typography>
            <Typography variant="h6" component="h4">{hora}</Typography>
            {descripcion && (
                <Typography variant="body2" component="p" sx={descriptionStyle}>
                    {descripcion}
                </Typography>
            )}
            <Button color="error" variant="contained" onClick={() => removeEvent(id)}>Borrar Evento</Button>
        </Box>
    )
}