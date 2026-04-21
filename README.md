# Product Requirements Document (PRD)

## Project Name: TaskForge

---

## 1. Overview

**TaskForge** is a simplified web-based project management tool inspired by Basecamp. The application focuses on implementing secure **session-based authentication** with a basic UI clone of a project management dashboard.

The primary goal of this project is to demonstrate:

- Backend authentication logic using sessions  
- Database connectivity using containerized environments (Docker)  
- Route protection and access control  
- Full-stack integration using HTML, CSS, JavaScript, and Node.js  

---

## 2. Objectives

- Implement **user authentication (Signup/Login)** using sessions  
- Establish a working **backend with Node.js**  
- Integrate a **database via Docker container**  
- Create a protected route (`/home`) accessible only after authentication  
- Simulate a **Basecamp-like UI** for demonstration purposes  

---

## 3. Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript

### Backend
- Node.js (Express.js)  

### Database
- Dockerized database (e.g., PostgreSQL / MySQL)  

### Authentication
- Session-based authentication (Express-session or similar)  

---

## 4. Features

### 4.1 Authentication System
- User Signup (`/signup`)  
- User Login (`/login`)  
- Password storage (hashed for security)  
- Session creation on successful login  
- Session destruction on logout  

### 4.2 Protected Route
- `/home` route accessible only to authenticated users  
- Unauthorized users redirected to `/login`  

### 4.3 UI Clone
- Static UI inspired by Basecamp dashboard  
- Includes:
  - Navigation bar  
  - Dummy project/task sections  
  - Placeholder content (non-functional)  

---

## 5. Functional Requirements

### 5.1 Signup
- User provides:
  - Username  
  - Email  
  - Password  
- Data stored in database  
- Password must be hashed before storing  

### 5.2 Login
- Validate user credentials  
- Create session upon successful login  
- Redirect to `/home`  

### 5.3 Session Management
- Maintain session using cookies  
- Store session data on server  
- Expire session after logout or timeout  

### 5.4 Route Protection
- Middleware checks:
  - If session exists → allow access  
  - Else → redirect to `/login`  

---

## 6. Non-Functional Requirements

- **Security:** Password hashing (e.g., bcrypt)  
- **Scalability:** Basic modular backend structure  
- **Usability:** Simple and clean UI  
- **Maintainability:** Organized folder structure  

---

## 7. System Architecture

### Flow

1. User visits `/signup` → registers  
2. User logs in via `/login`  
3. Server validates credentials  
4. Session is created  
5. User accesses `/home` (protected route)  
6. Middleware verifies session before rendering  

---

## 8. API Endpoints

| Route   | Method | Description           |
|---------|--------|-----------------------|
| /signup | POST   | Register new user     |
| /login  | POST   | Authenticate user     |
| /home   | GET    | Protected dashboard   |
| /logout | GET    | Destroy session       |

---

## 9. Database Schema (Basic)

### Users Table

- id (Primary Key)  
- username  
- email  
- password (hashed)  