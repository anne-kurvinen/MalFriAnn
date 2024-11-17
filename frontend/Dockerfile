# Använd en Node.js-bild som bas
FROM node

# Ange arbetskatalogen i containern
WORKDIR /app

# Kopiera package.json och package-lock.json till arbetskatalogen
COPY package*.json ./

# Installera beroenden
RUN npm install

# Kopiera resten av applikationen till arbetskatalogen
COPY . .

# Bygg applikationen
RUN npm run build

# Installera en enkel HTTP-server för att servera byggda filer
RUN npm install -g serve

# Exponera port 3000
EXPOSE 3000

# Starta servern
CMD ["serve", "-s", "dist", "-l", "3000"]