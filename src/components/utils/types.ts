export type EventId = `${string}-${string}-${string}-${string}-${string}`

export interface FormValues {
    id: EventId
    nombre: string
    fecha: string
    hora: string
    descripcion?: string
}