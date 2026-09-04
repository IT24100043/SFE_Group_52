# Study Planner for Exams

## Project Title
Study Planner for Exams – A Full Stack Web Application for University Students in Sri Lanka

---

## Selected Problem
University students in Sri Lanka often struggle to manage multiple subjects, track study progress, and meet exam deadlines due to heavy academic workload. Many also work part-time jobs or internships to support their expenses, which makes time management even more challenging.

Traditional methods like notes or spreadsheets are often unorganized and inefficient, leading to missed tasks and poor planning. As third-year students, we also experience difficulty balancing academic work, internship responsibilities, and exam preparation, especially during examination periods.

Therefore, students need a simple digital solution to organize, prioritize, and manage their daily study tasks effectively.

---

## Proposed Solution
We developed a full-stack web application that helps students efficiently plan, organize, and track their study tasks. The system allows users to add tasks, assign priorities, set due dates, and manage progress through task status updates, with persistent data storage using MongoDB.

---

## Main Features
- Add study tasks (title, subject, priority, due date)
- View all tasks sorted by due date
- Update task status (To Do / In Progress / Done)
- Delete tasks
- Filter tasks by subject or status
- Input validation (required title, valid future due date)
- MongoDB database storage
- Search tasks by title (stretch feature)
- Responsive user interface

---

## Technologies Used
Frontend: React (Vite)  
Backend: Node.js + Express.js  
Database: MongoDB  
Styling: CSS  
Version Control: Git & GitHub  

---

## AI Tools Used
ChatGPT (for guidance, debugging, and code suggestions)

---

## Team Members & Contributions

IT24100790 – Wijesinghe W A O D  
 User Authentication Function with secure registration and Login.
 Input validation and password hashing using bycrypt

IT24101146 – Prabuddhi K A G  
Backend API routing and request handling, create express routes for authentication and todo managemnts and todo related functions.

IT24104252 – Peiris Y N  
Designing databasa stucture with MongoDB, User Schema and ToDo schema

IT24100043 – Abeysekara M.D.V  
 Backend implenentation with creating, updating, deleting and retrieving tasks, filtering based on priority levels.

---

## Installation & Execution Instructions

### 1. Clone the repository
git clone https://github.com/IT24100043/SFE_Group_52.git  
cd SFE_Group_52  

---

### 2. Install dependencies

Frontend:
cd frontend  
npm install  

Backend:
cd backend  
npm install  

---

### 3. Setup environment variables

Create a .env file in backend:

MONGO_URI=your_mongodb_connection_string  
PORT=5000  

---

### 4. Run the application

Start backend:
cd backend  
npm run dev  

Start frontend:
cd frontend  
npm run dev  

---

### 5. Open in browser
http://localhost:5173/

---

## Deployed Application Link


---

## Demonstration Video


---

## Notes
This project was developed as part of a Mini Hackathon (4-hour challenge).  
The focus was on building a functional, scalable, and user-friendly full-stack application using the MERN stack within a limited time.

