# Utiliza una imagen base de Node.js
FROM node:16-bullseye

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (si existe)
COPY . .

# Instala las dependencias de la aplicación
RUN npm install

# Expone el puerto en el que la aplicación se ejecuta
EXPOSE 5000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]
