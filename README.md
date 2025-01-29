# G4F-Frontend

Este é um projeto Frontend desenvolvido como parte do processo seletivo para a vaga na G4F. A aplicação foi criada com o framework [Next.js](https://nextjs.org) e utiliza React para o desenvolvimento de componentes.

## Instalação e Execução

### Instalação das Dependências

Antes de rodar o projeto, instale as dependências:

1. Clone o repositório:

   ```bash
   git clone https://github.com/WellyAguiar/G4F-Frontend

   ```

2. Instale as dependências:

   npm install

### Rodando o Projeto

# A) Localmente

    1. Para rodar o servidor de desenvolvimento localmente, altere a API_URL para 'localhost:3333/news' na linha 3 do newsService.js (src/app/services/newService.js)

    2. Depois use o comando:

        npm run dev

    Assim iniciará o servidor na porta 3000 (localhost:3000) e o json.server na porta 3333 (localhost:3333)

# B) No Docker

    Para rodar o projeto dentro de um container do Docker, use o Dockerfile na raiz do projeto:

    1. Altere a API_URL para 'host.docker.internal:3333/news' na linha 3 do newsService.js (src/app/services/newService.js)


    2. Construa a imagem Docker:

        docker build -t welly-frontend

    2. Rode a aplicação no Docker

        docker run -p 3000:3000

    Isso irá expor a aplicação na porta 3000 do seu computador.

### Testes

Para rodar o teste, use o seguinte comando:

    npm test

Isso executará o teste configurado no Jest para testar a funcionalidade de busca do CEP

### Funcionalidades

1.  Busca de Endereços por CEP: A aplicação possui um formulário para buscar endereços por CEP usando a API ViaCEP

2.  CRUD de Notícias: A aplicação também possui um CRUD para a entidade "Notícia", com atributos "título" e "descrição". Foi adicionado também um atributo para organização das noticias da mais recente para a mais antiga baseado na hora da publicação. A funcionalidade está utilizando um json-server.

### Justificativa da Estrutura de Pastas

1.  components: Cada componente é armazenado em sua propria pasta, contendo os arquivos jsx e css. Isso facilita a manutenção, reuso e escalabilidade do projeto.

2.  services: Contém o arquivo que faz a comunicação com a lógica externa da API de noticias. Utilizado em grande escala para integração de apis.

3.  tests: contém os testes da aplicação, no caso somente o teste para o componente CepSearh.

Essa organização, ao meu ver, facilita a manutenção do código, a adição de novas funcionalidades e a colaboração com outros desenvolvedores.
