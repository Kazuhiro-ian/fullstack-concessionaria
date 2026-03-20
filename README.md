# 🚗 AutoGestão - Sistema de Gerenciamento de Concessionária

![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-yellow)
![Java](https://img.shields.io/badge/Java-Spring_Boot-007396)
![Frontend](https://img.shields.io/badge/Frontend-Vanilla_JS-F7DF1E)

O **AutoGestão** é uma aplicação Full-Stack desenvolvida para administrar as operações diárias de uma concessionária de veículos. O sistema permite o controle total de estoque, gestão de clientes e funcionários, além de processar vendas com atualização automática de status e valores.

## 🌟 Funcionalidades Principais

O projeto é dividido em 4 módulos principais, cada um com sua própria identidade visual (Color Coding) para facilitar a navegação e a experiência do usuário (UX):

* **🚙 Veículos (Azul):** Cadastro de estoque, controle de preços e gestão de status (DISPONIVEL / VENDIDO).
* **👥 Clientes (Índigo):** Registro de compradores com validação de dados de contato e documentos.
* **👔 Funcionários (Teal/Azul Petróleo):** Gestão da equipe de vendas, cargos e matrículas.
* **💰 Vendas (Verde Esmeralda):** Módulo inteligente que cruza os dados dos três módulos anteriores.
    * *Filtro Inteligente:* Exibe apenas veículos com status DISPONIVEL.
    * *Preenchimento Automático:* Busca o preço oficial do veículo no banco de dados, impedindo alterações manuais no Front-end.
    * *Baixa de Estoque:* Ao confirmar a venda, o status do veículo é automaticamente atualizado para VENDIDO.

## 🛠️ Tecnologias Utilizadas

### Back-end
* **Java 17+**
* **Spring Boot** (Web, Data JPA)
* **Hibernate** (Mapeamento Objeto-Relacional)
* **Banco de Dados:** PostgreSQL
* **Padrões de Projeto:** RESTful API, MVC (Controller, Service, Repository), DTOs.
* **Segurança e Integridade:** Uso de @Transactional e Enums para controle de estados.

### Front-end
* **HTML5 & CSS3:** Sem frameworks. Utilização de Variáveis CSS (:root) para criação de um Design System escalável e padronizado.
* **JavaScript (Vanilla):** Consumo da API via Fetch API utilizando async/await e Promise.all para alta performance na montagem de formulários relacionais.

## 🚀 Como executar o projeto

### Pré-requisitos
* JDK 17+
* Maven
* IDE de sua preferência (IntelliJ, Eclipse, VS Code)
* Extensão Live Server (para o Front-end)

### Rodando o Back-end
1. Clone este repositório:
   git clone https://github.com/Kazuhiro-ian/fullstack-concessionaria

2. Navegue até a pasta da API (Back-end) e instale as dependências.
3. Configure o arquivo application.properties com as credenciais do seu banco de dados.
4. Execute o projeto Spring Boot. A API estará disponível em http://localhost:8080.

### Rodando o Front-end
1. Abra a pasta contendo os arquivos HTML, CSS e JS.
2. Abra o arquivo index.html (ou veiculos.html) no seu navegador ou utilize a extensão Live Server no VS Code para iniciar a aplicação.
3. Certifique-se de que o Back-end está rodando para que as requisições API funcionem corretamente.

## 💡 Aprendizados e Decisões de Arquitetura

* **Design System:** Foi criado um layout em "Cards" com Color Coding exclusivo para cada página, proporcionando uma interface profissional, limpa e responsiva.
* **UX em Formulários:** Implementação de campos <select> dinâmicos e campos readonly que respondem em tempo real às escolhas do usuário.
* **Tratamento de Exceções:** Bloqueio de deleção de clientes/funcionários com histórico de vendas atrelado (Restrição de Chave Estrangeira e erros 405/409/500 tratados via Front-end).

## 👨‍💻 Autor

Desenvolvido por **[Seu Nome/Seu Perfil]** LinkedIn: https://www.linkedin.com/in/seu-perfil/
E-mail: seu-email@dominio.com

---
*Este projeto foi desenvolvido com foco em aprimorar habilidades Full-Stack, arquitetura de software e design de interfaces.*