# Etapa de build
FROM node:18 AS build

WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY package.json package-lock.json ./

# Instala dependências incluindo as de desenvolvimento
RUN npm install

# Copia todo o código fonte
COPY . .

# Garante que o Next.js compile corretamente
RUN npm run build

# Etapa de execução (produção)
FROM node:18 AS runner

WORKDIR /app

# Copia apenas os arquivos essenciais para rodar a aplicação
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/.next /app/.next
COPY --from=build /app/public /app/public
COPY --from=build /app/src /app/src

# Copia o arquivo db.json
COPY db.json /app/db.json

# Instala as dependências de produção e o json-server
RUN npm ci --only=production && npm install -g json-server

# Define a porta que a aplicação irá rodar
EXPOSE 3000 3333

# Comando para rodar ambos Next.js e JSON Server
CMD ["sh", "-c", "npm run start & json-server --watch /app/db.json --port 3333"]
