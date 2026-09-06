<div align="center">

# 🎮 Rayman Origins Wiki

### Uma Wiki interativa dedicada ao universo de Rayman Origins

<br>

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge\&logo=html5\&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge\&logo=css3\&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge\&logo=javascript\&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge\&logo=bootstrap\&logoColor=white)](https://getbootstrap.com/)
[![JSON](https://img.shields.io/badge/JSON-000000?style=for-the-badge\&logo=json\&logoColor=white)](https://www.json.org/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge\&logo=github\&logoColor=white)](https://github.com/)

<br>

**Projeto acadêmico de Desenvolvimento Web**

</div>

---

<!--
📸 BANNER PRINCIPAL

Coloque aqui uma imagem horizontal do projeto.
Sugestão: 1200x400 ou 1200x500.

Exemplo:
![Rayman Origins Wiki Banner](./imagens/banner-readme.png)
-->

<div align="center">

![Preview do projeto](./imagens/banner-readme.png)

</div>

---

## 📖 Sobre o projeto

O **Rayman Origins Wiki** é uma aplicação web interativa desenvolvida como projeto acadêmico para a disciplina de **Desenvolvimento Web**.

A proposta é reunir informações sobre o universo de *Rayman Origins* em uma interface organizada e visualmente inspirada no jogo.

Além da consulta de conteúdo, a aplicação possui funcionalidades de usuário, favoritos, pesquisa e gerenciamento de informações através de operações CRUD.

> 🎯 **Objetivo:** aplicar conceitos de desenvolvimento front-end, manipulação do DOM, JavaScript, persistência de dados e construção de interfaces responsivas em uma aplicação funcional.

---

## 🖥️ Preview

<!--
📸 COLOQUE AQUI UMA SCREENSHOT DA HOME

Sugestão:
- Tire um print da página inicial inteira.
- Salve como `home.png`.
- Coloque dentro da pasta `imagens`.

![Página inicial](./imagens/home.png)
-->

<div align="center">

<img src="./imagens/home.png" width="85%" alt="Página inicial da Rayman Origins Wiki">

</div>

<br>

<!--
📸 OUTRAS TELAS

Você pode adicionar mais screenshots aqui:

<img src="./imagens/login.png" width="40%" alt="Tela de login">
<img src="./imagens/perfil.png" width="40%" alt="Tela de perfil">
-->

---

## ✨ Funcionalidades

<table>
<tr>
<td width="50%">

### 🔎 Pesquisa

Pesquisa dinâmica por nome e descrição das categorias disponíveis na Wiki.

</td>

<td width="50%">

### 📚 Wiki

Categorias, subcategorias e páginas de detalhes organizadas para facilitar a navegação.

</td>
</tr>

<tr>
<td width="50%">

### 👤 Usuários

Sistema de cadastro, login, sessão e perfil personalizado.

</td>

<td width="50%">

### ❤️ Favoritos

Usuários podem salvar conteúdos da Wiki como favoritos.

</td>
</tr>

<tr>
<td width="50%">

### 📝 CRUD

Usuários administrativos podem cadastrar, visualizar, editar e excluir conteúdos.

</td>

<td width="50%">

### 💾 Persistência

Dados e informações de usuário são armazenados utilizando JSON e `localStorage`.

</td>
</tr>
</table>

---

## 🧩 Tecnologias

<div align="center">

<img src="https://skillicons.dev/icons?i=html,css,js,bootstrap,git,github,vscode" alt="Tecnologias utilizadas">

</div>

<br>

| Tecnologia          | Utilização                               |
| ------------------- | ---------------------------------------- |
| 🌐 **HTML5**        | Estrutura das páginas                    |
| 🎨 **CSS3**         | Estilização e identidade visual          |
| ⚡ **JavaScript**    | Lógica e interatividade                  |
| 🅱️ **Bootstrap**   | Componentes e responsividade             |
| 📦 **JSON**         | Estruturação dos dados                   |
| 💾 **LocalStorage** | Persistência de informações no navegador |
| 🔧 **Git**          | Controle de versão                       |
| 🐙 **GitHub**       | Hospedagem do código                     |
| 💻 **VS Code**      | Ambiente de desenvolvimento              |

---

## ⚙️ Principais conceitos aplicados

<div align="center">

| 💡 Conceito               | Aplicação                                  |
| ------------------------- | ------------------------------------------ |
| **DOM**                   | Manipulação dinâmica dos elementos HTML    |
| **Eventos**               | Interações do usuário                      |
| **Fetch API**             | Carregamento dos dados JSON                |
| **JSON**                  | Organização das informações                |
| **LocalStorage**          | Persistência no navegador                  |
| **CRUD**                  | Gerenciamento dos conteúdos                |
| **Autenticação**          | Cadastro e login                           |
| **Renderização dinâmica** | Criação de elementos através do JavaScript |
| **Query Parameters**      | Navegação entre conteúdos                  |
| **Design Responsivo**     | Adaptação para diferentes telas            |

</div>

---

## 🏗️ Estrutura do projeto

```text
Rayman-origins-wiki/
│
├── meu-projeto/
│   │
│   ├── 🎵 audio/
│   │
│   ├── 📦 data/
│   │   └── dados.json
│   │
│   ├── 🖼️ imagens/
│   │
│   ├── 👤 foto-de-perfil/
│   │
│   ├── ⚡ js/
│   │   ├── app.js
│   │   ├── auth.js
│   │   ├── cadastrar.js
│   │   ├── detalhe-subitem.js
│   │   ├── detalhes.js
│   │   ├── inicial.js
│   │   └── perfil.js
│   │
│   ├── cadastro-itens.html
│   ├── cadastro.html
│   ├── detalhe-subitem.html
│   ├── index.html
│   ├── inicial.html
│   ├── login.html
│   ├── pagdetalhes.html
│   ├── perfil.html
│   │
│   ├── inicial.css
│   └── styles.css
│
└── README.md
```

---

## 🔄 Fluxo da aplicação

```text
             ┌───────────────┐
             │    Usuário    │
             └───────┬───────┘
                     │
                     ▼
             ┌───────────────┐
             │  Página Home  │
             └───────┬───────┘
                     │
          ┌──────────┼──────────┐
          ▼          ▼          ▼
      🔎 Pesquisa  📚 Wiki   👤 Login
          │          │          │
          │          │     ┌────┴────┐
          │          │     ▼         ▼
          │          │  Perfil    Favoritos
          │          │
          └──────┬───┘
                 ▼
          ┌───────────────┐
          │ Dados em JSON │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │ LocalStorage  │
          └───────┬───────┘
                  │
                  ▼
          ┌───────────────┐
          │ CRUD / Dados  │
          └───────────────┘
```

---

## 👤 Sistema de usuários

A aplicação possui um sistema de usuários desenvolvido em JavaScript.

### Cadastro

O usuário pode criar uma conta informando seus dados. As informações são armazenadas no navegador para permitir o login posteriormente.

### Login

Durante o login, os dados informados são comparados com os usuários armazenados e uma sessão é criada.

### Perfil

Usuários autenticados podem personalizar seu perfil através de:

* 👤 Avatar
* 📝 Biografia
* ❤️ Favoritos

---

## 📝 CRUD

A aplicação possui operações de **Create, Read, Update e Delete** para gerenciamento dos conteúdos da Wiki.

```text
CREATE
   ↓
Cadastrar novo conteúdo
   ↓
READ
   ↓
Visualizar conteúdo
   ↓
UPDATE
   ↓
Editar conteúdo
   ↓
DELETE
   ↓
Excluir conteúdo
```

As alterações são persistidas no `localStorage`.

---

## 🎞️ Demonstração

<!--
🎬 GIF / VÍDEO

Essa é uma das partes que mais deixa o README bonito.

Grave a tela navegando pela Wiki por 10–20 segundos,
salve como `demo.gif` e coloque na pasta imagens.

Exemplo:

![Demonstração](./imagens/demo.gif)
-->

<div align="center">

<img src="./imagens/demo.gif" width="85%" alt="Demonstração da aplicação">

</div>

---

## 📸 Galeria

### 🏠 Página inicial

<!-- SUBSTITUA PELO NOME DA SUA IMAGEM -->

<img src="./imagens/home.png" width="80%" alt="Página inicial">

### 🔐 Login

<img src="./imagens/login.png" width="45%" alt="Tela de login">

### 👤 Perfil

<img src="./imagens/perfil.png" width="45%" alt="Tela de perfil">

### 📚 Conteúdo da Wiki

<img src="./imagens/detalhes.png" width="80%" alt="Página de detalhes">

### 📝 Gerenciamento de conteúdos

<img src="./imagens/crud.png" width="80%" alt="Tela de gerenciamento">

---

## 🚀 Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/IloneLeticia/Rayman-origins-wiki.git
```

### 2. Entre na pasta

```bash
cd Rayman-origins-wiki/meu-projeto
```

### 3. Execute o projeto

Abra o arquivo:

```text
index.html
```

Para uma execução mais adequada, recomenda-se utilizar o **Visual Studio Code** com uma extensão de servidor local, como o **Live Server**.

---

## 📱 Responsividade

A interface utiliza componentes do **Bootstrap** e CSS responsivo para adaptar a aplicação a diferentes tamanhos de tela.

<!--
📸 Você pode colocar aqui um comparativo:

DESKTOP × MOBILE

<img src="./imagens/responsivo.png" width="80%">
-->

---

## 🎓 Contexto acadêmico

Este projeto foi desenvolvido para a disciplina de **Desenvolvimento Web**, durante a graduação em:

**Análise e Desenvolvimento de Sistemas — PUC Minas**

O desenvolvimento teve como foco a aplicação prática de conceitos de:

* desenvolvimento front-end;
* JavaScript;
* manipulação do DOM;
* JSON;
* LocalStorage;
* CRUD;
* responsividade;
* organização de projetos web.

---

## 🧠 O que foi desenvolvido

Durante o projeto foram trabalhados conceitos importantes de desenvolvimento web, incluindo a criação de uma aplicação com múltiplas páginas, comunicação entre HTML e JavaScript, manipulação dinâmica de dados, gerenciamento de estado no navegador e implementação de funcionalidades de usuário.

O projeto também permitiu trabalhar com organização de arquivos, versionamento utilizando Git e desenvolvimento colaborativo.

---

## 🔮 Possíveis melhorias

* [ ] Implementação de backend
* [ ] Banco de dados real
* [ ] Sistema de autenticação com maior segurança
* [ ] Hospedagem da aplicação
* [ ] Melhorias de acessibilidade
* [ ] Melhor organização da arquitetura JavaScript
* [ ] Responsividade aprimorada
* [ ] Sistema de comentários
* [ ] Avaliação dos conteúdos
* [ ] API própria para os dados da Wiki

---

## 👩‍💻 Autora

<div align="center">

### Ilone Letícia

**Análise e Desenvolvimento de Sistemas — PUC Minas**

<br>

<a href="https://github.com/IloneLeticia">
<img src="https://img.shields.io/badge/GitHub-IloneLeticia-181717?style=for-the-badge&logo=github">
</a>

<a href="https://www.linkedin.com/in/ilone-letícia-9736612b7/">
<img src="https://img.shields.io/badge/LinkedIn-Ilone%20Letícia-0A66C2?style=for-the-badge&logo=linkedin">
</a>

</div>

---

<div align="center">

### 🎮 Rayman Origins Wiki

*Projeto acadêmico desenvolvido para fins educacionais.*

<br>

⭐ **Se você gostou do projeto, considere deixar uma estrela!**

</div>
