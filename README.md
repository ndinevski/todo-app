# 📝 Todo App

This is a **Full-Stack Todo App** built with **React (TypeScript)** (frontend) and **Laravel** (backend).  
It allows users to **add, edit, delete, and mark tasks as complete**, using a REST API.

## Showcase

<p align="center">
  <img src="https://github.com/user-attachments/assets/96a15799-7aa3-40f8-a5b5-9fe365020742" width="30%" />
  <img src="https://github.com/user-attachments/assets/b2d32ff2-84a6-4dc0-9119-f6b0ce7418e1" width="30%" />
  <img src="https://github.com/user-attachments/assets/bf3acf5b-1e76-41e8-8332-241fa35860e3" width="30%" />
</p>

## 📌 Features

- CRUD operations for todos (Create, Read, Update, Delete)
- **Priority levels** (Low, Medium, High)
- **Due date tracking**
- **Real-time updates**
- **REST API (Laravel)**

---

## 🚀 Getting Started

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/YOUR_USERNAME/todo-app.git
cd todo-app
```

---

## 🖥️ Frontend (Vite + React)

### **📦 Install Dependencies**

```sh
cd frontend
npm install
```

### **▶️ Run the Frontend**

```sh
npm run dev
```

Frontend will be available at **`http://localhost:5173`**.

---

## 🛠️ Backend (Laravel API)

### **📦 Install Dependencies**

```sh
cd backend
composer install
```

### **⚙️ Set Up Environment**

1. Copy `.env.example` to `.env`:
   ```sh
   cp .env.example .env
   ```
2. Update `.env` file:
   ```
   APP_URL=http://localhost:8080
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=todo_db
   DB_USERNAME=root
   DB_PASSWORD=your_password
   ```

### **🛢️ Set Up Database**

```sh
php artisan migrate
```

### **▶️ Run the Backend**

```sh
php artisan serve
```

Backend API will be available at **`http://localhost:8080/api/tasks`**.

---

## 📡 API Endpoints

| Method   | Endpoint          | Description             |
| -------- | ----------------- | ----------------------- |
| `GET`    | `/api/tasks`      | Get all todos           |
| `POST`   | `/api/tasks`      | Create a new todo       |
| `PUT`    | `/api/tasks/{id}` | Update an existing todo |
| `DELETE` | `/api/tasks/{id}` | Delete a todo           |

---

## ✨ Technologies Used

- **Frontend**: Vite, React, TypeScript, TailwindCSS
- **Backend**: Laravel, MySQL

---

## 📄 License

MIT License. Feel free to use and modify.
