import { Box, Typography } from "@mui/material"

export const Header = () => {
    return (
        <Box 
            component='header' 
            sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                width: '100%', 
                justifyContent: 'center', 
                alignItems: 'center',
                gap: '10px'
            }}>
        <Typography variant="h3" component="h1" align="center">
            Manejador de Eventos
        </Typography>
        <Typography color="textSecondary" variant="h6" component="h2" align="center">
            Event Manager es una aplicación de gestión de eventos desarrollada en React con TypeScript. Permite a los usuarios agregar, ver y eliminar eventos con detalles como nombre, fecha, hora, ubicación y descripción, además de visualizar la ubicación en un mapa interactivo. 😎
        </Typography> 
      </Box>
    )
}