# Proyecto: Gestión de Usuarios con MySQL y React

Este proyecto es una aplicación full-stack que gestiona usuarios a través de una API backend en Express y una interfaz frontend en React. Los usuarios se pueden obtener, agregar, eliminar y ver sus direcciones asociadas, interactuando con una base de datos MySQL.

## Estructura del Proyecto

El proyecto está dividido en dos carpetas principales:

- **backend**: Contiene la API en Express que maneja las operaciones de la base de datos y la lógica del servidor.
- **frontend**: Contiene la aplicación React que interactúa con la API para mostrar la información a los usuarios.

## Tecnologías Utilizadas

### Backend:
- **Node.js**
- **Express**
- **MySQL**
- **CORS**

### Frontend:
- **React**
- **CSS** (para el diseño de la interfaz)

## Configuración del Proyecto

### 1. Clonar el Repositorio

Primero, clona el repositorio a tu máquina local:


- git clone (URL-del-repositorio)


### 2. Configuración de la Base de Datos

Asegúrate de tener MySQL instalado en tu máquina.

1. Crea una base de datos en MySQL llamada `prueba_tecnica`.
2. Ejecuta el archivo `BBDD.sql` desde MySQL Workbench para crear las tablas y agregar datos de prueba.

### 3. Archivos de Configuración

#### Archivo `.env` (Backend)

En la carpeta `backend`, modifca el archivo `.env` con las siguientes variables (modifica el usuario y la contraseña según tu configuración):

```env
DB_USER=(usuario)
DB_PASSWORD=(contraseña)
DB_NAME=prueba_tecnica
DB_PORT=3306
```

### 4. Instalación de Dependencias

#### Backend

1. Navega a la carpeta `backend`:

   ```bash
   cd backend
   ```

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Inicia el servidor backend:

   ```bash
   npm start
   ```

#### Frontend

1. Navega a la carpeta `frontend`:

   ```bash
   cd frontend
   ```

2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

3. Inicia la aplicación frontend:

   ```bash
   npm run dev
   ```

### 5. Acceso a la Aplicación

Abre tu navegador y accede a la siguiente URL:

```text
http://localhost:5173
```

Aquí podrás interactuar con la aplicación, ver los usuarios, agregar nuevos usuarios aleatorios desde la API y visualizar las direcciones asociadas a cada usuario.

## Funcionalidades

### Backend

- **Obtener todos los usuarios**: `GET /api/users`
- **Obtener direcciones de un usuario**: `GET /api/users/:id/addresses`
- **Agregar un usuario aleatorio**: `POST /api/users/add`
- **Eliminar un usuario**: `DELETE /api/users/:id`

### Frontend

- **Mostrar Usuarios**: Se muestra una lista de usuarios con nombre, correo, país y foto.
- **Agregar Usuarios**: Los usuarios aleatorios pueden ser agregados a la base de datos con un solo clic.
- **Ver Direcciones**: Al hacer clic en un usuario, se muestran sus direcciones asociadas (si están disponibles).
- **Eliminar Usuarios**: Los usuarios pueden ser eliminados de la base de datos directamente desde la interfaz.

## Notas

- **API de Usuarios Aleatorios**: Los usuarios se generan utilizando la API [https://randomuser.me/api/](https://randomuser.me/api/) para proporcionar datos aleatorios como nombre, correo y ubicación.
- **Datos de prueba**: Los usuarios se cargan desde la base de datos MySQL y las direcciones se asocian con cada usuario.
- **Manejo de Errores**: El frontend maneja errores de carga de datos y muestra notificaciones de éxito o error.



![image](https://github.com/user-attachments/assets/aa39ee2e-944a-428f-ab77-e862f7114c25)
![image](https://github.com/user-attachments/assets/2cf54919-965c-46a8-98ed-23acac1d4f54)
![image](https://github.com/user-attachments/assets/2a6e0104-3718-4a8b-918e-2fa74bab1d1c)

