# 🃏 Truco Maluco --- Backend

API oficial do **Truco Maluco**, um jogo de truco com regras dinâmicas e
efeitos aleatórios a cada rodada.\
Este repositório contém o backend desenvolvido em **Node.js +
TypeScript**, responsável por:

-   Criar e gerenciar salas\
-   Gerenciar jogadores\
-   Preparar a lógica da partida\
-   Futuramente: rodadas, efeitos aleatórios, truco, envido, pontuação
    etc.

------------------------------------------------------------------------

## 🚀 Tecnologias

-   Node.js\
-   TypeScript\
-   Express\
-   ts-node-dev (hot reload)\
-   Crypto (UUID)\
-   *(Futuro)* Socket.io para multiplayer em tempo real

------------------------------------------------------------------------

## 📁 Estrutura do Projeto

    src/
      index.ts
      routes/
        rooms-routes.ts
      services/
        room-service.ts
      domain/
        room.ts

------------------------------------------------------------------------

## ▶️ Como rodar o projeto

### 1. Instale as dependências

``` bash
npm install
```

### 2. Inicie a API em modo desenvolvimento

``` bash
npm run dev
```

A API ficará disponível em:

    http://localhost:3000

------------------------------------------------------------------------

## 📡 Rotas disponíveis

### 🟢 Criar sala

**POST** `/rooms`

**Body:**

``` json
{
  "hostName": "Thiago"
}
```

**Retorno exemplo:**

``` json
{
  "id": "uuid",
  "code": "ABCD",
  "host": "Thiago",
  "players": ["Thiago"],
  "createdAt": "2025-01-10T14:21:00.000Z"
}
```

------------------------------------------------------------------------

### 🟠 Entrar na sala

**POST** `/rooms/:code/join`

**Body:**

``` json
{
  "playerName": "Fulano"
}
```

------------------------------------------------------------------------

### 🔵 Buscar informações da sala

**GET** `/rooms/:code`

------------------------------------------------------------------------

## 🧠 Lógica atual (MVP)

-   Rooms armazenadas **em memória** via `Map`
-   Cada sala contém:
    -   `id`
    -   `code` (4 letras)
    -   `host`
    -   `players`
    -   `createdAt`
-   Ainda sem limite de jogadores (será implementado)
-   Socket.io ainda não incluído (próxima etapa)

------------------------------------------------------------------------

## 📌 Roadmap

### ✔️ MVP 1 --- Rooms

-   [x] Criar sala\
-   [x] Entrar na sala\
-   [x] Consultar sala\
-   [x] Gerar códigos únicos\
-   [x] Estrutura inicial

### 🚧 MVP 2 --- Multiplayer (Socket.io)

-   [ ] Evento: player entrou/saiu\
-   [ ] Sincronização em tempo real\
-   [ ] Sala bloqueada após início

### 🚧 MVP 3 --- Partida

-   [ ] Baralho e cartas\
-   [ ] Distribuição\
-   [ ] Regras básicas do truco\
-   [ ] Efeitos do **Truco Maluco**\
-   [ ] Pontuação

### 🚀 Futuro

-   [ ] Ranking\
-   [ ] Estatísticas\
-   [ ] Histórico\
-   [ ] Modo 2x2\
-   [ ] Personalização de mesa

------------------------------------------------------------------------

## 🤝 Contribuições

Pull requests, issues e sugestões malucas para o jogo são super
bem-vindas!

------------------------------------------------------------------------

## 📄 Licença

MIT --- fique à vontade para usar e modificar.

------------------------------------------------------------------------

## 🧙 Autor

Desenvolvido por **Thiago Rossato**\
Backend do projeto **Truco Maluco** 🎲
