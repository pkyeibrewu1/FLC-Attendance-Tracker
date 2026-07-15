## First Love Church Attendance Tracker

A full-stack attendance tracking web app for First Love Church Atlanta. 
The project includes a responsive client-side frontend for members and administrators, 
plus a Node.js/Express backend that stores attendance and member data with Prisma and PostgreSQL.
The application was designed to replace manual attendance processes with an organized digital solution.

## Features

- Member-facing pages for browsing the church site and attendance flow
- Attendance recording for members (Allow Admin to add,edit,delete and search members.)
- Member profile and management views
- Admin login page with secure server-side password verification
- Backend API routes for members and attendance
- Prisma ORM integration with PostgreSQL
- Moile-friendly interface
- Prevent duplicate attendance entry

## Project Structure

- client/ - Static frontend pages and scripts
  - index.html - Home page
  - attendance.html - Attendance page
  - profile.html - Member profiles page
  - administration.html - Admin login page
  - css/ - Stylesheets
  - js-scripts/ - Frontend JavaScript
  - images/ - Static assets
- server/ - Backend API and database layer
  - src/ - Express server, routes, database connection, and utilities
  - prisma/ - Prisma schema and migrations
  - package.json - Backend dependencies and scripts

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: PostgreSQL via Prisma ORM
- Authentication: bcrypt for password hashing
- Deployment: Render, GitHub

## Prerequisites

Make sure you have installed:
- Node.js
- npm
- PostgreSQL database

## Setup

1. Clone the repository
```
git clone <repository-url>
cd FLC-Attendance-Tracker-main
```
2. Install server dependencies
```
cd server
npm install
```
3. Configure environment variables

Create a .env file in the server directory with at least:

```env
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
ADMIN_USERNAME="FLC Atlanta"
ADMIN_PASSWORD_HASH="<bcrypt-hash>"
```

4. Generate Prisma client

```bash
npm run build
```

5. Run the server

```bash
npm run dev
```

The backend will start on port 5000.

## 📌 Future Improvements

- Export attendance to Excel
- Export attendance to PDF
- QR code attendance
- Email notifications
- Multiple administrator accounts
- Role-based permissions
- Analytics dashboard

---

## 👩‍💻 Author

**Pamela Kyei Brewu**

- Mathematics Major (Applied Mathematics)
- Computer Science Minor
- Georgia State University

GitHub:
https://github.com/pkyeibrewu1
