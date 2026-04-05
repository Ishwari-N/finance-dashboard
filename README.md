# 💰 Role-Based Finance Dashboard Backend

A logically structured Node.js & Express.js API designed for a finance management system. This application supports financial record tracking (Income/Expenses) with strict permission logic based on user roles.

---

## 🛠️ Tech Stack & Architecture

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL (Relational)
- **Architecture:** Service-based architecture for clean separation of concerns.
- **Security:** Custom Role-Based Access Control (RBAC) Middleware.

---

## 🚀 Quick Start Guide

### 1. Clone & Install
```bash
git clone https://github.com/Ishwari-N/finance-dashboard.git
cd finance-dashboard
npm install


📡 API Endpoints
👤 User Management
POST /api/users/register: Register a new user (Roles: ADMIN, ANALYST, or VIEWER).

📊 Financial Records
POST /api/records/add: Create a new financial entry (Admin only).

GET /api/records/:userId: Get all records for a specific user.

PUT /api/records/:id: Update an existing record (Admin only).

DELETE /api/records/:id: Permanently remove a record (Admin only).

📈 Dashboard Summary
GET /api/records/report/:userId: Returns totalIncome, totalExpense, and balance (Analyst/Admin only).