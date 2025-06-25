## Sistema de recomendação de disciplinas da grade de Ciência da Computação da UFRRJ - Backend

### informações
- Discente: Alexia Assumpção Rodrigues Pinto
- Aluna do ano de 2017
- Trabalho de Conclusão de Curso

### Como executar

#### Requisitos
- [Node](https://nodejs.org/en/download)
- [Docker(ou similar)](https://docs.docker.com/engine/install/)
- [Prisma](https://www.prisma.io/docs/guides)

#### Subindo banco de dados
- Criando o container
```
sudo docker run -p 5432:5432 --name docker-dev-postgres-2 -e POSTGRES_PASSWORD=postgres_docker -d postgres
```
-- Com este comando o banco de dados será criado com a imagem mais nova do `postgres`. Na porta `5432` com o nome do container sendo `docker-dev-postgres-2`, o nome de usuário sendo `postgres` e senha para acessar o banco sendo `postgres_docker`, o banco de dados será criado com o nome `postgres`.
- Para acessar o banco de dados utilizar a url:
```
jdbc:postgresql://localhost:5432/postgres
```
- Para verificar os containers
```
sudo docker ps --all
```
- Para startar um container com o banco de dados(para manter os dados antigos)
```
sudo docker start docker-dev-postgres-2
```
- Para remover um container 
```
sudo docker rm docker-dev-postgres-2
```
- Criar um arquivo com o nome `.env` na raiz do projeto com o conteúdo do arquivo `.env_template` alterando o valor para url do database que será utilizado
#### Preenchendo o banco de dados
- Para preencher o banco de dados com as disciplinas do Curso e os perfils de preferência é necessário executar o comando a seguir
```
npx prisma seed
```
- Para criar as questões executar o script que se encontra no arquivo `prisma/script_questions.sql`
-- É necessário atualizar os ids de acordo com os ids dos perfils de preferência
-- TODO: fazer o script como seed para facilitar a execução

#### Executando o projeto
- O projeto executa automaticamente na porta `3001` então é necessário que essa porta esteja livre.
- Na raiz do projeto, execute o comando
```
node app.js
```
- A seguinte mensagem deve aparecer no seu terminal
```
tcc-disciplines app listening on port 3001!
```
