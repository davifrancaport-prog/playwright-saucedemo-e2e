# Playwright E2E — SauceDemo 🛒

> Suite de testes automatizados E2E para o SauceDemo, usando Playwright com Page Object Model e CI via GitHub Actions.

![CI](https://github.com/SEU_USUARIO/SEU_REPOSITORIO/actions/workflows/e2e.yml/badge.svg)

## Tecnologias

- [Playwright](https://playwright.dev/) 1.44+
- Page Object Model (POM)
- GitHub Actions (CI/CD)
- HTML Reporter nativo

## Fluxos Testados

| Módulo     | Cenários                                                    |
|------------|-------------------------------------------------------------|
| Login      | Válido, inválido, usuário bloqueado, campos vazios          |
| Inventário | Listagem, ordenação, adicionar ao carrinho                  |
| Carrinho   | Adicionar, remover, múltiplos itens                         |
| Checkout   | Fluxo completo, campos obrigatórios, valor total            |

## Browsers

Os testes rodam em **Chromium**, **Firefox** e **WebKit** (Safari) por padrão.

## Como Rodar

### Pré-requisitos
- Node.js 20+
- npm

### Instalação

```bash
npm install
npx playwright install
```

### Rodar todos os testes

```bash
npm test
```

### Rodar com interface visual (UI Mode)

```bash
npm run test:ui
```

### Rodar com browser visível

```bash
npm run test:headed
```

### Rodar em um browser específico

```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Debugar um teste

```bash
npm run test:debug
```

### Ver relatório HTML

```bash
npm run report
```

## Estrutura

```
playwright-saucedemo/
├── tests/       → Specs dos testes
├── pages/       → Page Objects
└── fixtures/    → Dados de teste (usuários, checkout)
```

## CI

O workflow roda automaticamente em todo push para `main` e `develop`.
O relatório HTML e os traces de falha são salvos como artefatos por 7 dias.
