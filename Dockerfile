# Imagen base
FROM node:24

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json primero
COPY package*.json ./

# Instalar dependencias (incluye devDependencies)
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto de NestJS
EXPOSE 3000

# Comando por defecto para desarrollo con hot reload
CMD ["npm", "run", "start:dev"]
