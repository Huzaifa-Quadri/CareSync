# 🏥 Doctor Appointment Booking System (MERN)

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Backend CI](https://img.shields.io/badge/Backend-Node.js-green)]()
[![Frontend CI](https://img.shields.io/badge/Frontend-React-blue)]()
[![MongoDB Atlas](https://img.shields.io/badge/Cloud_DB-MongoDB_Atlas-green)]()

---

## 📌 Project Overview

**CareSync** is a full-stack web application built on the **MERN Stack**: **MongoDB**, **Express.js**, **React.js**, and **Node.js**. It streamlines medical appointment booking for **Admins**, **Doctors**, and **Users** — with role-based dashboards, secure auth, image uploads, and appointment management.

The backend uses a **feature-based modular architecture**. The frontend is a single unified React app with feature-sliced structure covering both the patient-facing UI and the admin/doctor panel.

---

## 📋 Table of Contents

1. [Key Features](#key-features)
2. [Project Structure](#project-structure)
3. [Tech Stack](#tech-stack)
4. [Installation & Setup](#installation--setup)
5. [API Endpoints](#api-endpoints)
6. [Docker](#docker)
7. [Deployment](#deployment)
8. [Future Improvements](#future-improvements)
9. [Author](#author)

---

<a name="key-features"></a>
## 🚀 Key Features

### 👤 User Capabilities
- Secure **registration and login** with JWT authentication
- **Profile management** with photo upload
- **Appointment booking**, viewing, and cancellation
- Secure **online payment processing**

### 🩺 Doctor Capabilities
- Role-based **doctor login** and dashboard access
- **Appointment management**: view, confirm, complete, or cancel
- **Profile and professional detail updates** with image upload

### 🛠️ Admin Capabilities
- **Admin authentication** with elevated privileges
- **Doctor onboarding** with image uploads and role assignment
- **Toggle doctor availability** and manage platform compliance
- **Appointment analytics** and system dashboard

### 🔐 Security & Middleware
- **JWT-based token auth** for all roles (Admin, Doctor, User)
- **bcrypt** password hashing
- **Middleware-layered access control** per role
- **Cloudinary** CDN + **Multer** upload middleware
- Global **error handling** via `ApiError` utility and `errorHandler` middleware
- Standardized HTTP status codes and response structure

### 🌐 React Frontend
- Single unified app — patient UI + admin/doctor panel in one codebase
- Built with **React (Vite)** + **Tailwind CSS**, fully responsive
- **Feature-sliced architecture**: auth, appointment-system, admin-panel, shared
- **Axios**, **React Router**, **React Toastify**, **Framer Motion**
- Dark/light **theme toggle** with context

---

<a name="project-structure"></a>
## 📁 Project Structure

```
📦 Doctor-appointment-booking-system/
├── docker-compose.yml
├── Dockerfile
├── README.md
│
├── backend/                          # Express + Node.js + MongoDB
│   ├── server.js                     # Entry point
│   ├── dockerfile
│   ├── .env.example
│   └── src/
│       ├── app.js                    # Express app setup
│       ├── config/
│       │   ├── cloudinary.js
│       │   └── db.js
│       ├── features/                 # Feature-based modules
│       │   ├── admin/
│       │   │   ├── admin.controller.js
│       │   │   └── admin.routes.js
│       │   ├── appointment/
│       │   │   └── appointment.model.js
│       │   ├── doctor/
│       │   │   ├── doctor.controller.js
│       │   │   ├── doctor.model.js
│       │   │   └── doctor.routes.js
│       │   └── user/
│       │       ├── user.controller.js
│       │       ├── user.model.js
│       │       └── user.routes.js
│       ├── middlewares/
│       │   ├── auth.admin.js
│       │   ├── auth.doctor.js
│       │   ├── auth.user.js
│       │   ├── errorHandler.js
│       │   └── multer.js
│       └── utils/
│           └── ApiError.js
│
└── frontend/                         # React + Vite (unified app)
    ├── index.html
    ├── vite.config.js
    ├── nginx.conf
    ├── vercel.json
    ├── dockerfile
    ├── .env.example
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── index.css
        ├── assets/
        │   ├── admin/
        │   └── frontend/
        ├── features/
        │   ├── admin-panel/          # Admin & doctor dashboard
        │   │   ├── components/       # AdminNavbar, Sidebar, DoctorCard
        │   │   ├── context/          # admin.context, doctor.context
        │   │   ├── hook/             # admin.hook, doctor-panel.hook
        │   │   ├── pages/
        │   │   │   ├── admin/        # AddDoctor, AllAppointments, Dashboard, DoctorsList
        │   │   │   └── doctor/       # DoctorAppointments, DoctorDashboard, DoctorProfile
        │   │   └── service/          # admin.api, doctor-panel.api
        │   ├── appointment-system/   # Patient-facing UI
        │   │   ├── components/       # Banner, Hero, DoctorCard, SpecialityMenu, etc.
        │   │   ├── context/          # appointment.context
        │   │   ├── hook/             # appointment.hook
        │   │   ├── pages/            # Home, Doctors, Appointment, Appointments, About, Contact, Profile
        │   │   └── service/          # appointment.api
        │   └── auth/                 # Authentication
        │       ├── context/          # auth.context
        │       ├── hook/             # auth.hook
        │       ├── pages/            # Login, AdminLogin, NotFound, NotAuthorized
        │       └── service/          # auth.api
        └── shared/
            ├── components/           # Navbar, Footer, ScrollToTop, ThemeToggle, animations
            ├── context/              # app.context, theme.context
            ├── layouts/              # UserLayout, AdminLayout, DoctorLayout
            ├── lib/                  # motion.js
            └── theme/               # themes.js
```

---

<a name="tech-stack"></a>
## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express.js** – API and server logic
- **MongoDB + Mongoose** – Database & data modeling
- **JWT** – Role-based authentication
- **bcrypt** – Secure password hashing
- **Cloudinary** – Image hosting
- **Multer** – File upload handling
- **dotenv** – Environment variable management
- **cors** – Cross-origin resource sharing

### Frontend
- **React** – Component-based UI
- **Vite** – Fast build tool
- **Tailwind CSS** – Utility-first styling
- **Axios** – HTTP client
- **React Router** – SPA routing
- **React Toastify** – Notifications
- **Framer Motion** – Animations

### DevOps
- **Docker** + **Docker Compose** – Containerized development and deployment
- **Nginx** – Frontend static file serving in production

---

<a name="installation--setup"></a>
## 🔧 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary account](https://cloudinary.com/)

### 1. Clone the repository

```bash
git clone https://github.com/huzaifaquadri/doctor-appointment-booking-system.git
cd doctor-appointment-booking-system
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` (see `.env.example`):

```env
PORT=8000
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/<dbname>
JWT_SECRET=<your_secret>
CLOUDINARY_NAME=<name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
ADMIN_EMAIL=<email>
ADMIN_PASSWORD=<pass>
```

Start dev server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

Create `.env` (see `.env.example`):

```env
VITE_BACKEND_URL=http://localhost:8000
```

Start dev server:

```bash
npm run dev
```

### 4. Test Full Flow

1. **Admin**: login → add doctors → manage availability
2. **Doctor**: login → manage appointments → update profile
3. **User**: register/login → update profile → book/cancel appointments

---

<a name="api-endpoints"></a>
## 🌐 API Endpoints

### 👤 User Routes (`/api/user`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/register` | Register new user |
| POST | `/login` | Login and return token |
| GET | `/get-profile` | Get logged-in user profile |
| POST | `/update-profile` | Update profile with image |
| POST | `/book-appointment` | Book appointment |
| GET | `/appointments` | List user appointments |
| POST | `/cancel-appointment` | Cancel booking |
| POST | `/make-payment` | Process payment |

### 🩺 Doctor Routes (`/api/doctor`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/list` | Get all doctors |
| POST | `/login` | Doctor login |
| GET | `/appointments` | View doctor appointments |
| POST | `/complete-appointment` | Mark as complete |
| POST | `/cancel-appointment` | Cancel appointment |
| GET | `/dashboard` | Doctor dashboard metrics |
| GET | `/profile` | Get doctor profile |
| POST | `/update-profile` | Update doctor profile |

### 🛠️ Admin Routes (`/api/admin`)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | Admin login |
| POST | `/add-doctor` | Add new doctor with image |
| GET | `/all-doctors` | View all registered doctors |
| POST | `/change-availability` | Toggle doctor availability |
| GET | `/appointments` | View all appointments |
| POST | `/cancel-appointment` | Cancel any appointment |
| GET | `/dashboard` | Admin dashboard metrics |

---

<a name="docker"></a>
## 🐳 Docker

Run full stack with Docker Compose:

```bash
docker-compose up --build
```

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`

Individual containers:

```bash
# Backend
cd backend && docker build -t caresync-backend .

# Frontend
cd frontend && docker build -t caresync-frontend .
```

---

<a name="deployment"></a>
## 📦 Deployment

- **Backend**: Render, Railway, or DigitalOcean — set all `.env` vars on platform
- **Frontend**: Vercel or Netlify — `vercel.json` already configured
- **Database**: MongoDB Atlas
- **Images**: Cloudinary

---

<a name="future-improvements"></a>
## 🚀 Future Improvements

- Email notifications for bookings and cancellations
- Real payment gateway integration (Stripe/Razorpay)
- Doctor availability calendar view
- Pagination and filtering for appointments
- Unit and integration test suite (Jest + Supertest)

---

<a name="author"></a>
## 👨‍💻 Author

**Huzaifa Quadri**

- 📧 Email: [huzaifaquadri1853@gmail.com](mailto:huzaifaquadri1853@gmail.com)
- 💻 [GitHub](https://github.com/huzaifaquadri)

---

### Happy Coding! 🚀
