<p align="center">
    <img src="./src/assets/img/argentBankLogo.png" alt="ArgentBank Logo" width="300"/>
</p>

# ArgentBank 💲 🏛️

ArgentBank is a modern banking application built with **React + Vite**.  
It allows users to securely log in, view their profile information, and manage their transactions through a simple and intuitive interface.

---

<div align="center">
<!-- Languages / Formats -->
<img src="https://img.shields.io/badge/HTML5-E34F26?style=plastic&logo=html5&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=plastic&logo=css3&logoColor=white"/>
<img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=plastic&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/JSX-323330?style=plastic&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/JSON-000000?style=plastic&logo=json&logoColor=white"/>

<br/>

<!-- Frameworks / Library -->
<img src="https://img.shields.io/badge/React-19.1.0-61DAFB?style=plastic&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/React_DOM-19.1.0-61DAFB?style=plastic&logo=react&logoColor=white"/>
<img src="https://img.shields.io/badge/React_Router-7.7.1-CA4245?style=plastic&logo=react-router&logoColor=white"/>
<img src="https://img.shields.io/badge/PropTypes-15.8.1-323330?style=plastic&logo=javascript&logoColor=F7DF1E"/>

<br/>

<!-- Tools / Environnements (optionnels) -->
<img src="https://img.shields.io/badge/Node.js-18+-339933?style=plastic&logo=nodedotjs&logoColor=white"/>
<img src="https://img.shields.io/badge/NPM-CB3837?style=plastic&logo=npm&logoColor=white"/>
<img src="https://img.shields.io/badge/React_Redux-9.2.0-8A2BE2?style=plastic&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Redux_Toolkit-2.8.2-593D88?style=plastic&logo=redux&logoColor=white"/>
<img src="https://img.shields.io/badge/Yarn-1.22.22-2C8EBB?style=plastic&logo=yarn&logoColor=white"/>

<br/>

<!-- Outils / Build -->
<img src="https://img.shields.io/badge/Vite-7.1.2-646CFF?style=plastic&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/ESLint-9.33.0-4B32C3?style=plastic&logo=eslint&logoColor=white"/>

<!-- License -->
<a href="./LICENSE">
  <img src="https://img.shields.io/badge/License-MIT-blue?style=plastic"/>
</a>

</div>

<br/>

<div align="center">
    <!-- Maquette -->
    <img src="./src/assets/img/Capture d’écran ProfilePage.png" alt="ArgentBank ProfilePage Dashboard" width="700"/>
</div>

<div align="center">

<br/>

<a href="">
  🌐 ArgentBank Démo 🌐
</a>
</div>

---

## 🎯 Project objectives
- Enable **secure login** for users (JWT-based authentication).
- Display the **Profile page** with personal user information.
- Allow **editing of the user’s display name**.
- (Phase 2) Development of the **Transactions** section:
  - View all monthly transactions
  - View details of a specific transaction
  - Extend API with **OpenAPI/Swagger documentation**

---

## 🧩 Stack & Principes
- **React + Vite** (SPA)
- **React Router** (navigation)
- **Redux Toolkit** (state management)
- **PropTypes** (runtime typing)
- **ESLint** (quality)

---

## 🚀 Installation & Launch

### 1) Frontend (React + Vite)

```bash
# Clone repository
git clone https://github.com/Tigershark936/argent-bank-frontend.git
cd argent-bank-frontend

# Install dependencies
npm install

# Start project
npm run dev

👉 Frontend available at: http://localhost:5173
``` 

---

### 2) Backend (Argent Bank API)

The official backend is provided by OpenClassrooms:

📂 [Argent Bank Back-End](https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API)

Prérequis backend :
- Node.js v12+
- MongoDB Community Server

Lancement backend :

