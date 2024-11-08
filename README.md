README del proyecto

---

# Event Manager

## Descripción
**Event Manager** es una aplicación para la gestión de eventos, desarrollada en React con TypeScript. Permite a los usuarios agregar, visualizar y eliminar eventos, mostrando detalles como nombre, fecha, hora, y descripción del evento.

## Tabla de Contenidos
- [Características](#características)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Instalación y Configuración](#instalación-y-configuración)
- [Ejecución del Proyecto](#ejecución-del-proyecto)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso](#uso)
- [Consideraciones de Desarrollo](#consideraciones-de-desarrollo)
- [Pruebas](#pruebas)
- [Problemas Conocidos](#problemas-conocidos)
- [Mejoras Futuras](#mejoras-futuras)

## Características
- **Gestión de eventos:** Permite agregar, visualizar y eliminar eventos.
- **Validación de fechas:** Verifica que la fecha ingresada no sea una fecha pasada y limita la selección del año a un rango razonable.
- **Interfaz moderna y tipada:** Estructura de la aplicación en React y TypeScript.
- **Material-UI:** Proporciona una interfaz de usuario estilizada y receptiva.
- **Formik y Yup:** Gestión de formularios y validación avanzada.
- **Redux Toolkit:** Gestión del estado global de la aplicación.
- **D3.js:** Visualización de datos con gráficas interactivas.

## Tecnologías Utilizadas
- **React y TypeScript**
- **Material-UI**
- **Formik y Yup**
- **Redux Toolkit**
- **D3.js**

## Instalación y Configuración
1. Clona el repositorio:
   ```bash
   git clone https://github.com/RyuheiRG/event-manager.git
   cd event-manager
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecución del Proyecto
Para iniciar el proyecto en modo de desarrollo, usa:
```bash
npm start
```
El proyecto estará disponible en [http://localhost:3000](http://localhost:3000).

## Estructura del Proyecto
El proyecto está organizado de la siguiente manera:

```
src/
├── components/      # Componentes reutilizables como EventItem y ModalForm
├── icons/           # Iconos utilizados en forma de componente
├── utils/           # Utilidades y tipos personalizados
├── d3/              # Gráfica realizada con D3.js
├── hooks/           # Hooks personalizados como useEvents y useModal
├── redux/           # Slice y store de Redux
├── schemas/         # Validaciones de formularios con Yup
└── App.tsx          # Componente principal de la aplicación
```

## Uso
- **Agregar un evento:** Completa el formulario con los detalles del evento y haz clic en "Agregar".
- **Visualizar eventos:** Los eventos se muestran en una lista con información clave como nombre y fecha.
- **Eliminar un evento:** Haz clic en "Borrar Evento" para eliminar el evento de la lista.

## Consideraciones de Desarrollo
- **Tipado en TypeScript:** Se evitó el uso de `any` y se aplicó tipado estricto a todos los componentes y funciones.
- **Gestión de estado con Redux Toolkit:** El estado de la aplicación se gestiona centralizadamente con Redux para facilitar el mantenimiento.

## Pruebas
- **Visualización de Datos:** Se realizaron pruebas de visualización para asegurar que los datos se muestren correctamente en el gráfico de eventos por mes.
- **Formulario de Eventos:** Pruebas de validación de formularios para verificar el manejo de entradas inválidas y el envío exitoso de datos.

## Problemas Conocidos
- **Formato de fecha:** La fecha en el formulario puede mostrarse incorrectamente en ciertos formatos. Se recomienda ingresar las fechas en formato `AAAA-MM-DD`.

## Mejoras Futuras
- **Editar eventos:** Incluir una funcionalidad para editar los eventos existentes en la lista.
- **Optimización de rendimiento:** Mejorar la eficiencia en el renderizado de la lista de eventos y en la visualización de la gráfica para grandes volúmenes de datos.

---
