import { Box, Button, TextareaAutosize, TextField } from '@mui/material'
import { useFormik } from 'formik'
import { schema } from '../schemas/validateScheme'
import { EventId, FormValues } from './utils/types'
import { useEvents } from '../hooks/useEvents'
import { v4 as uuidv4 } from 'uuid'

export const ModalForm = ({ isOpen, closeModal }: {isOpen: boolean, closeModal: () => void }) => {
    const { submitForm } = useEvents(closeModal)

    const { handleSubmit, handleChange, errors, values, touched } = useFormik<FormValues>({
        initialValues: {
            id: uuidv4() as EventId,
            nombre: '', 
            fecha: '', 
            hora: '',
            descripcion: ''
        },
        onSubmit: submitForm,
        validationSchema: schema,
    })

    const styleTextarea = {
        width: '100%',
        minWidth: '200px',
        minHeight: '100px',
        maxHeight: '150px',
        padding: '12px',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        outline: 'none',
        resize: 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        color: '#333',
        '&:focus': {
          borderColor: '#1976d2',
          boxShadow: '0px 0px 8px rgba(25, 118, 210, 0.3)',
        },
        '&::placeholder': {
          color: '#aaa',
        }
    }

    const styleModal = {
        position: 'fixed',
        zIndex: '999',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        backgroundColor: '#00000070',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px', 
    }

    const styleForm = {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        gap: 2,
        maxWidth: '400px',
        minWitdh: '200px',
        margin: '0 auto',
        padding: 3,
        backgroundColor: '#f9f9f9',
        borderRadius: 2,
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    }

    return (
        <Box sx={isOpen ? styleModal : {display: 'none'}}>
            <Box component="form" sx={styleForm} onSubmit={handleSubmit}>
                <Button 
                    sx={{ position: 'absolute', top: '1px', right: '1px' }}
                    size='small'
                    variant='text'
                    onClick={closeModal}
                >
                    X
                </Button>
                <TextField 
                    sx={{ minWidth: '200px' }} 
                    id='nombre'
                    name='nombre'
                    value={values.nombre}
                    required
                    label='Nombre del evento'
                    onChange={handleChange}
                    error={touched.nombre && Boolean(errors.nombre)}
                    helperText={touched.nombre && errors.nombre}
                />
                <TextField 
                    sx={{ minWidth: '200px' }} 
                    id='fecha'
                    name='fecha'
                    value={values.fecha}
                    required
                    label='Fecha del evento (AAAA-MM-DD)'
                    placeholder='AAAA-MM-DD'
                    onChange={handleChange}
                    error={Boolean(errors.fecha)}
                    helperText={touched.fecha && errors.fecha}
                />
                <TextField
                    sx={{ minWidth: '200px' }}
                    id='hora'
                    name='hora'
                    value={values.hora}
                    required
                    label='Hora del evento (HH:MM)'
                    placeholder='HH:MM'
                    onChange={handleChange}
                    error={Boolean(errors.hora)}
                    helperText={errors.hora}
                />
                <Box 
                    component={TextareaAutosize} 
                    sx={styleTextarea} 
                    placeholder='Descripción...'
                    name='descripcion'
                    value={values.descripcion || ''}
                    onChange={handleChange}
                />
                {touched.descripcion && errors.descripcion && (
                    <span style={{ color: 'red' }}>{errors.descripcion}</span>
                )}
                <Button 
                    sx={{ minWidth: '200px' }} 
                    variant="contained" 
                    type='submit'
                >
                    Agregar evento
                </Button>
            </Box>
        </Box>
    )
}
