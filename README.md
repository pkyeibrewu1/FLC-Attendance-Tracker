## First Love Church Attendance Tracker

The FLC Attendance Tracker is a full-stack attendance tracking web app for First Love Church Atlanta. 
The project includes a responsive client-side frontend for members and administrators, 
plus a Node.js/Express backend that stores attendance and member data with Prisma and PostgreSQL.
The application was designed to replace manual attendance processes with an organized digital solution.

## Live Demo
Frontend:
https://flc-attendance-frontend.onrender.com

## Features

### Member Features

- Branch selection
- Attendance check-in
- Duplicate attendance prevention
- Mobile-responsive interface

### Administrator Features

- Secure administrator login
- Add members
- Edit members
- Delete members
- Search members
- View attendance records
- Attendance dashboard
- Attendance statistics

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
```
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>"
ADMIN_USERNAME="FLC Atlanta"
ADMIN_PASSWORD_HASH="<bcrypt-hash>"
```
4. Generate Prisma clien
```
npm run build
```
5. Run the server
```
npm run dev
```
The backend will start on port 5000.

## Running the Client

Open the files in the client folder in your browser, or serve the client directory with a simple static server if needed.

## API Overview
The backend exposes these routes:
- GET /members - Get all members
- POST /members - Create a member
- PUT /members/:id - Update a member
- DELETE /members/:id - Delete a member
- GET /attendance - Get attendance records
- POST /attendance - Create an attendance record
- POST /admin/login - Admin login route

## Database
The Prisma schema defines:
- Member
- Attendance
Run Prisma migrations as needed for your PostgreSQL setup.

## License
This project is intended for educational and church organizational use.

## 📌 Future Improvements

- Export attendance to Excel
- QR code attendance
- Email notifications
- Multiple administrator accounts
- Role-based permissions
- Analytics dashboard

## 👩‍💻 Author

**Pamela Kyei Brewu**
- Mathematics Major concentration in Applied Mathematics
- Computer Science Minor
- Georgia State University

GitHub:
https://github.com/pkyeibrewu1
