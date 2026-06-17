# Dental Clinic - Front-end

Este projeto é a interface web do sistema de Gestão de Consultas Odontológicas Cleanic. Ele foi desenvolvido utilizando Angular e fornece as telas para gerenciar pacientes, dentistas, especialidades e agendamentos, consumindo a API REST do back-end em Spring Boot.

---

## Tecnologias Utilizadas

* **Angular** (versão 19.2.25)
* **Angular Material** (Componentes de interface)
* **Tailwind CSS** (Estilização e layout)
* **Integração OAuth2 / JWT** (Controle de acesso e autenticação)

---

## Como Configurar e Executar o Projeto

### Pré-requisitos
* **Node.js** instalado na sua máquina.
* **Angular CLI** instalado globalmente (rode o comando `npm install -g @angular/cli`).
* Back-end do Cleanic rodando localmente (normalmente na porta `8080`).

### Servidor de Desenvolvimento
Para instalar as dependências e iniciar o servidor de desenvolvimento local, siga exatamente os passos abaixo:

1. Clone este repositório para a sua máquina local.
2. Abra o terminal na pasta raiz do projeto front-end.
3. Execute o comando **`npm install`** para baixar todas as dependências mapeadas no `package.json`.
4. Execute o comando **`ng serve`** para iniciar a aplicação.
5. Abra o seu navegador e acesse a URL **`http://localhost:4200/`**.

A aplicação será recarregada automaticamente em tempo real caso você altere e salve qualquer um dos arquivos de código-fonte.

---

## Geração de Componentes (Scaffolding)

O Angular CLI possui ferramentas nativas para agilizar a criação de arquivos. Para gerar um novo componente, utilize o comando:

> `ng generate component nome-do-componente`

Para visualizar a lista completa de esquemas de geração disponíveis (como services, directives, pipes ou guards), utilize o comando de ajuda:

> `ng generate --help`

---

## Build para Produção

Para compilar o projeto e prepará-lo para o ambiente de produção (deploy), execute:

> `ng build`

Este comando compila o seu projeto e armazena os arquivos estáticos e otimizados no diretório `dist/`. O build de produção otimiza automaticamente o código para garantir a melhor performance e velocidade de carregamento na web.
