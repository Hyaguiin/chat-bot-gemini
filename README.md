# 💰 _prometheus - Chatbot de Finanças com IA

<img src="assets/public/image/financa.png" alt="FinBot Logo" width="300" />

_prometheus é um chatbot inteligente voltado para finanças pessoais, integrado com a IA do **Google Gemini**. Ele ajuda os usuários a tirar dúvidas sobre dinheiro, orçamentos, investimentos e hábitos financeiros, com suporte a:

- Autenticação de usuários com JWT
- Integração com IA via API (Gemini)
- Criação, leitura, edição e exclusão de usuários
- Criptografia de senhas com bcrypt
- Middleware de autenticação
- Sistema de refresh token
- MongoDB para persistência de dados

---

## 🛠️ Tecnologias Utilizadas

| Tech            | Descrição                         |
|-----------------|-----------------------------------|
| **Node.js**     | Ambiente de execução JavaScript   |
| **Express**     | Framework Web para Node.js        |
| **TypeScript**  | Tipagem estática                  |
| **MongoDB**     | Banco de dados NoSQL              |
| **Mongoose**    | ODM para MongoDB                  |
| **JWT**         | Autenticação com tokens           |
| **BcryptJS**    | Criptografia de senhas            |
| **Gemini API**  | IA para interação financeira      |
| **Dotenv / Envalid** | Variáveis de ambiente com validação |

---

## 🚀 Como Rodar o Projeto

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/finbot.git
cd finbot
cd server
npm install
npx tsc
npm run dev
