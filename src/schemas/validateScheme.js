import { object, string } from "yup"

export const schema = object().shape({
    nombre: string().required("El nombre es obligatorio"),
    fecha: string()
        .matches(/^\d{4}-\d{2}-\d{2}$/, "El formato debe ser AAAA-MM-DD")
        .test("is-valid-date", "La fecha no es válida", (value) => {
            const dateObj = value ? new Date(value) : null
            return value && !isNaN(dateObj?.getTime())
        })
        .test("not-past-date", "La fecha no puede ser pasada", (value) => {
            if (!value) return false

            const today = new Date()
            today.setHours(0, 0, 0, 0)
            const inputDate = new Date(value)
            inputDate.setHours(0, 0, 0, 0)

            return inputDate >= today
        })
        .max(new Date("2099-12-31"), "El año debe estar entre 2000 y 2099")
        .required("La fecha es obligatoria"),
    hora: string()
        .trim()
        .required("La hora es obligatoria")
        .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/, "El formato debe ser HH:MM")
        .test("is-valid-time", "La hora no es válida", (value) => {
            if (!value) return false
            const [hour, minute] = value.split(":").map(Number)
            return (
                hour >= 0 && hour <= 23 &&
                minute >= 0 && minute <= 59
            )
        }),
    descripcion: string().max(100, "La descripción debe tener como máximo 100 caracteres").optional(),
})