```bash
# Clone backend repository
git clone https://github.com/OpenClassrooms-Student-Center/Project-10-Bank-API.git
cd Project-10-Bank-API

# Install dependencies
npm install

# Start development server
npm run dev:server

# Seed database with 2 demo users
npm run populate-db

👉 Backend available at: http://localhost:3001
```

Demo users created by default:

- Tony Stark → tony@stark.com / password123
- Steve Rogers → steve@rogers.com / password456

---
## 🔗 API Documentation (Swagger)

Once the backend is running, the Swagger API documentation is available at:

👉 http://localhost:3001/api-docs

---

## 📡 Endpoints disponibles (Phase 1)

Authentication

- POST /api/v1/user/login → User login (JWT)
- POST /api/v1/user/signup → User signup

User Profile

- POST /api/v1/user/profile → Get user profile (requires token)
- PUT /api/v1/user/profile → Update user profile (requires token)

---

## 📡 API – Phase 2: Transactions

For phase 2 of the project, an extended API proposal was documented in OpenAPI 3.0.4.

👉 Full documentation: [openapi.yaml](./openapi.yaml)

Goals:

- View all transactions for the current month, grouped by account.
- View transaction details.
- Update a transaction (category and note).

---

## 🔑 Security

All routes require Bearer JWT authentication:

```http
Authorization: Bearer <token>
```

---

## 🛠️ Defined Endpoints

#### 1. Lister les transactions du mois

```bash
GET /api/v1/transactions?month=YYYY-MM
```

- Query param:
  - month (optional) → format YYYY-MM (default = current month)

#### 2. Transaction details

```bash
GET /api/v1/transactions/{id}
```
- Query param:
  - id → Unique transaction ID (ex: tr_666)

#### 3. Update transaction

```bash
PATCH /api/v1/transactions/{id}
```

- Request body (example):

```json 
{
  "category": "Food",
  "note": "Resto du week-end"
}
```

---

## 📦 Data Schemas

### Transaction

```json
{
  "id": "tr_666",
  "date": "2025-09-01T12:15:30Z",
  "description": "Golden Sun Bakery",
  "amount": 20.00,
  "balance": 2097.79,
  "category": "Food",
  "note": "Resto du Week-end",
  "account": {
    "id": "acc_987"
  }
}

```

### Monthly transactions (example response)

```json
[
  {
    "id": "tr_666",
    "date": "2025-09-01T12:15:30Z",
    "description": "Golden Sun Bakery",
    "amount": 20.00,
    "balance": 2097.79,
    "category": "Food",
    "note": "Resto du Week-end",
    "account": {
      "id": "acc_987"
    }
  },
  {
    "id": "tr_667",
    "date": "2025-09-02T09:10:15Z",
    "description": "Supermarché Casino",
    "amount": 45.00,
    "balance": 2052.79,
    "category": "Groceries",
    "note": ""
  }
]
```

---

## 🗂️ Project Structure (Frontend)

```
argent-bank-frontend/
├── public/                 # Static files
├── src/
│   ├── assets/             # Images & icons
│   ├── components/         # Reusable UI components (Header, Footer, Layout…)
│   ├── features/           # Redux slices (user, authStatus)
│   ├── hooks/              # Custom hooks (useFetch)
│   ├── pages/              # Main pages (Home, Login, ProfilePage)
│   │   ├── Home/           # Home page
│   │   ├── Login/          # Login page
│   │   └── ProfilePage/    # Profile page
│   ├── store/              # Redux store configuration
│   ├── App.jsx             # Root component
│   ├── main.jsx            # React entry point
│   └── router.jsx          # Route configuration
├── .env                    # Environment variables
├── eslint.config.js        # ESLint configuration
├── vite.config.js          # Vite configuration
├── package.json
└── README.md
```

---

## 🔒 License

This project is licensed under the MIT License – see [LICENSE](./LICENSE) for details.

---

## 👤 Author

Alain
Mon GitHub: [ ⚡Retrouvez-moi sur GitHub ⚡](https://github.com/Tigershark936)