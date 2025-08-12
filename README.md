# A2 Developers Backend

## Overview
A2 Developers Backend is a Node.js + Express.js based REST API designed to handle form submissions and store them securely in a MongoDB database. The project follows a clean, scalable, and maintainable architecture aligned with industry standards and best practices, ensuring reliability and ease of future enhancements.

---

## Features
- **Form Submission API** – Securely saves user details including name, email, contact number, institution name, and requirements.
- **Form Retrieval API** – Fetches all submitted form data in descending order by date.
- **Centralized Error Handling** – Custom middleware to handle and log all server-side errors gracefully.
- **Environment-based Configuration** – Sensitive data managed through `.env` file for security.
- **MongoDB Integration** – Utilizes Mongoose ODM for schema-based, efficient database operations.
- **CORS Enabled** – Ensures secure and controlled cross-origin resource sharing.

---

## Tech Stack
- **Runtime:** Node.js  
- **Framework:** Express.js  
- **Database:** MongoDB with Mongoose ODM  
- **Utilities:** Body-Parser, CORS, Dotenv, Nodemon  

---

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/adarsh23012003/a2developers-backend.git
cd a2developers-backend

npm install

npm run dev
