# Etapa de build
FROM node:18 AS build

WORKDIR /app

# Copia apenas os arquivos necessários
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código para dentro do container
COPY . .

# Cria a build do Next.js
RUN npm run build

# Etapa de execução (produção)
FROM node:18 AS runner

WORKDIR /app

# Copia apenas os arquivos necessários da build
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/public /app/public
COPY --from=build /app/.next /app/.next

# Define a porta da aplicação
EXPOSE 3000

# Comando para rodar o servidor Next.js
CMD ["npm", "run", "start"]
