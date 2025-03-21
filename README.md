# Automacao de Testes com Playwright

### Sobre o Projeto

O objetivo é criar uma suite de testes automatizados para a aplicação web [Sauce Demo](https://www.saucedemo.com/) utilizando **Playwright**.

### Tecnologias Utilizadas

- **Playwright** - Ferramenta de automação de testes para navegadores.
- **Node.js** - Ambiente de execução para JavaScript.
- **javascript** - Linguagem de programação usada como base

### Configuração e Execução do projeto

### 1️⃣ Clonar o Repositório
```bash
git clone https://github.com/ordepMendes/playwright-sauce-demo.git
```

### 2️⃣ Instalar Dependências
```bash
npm install
```

### 3️⃣ Executar os Testes
```bash
npx playwright test
```

Para abrir o relatório de execução:
```bash
npx playwright show-report
```

## 🔍 Casos de Teste - Login

| ID   | Caso de Teste                              | Passos | Resultado Esperado |
|------|-------------------------------------------|--------|--------------------|
| TC01 | Login com credenciais válidas            | 1. Inserir `standard_user` 2. Inserir `secret_sauce` 3. Clicar em "Login" | Usuário é redirecionado para a página de inventário |
| TC02 | Login com credenciais inválidas          | 1. Inserir `teste` 2. Inserir `erro123` 3. Clicar em "Login" | Mensagem de erro: *"Username and password do not match any user in this service"* |
| TC03 | Login com usuário bloqueado              | 1. Inserir `locked_out_user` 2. Inserir `secret_sauce` 3. Clicar em "Login" | Mensagem de erro: *"Sorry, this user has been locked out."* |
| TC04 | Login sem preencher o campo de senha     | 1. Inserir `standard_user` 2. Deixar senha em branco 3. Clicar em "Login" | Mensagem de erro: *"Password is required"* |
| TC05 | Login sem preencher o campo de usuário   | 1. Deixar usuário em branco 2. Inserir `secret_sauce` 3. Clicar em "Login" | Mensagem de erro: *"Username is required"* |
| TC06 | Acessar a página sem estar logado        | 1. Navegar diretamente para `/inventory.html` sem login | Usuário é redirecionado para a tela de login com erro: *"You can only access '/inventory.html' when you are logged in."* |
| TC07 | Login sem preencher nenhum campo         | 1. Clicar em "Login" sem preencher nada | Mensagem de erro: *"Username is required"* |

---

## 🔍 Casos de Teste - Detalhes do produto

| ID   | Caso de Teste                              | Passos | Resultado Esperado |
|------|-------------------------------------------|--------|--------------------|
| TC01 | Retorno para a página de inventário       | 1. Na página de detalhes do item, clicar no botão de retorno (ID: `#back-to-products`) | URL deve conter `/inventory.html`, retornando para a página de inventário |
| TC02 | Navegação para a página de carrinho       | 1. Na página de detalhes do item, clicar no link do carrinho (ID: `[data-test="shopping-cart-link"]`) | URL deve ser `https://www.saucedemo.com/cart.html`, acessando a página de carrinho |
| TC03 | Verificar badge do carrinho após adicionar item | 1. Na página de inventário, clicar em "Add to cart" (ID: `[data-test="add-to-cart"]`) | O badge do carrinho (ID: `[data-test="shopping-cart-badge"]`) deve exibir `1`, indicando que o item foi adicionado |

---

## 🔍 Casos de Teste - Inventory

### Navegação

| ID   | Caso de Teste                                       | Passos | Resultado Esperado |
|------|-----------------------------------------------------|--------|--------------------|
| TC01 | Logout e navegação para a tela de login            | 1. Clicar no menu de hambúrguer (ID: `#react-burger-menu-btn`) 2. Clicar em "Logout" (ID: `#logout_sidebar_link`) | O usuário é redirecionado para a página de login (`https://www.saucedemo.com/`) |
| TC02 | Navegação para a página de "Sobre"                 | 1. Clicar no menu de hambúrguer (ID: `#react-burger-menu-btn`) 2. Clicar em "About" (ID: `#about_sidebar_link`) | A página deve ser redirecionada para `https://saucelabs.com/` |
| TC03 | Navegação para a página do carrinho               | 1. Clicar no link do carrinho (ID: `[data-test='shopping-cart-link']`) | O usuário é redirecionado para `https://www.saucedemo.com/cart.html` |
| TC04 | Navegação para a página de detalhes do produto    | 1. Clicar no link do primeiro produto (ID: `a[data-test$='-title-link']`) | O URL deve conter `/inventory-item.html` e mostrar os detalhes do produto |

### Funcionalidade da Tela Inventory

| ID   | Caso de Teste                                       | Passos | Resultado Esperado |
|------|-----------------------------------------------------|--------|--------------------|
| TC05 | Adicionar um item ao carrinho                      | 1. Clicar no botão de adicionar ao carrinho (ID: `button[data-test$="add-to-cart-sauce-labs-backpack"]`) | O badge do carrinho (ID: `[data-test$="shopping-cart-badge"]`) deve exibir `1` |
| TC06 | Adicionar todos os itens ao carrinho               | 1. Clicar em cada botão de adicionar ao carrinho (ID: `.btn_inventory`) | O badge do carrinho (ID: `[data-test="shopping-cart-badge"]`) deve exibir o número total de itens adicionados |
| TC07 | Ordenar produtos pelo filtro Z - A                 | 1. Selecionar a opção "Z-A" no dropdown de ordenação (ID: `.product_sort_container`) | O valor selecionado no dropdown deve ser `za` |

---

