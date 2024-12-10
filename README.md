# Newsletter App

## Descripción

Esta aplicación permite la **gestión y envío de newsletters** a una lista de destinatarios. Fue desarrollada utilizando **FastAPI** en el backend y **React** en el frontend. Además, emplea **SQLite** como base de datos embebida, y se ejecuta en contenedores **Docker** para un despliegue y pruebas sencillas.

### Funcionalidades Principales

- **Administración de destinatarios (Recipients):**
  - Agregar y listar destinatarios.
  - Agregar múltiples destinatarios mediante carga masiva (CSV).
  - Desuscripción de destinatarios, tanto de forma global como específica por newsletter.

- **Administración de newsletters:**
  - Subir un newsletter con un archivo adjunto (PDF/PNG).
  - Enviar newsletters a la lista de destinatarios suscritos.
  - Programar el envío de newsletters para una fecha/hora futura. - Pendiente

- **Correos personalizados en HTML:**
  - Los emails se envían usando plantillas HTML (Jinja2 en el backend) y personalizando el contenido para cada destinatario.
  - Incluye un enlace de desuscripción único por newsletter.

- **Dashboard de estadísticas: Pendiente**
  - Mostrar número total de destinatarios, newsletters, correos enviados, y desuscritos.
  - Posible integración de gráficos para visualizar datos de forma atractiva.

- **Despliegue en Docker:**
  - Todos los servicios (backend, frontend) se inician con `docker-compose`, facilitando el desarrollo y pruebas sin configuraciones complejas.
  - Uso de SQLite elimina la necesidad de un servicio de base de datos externo.

---

## Requerimientos

- **Docker** (versión 19.03+)
- **Docker Compose** (versión 3.8 o superior en el archivo)

Asegúrate de tener Docker y Docker Compose instalados y funcionando en tu máquina.

---
## Instrucciones para Ejecutar el Proyecto

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local y navega al directorio del proyecto:

```bash
git clone https://github.com/tu-usuario/newsletter-app.git
cd newsletter-app
```

### 2. Construir e iniciar los servicios con Docker Compose

Desde el directorio raíz del proyecto, ejecuta el siguiente comando para construir las imágenes de Docker y levantar los contenedores:

```bash
docker-compose up --build
```

### 2.1 Si este método no funciona, puedes ejecutar los proyectos por separado:

```bash
cd backend
pip install -r requirements.txt
fastapi run app/main.py
```

```bash
cd frontend
npm install
npm run dev
```

### 3. Acceder a la aplicación

Una vez que los contenedores estén en ejecución, puedes acceder a la aplicación en tu navegador web a través de `http://localhost:3000` para el frontend y `http://localhost:8000` para el backend.



