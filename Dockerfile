# Imagen base
FROM node:24

# Establece el directorio de trabajo
WORKDIR /app

# Copia dependencias y las instala
COPY package*.json ./
RUN npm install

# Copia todo el proyecto
COPY . .

# Expón el puerto de Nest
EXPOSE 3000

# Comando para desarrollo
CMD ["npm", "run", "start:dev"]
