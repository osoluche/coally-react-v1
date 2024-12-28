# React Task Manager App

![React](https://img.shields.io/badge/React-18.0.0-blue?style=flat-square&logo=react)
![Redux](https://img.shields.io/badge/Redux-9.2.0-purple?style=flat-square&logo=redux)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.17-blue?style=flat-square&logo=tailwind-css)

## 📋 Descripción

Task Manager es una aplicación de gestión de tareas creada con **React**, que permite a los usuarios:
- **Autenticarse** con un token JWT.
- **Visualizar tareas** en diferentes estados: pendientes y completadas.
- **Filtrar y gestionar tareas** de manera eficiente.

Este proyecto está diseñado con **Redux** para el manejo del estado global y **TailwindCSS** para el diseño de la interfaz.

---

## 🚀 Características

- **Inicio de Sesión y Registro** con validación y almacenamiento del token JWT.
- **Protección de rutas** para garantizar que solo usuarios autenticados accedan a áreas privadas.
- **Filtros dinámicos** de tareas (Pendientes, Completadas).
- **Diseño Responsivo** utilizando TailwindCSS.
- **Manejo de formularios** simplificado con React Hook Form.

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- [React](https://reactjs.org/) (v18.0.0)
- [Redux Toolkit](https://redux-toolkit.js.org/) (v9.2.0)
- [TailwindCSS](https://tailwindcss.com/) (v3.4.17)
- [React Router](https://reactrouter.com/) (v7.1.1)
- [Font Awesome](https://fontawesome.com/)

### **Backend**
- API REST basada en Node.js con Express (puedes personalizar según tu backend).

---

## Instalación

### **1. Clonar el Repositorio**
- git clone https://github.com/osoluche/coally-react-v1.git
- cd coally-react-v1

### **2.- Instalar dependencias **
- npm i

### **3.- Iniciar la aplicacion **
- npm run start

## Funcionalidades Clave

1. Autenticación

    Login: Envía credenciales al endpoint /login y almacena el token en el estado global con Redux.

    Protección de Rutas: Se verifica el token antes de permitir acceso a páginas privadas.

2. Listado de Tareas

    Endpoint: /tasks
    Estructura: Un array con objetos { id, title, description, status, time }.
    Filtros: Visualización por estado (pendientes y completadas).

3. Manejo de Formularios

    Uso de React Hook Form para una validación y gestión más eficiente de los formularios de login y registro.
