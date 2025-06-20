# 🔐 KeySync – Lightweight, Secure Password Management Without Sign-Up

KeySync is an open-source password manager that lets users **securely store and retrieve passwords without needing to create an account**. Built for speed, privacy, and ease of use, KeySync eliminates unnecessary friction while ensuring encrypted password storage.

> 🚫 No accounts. 🔐 Strong security. ⚡ Fast access.

---

## ✨ Features

- 🔐 **Secure Password Storage** – Save your passwords with strong encryption.
- 🆓 **No Account Creation Required** – Skip registration and logins entirely.
- 🧠 **Simple and Fast UI** – Clean and intuitive interface for quick password management.

---

## 🧰 Technology Stack

| Layer      | Technology         |
|------------|--------------------|
| Frontend   | [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) |
| Backend    | [Node.js](https://nodejs.org/) (Express.js) |
| Database   | [MongoDB](https://www.mongodb.com/) |

---

## ✅ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [MongoDB](https://www.mongodb.com/) (local or cloud, e.g. MongoDB Atlas)
- [Git](https://git-scm.com/)

---

## 📦 Installation Steps

1. **Clone the Repository**

git clone https://github.com/Abou-bakar/keysync-mongo.git
cd keysync

2. **Install Frontend Dependencies**

npm install

3. **Install Backend Dependencies**

cd ../server
npm install
⚙️ Configuration
In the server folder, create a .env file with the following content:

PORT=3000
MONGODB_URI=your-mongodb-uri
ENCRYPTION_SECRET=your-secret-key
The ENCRYPTION_SECRET will be used to encrypt/decrypt sensitive data. Keep it safe.

🏃 Running the Application
Backend (API Server):

cd backend
node --watch server.js

Frontend (React App):
npm run dev

Visit the frontend at http://localhost:5173
Backend runs on http://localhost:3000
