# :dart: Projeto Trybe Futebol Clube
Projeto desenvolvido no módulo 28, durante o módulo de back-end no curso de desenvolvimento web da Trybe.


## :brain: Habilidades

Construir um back-end usando ORM com o pacote sequelize do npm, para ser consumido pelo frontend:

- Criar e associar tabelas usando models do sequelize
- Construir endpoints para consumir os models que criar
- Fazer um CRUD com o ORM


## :wrench: O que foi desenvolvido

Neste projeto foi construído um back-end dockerizado utilizando modelagem de dados através do Sequelize. O desenvolvimento deve respeitar as regras de negócio providas no projeto e sua API deve ser capaz de ser consumida por um front-end já previamente implementado nesse projeto.

O back-end implementa as regras de negócio para popular adequadamente a tabela disponível no front-end que é exibida para a pessoa usuária do sistema.


## :dart: Instruções para visualizar o projeto:

  - Realizar o git clone, com o comando `git clone git@github.com:marianasaraiva/trybe-TFC.git`;

  - Realizar o `npm install`;

  - Opção 01: 
    - Criar arquivo `.env` na raiz do projeto;
    - Setar as variavéis de ambiente no arquivo `.env`, ou renomeiar o arquivo `.env.example` para `.env`
    ```
      PORT=3001
      DB_USER=root
      DB_PASS=123456
      DB_NAME=TRYBE_FUTEBOL_CLUBE
      DB_HOST=localhost
      DB_PORT=3002
    ```

  - Opção 02:
    - Ter o ambiente configurado com docker.
    - Executar o comando `npm run compose:up`.

  
Documentação da API: 
