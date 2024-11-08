import { Box, IconButton, Typography } from "@mui/material"
import { AddEventIcon } from "./icons/AddEventIcon"

export const AddEvent = ({ openModal }: {openModal: () => void}) => {
    return (
        <Box sx={{ 
            display: 'flex', 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center' 
        }}>
        <Typography variant="h5" component="h2" sx={{ textWrap: 'balance' }}>
            Agregar un nuevo evento aqui
        </Typography>
        <IconButton onClick={() =>openModal()}>
          <AddEventIcon />
        </IconButton>
      </Box>
    )
}