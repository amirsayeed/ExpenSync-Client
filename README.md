# 📊 ExpenSync

## 🔎 Project Purpose

A **personal expense tracking system** that helps users manage their daily expenses securely. Users can log in/register, add expenses, filter by categories, and view their financial history in a structured way.

---

## 🌐 Project Links

- **Live Demo:** [ExpenSync Live](https://expensync-cbe44.web.app/)
- **Server URL:** [ExpenSync Server](https://expensync-server.onrender.com/)
- **Server Repository:** [GitHub - ExpenSync Server](https://github.com/amirsayeed/ExpenSync-Server)

---

## ⚡ Tech Stack

### Frontend

- ⚛️ **React.js (Vite)** – UI framework
- 🌐 **React Router DOM** – routing
- 🎨 **Tailwind CSS + DaisyUI** – styling
- 🔑 **Firebase Authentication** – secure login/register
- 🔗 **Axios / Fetch API** – data fetching

### Backend

- 🟢 **Node.js + Express.js** – server framework
- 🍃 **MongoDB (Atlas)** – database
- 🔒 **Firebase Admin SDK** – token verification
- 🔧 **Cors + Dotenv** – environment & security
- 🚀 **Render** – backend deployment

---

## 🌟 Key Features

- 🔐 **Authentication**: Firebase login/registration
- 🏠 **Private Homepage**: Only accessible after login
- 💸 **Expense Management**: Add, update, delete, and list expenses
- 📂 **Filter**: Filter expenses by category
- 📊 **Secure API**: Protected routes using Firebase token verification
- 🚀 **Deployed**: Backend on **Render**, frontend on **Firebase**

---

## 📦 Major NPM Packages

### Frontend

- react-router-dom
- @tanstack/react-query
- firebase
- axios
- date-fns
- react-toastify
- sweetalert2
- recharts
- daisyui

### Backend

- express
- mongodb
- firebase-admin
- nodemon
- cors
- dotenv

## 🛠 Local Development Setup

### 1.Clone both client and server repos:

```bash
git clone https://github.com/amirsayeed/ExpenSync-Client
git clone https://github.com/amirsayeed/ExpenSync-Server
```

### 2.Setup the server::

```bash
cd ExpenSync-Server
npm install
```

### 3.Create a .env file in the server root with the following:

```bash
DB_USER=your_mongodb_user
DB_PASS=your_mongodb_password
```

### 4.Then start the server using:

```bash
nodemon index.js
```

The server will run on: http://localhost:5000

### 5.Setup the client:

```bash
cd ../ExpenSync-Client
npm install
```

### 6. Create a .env.local file in the root of the client directory:

```bash
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 7.Then start the client:

```bash
npm run dev
```

The client will run at: http://localhost:5173
