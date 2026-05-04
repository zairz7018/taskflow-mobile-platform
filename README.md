# TaskFlow Mobile Platform

TaskFlow Mobile Platform is a full-stack task management and tracking application based on a secure client-server architecture.

The project is developed as part of a practical work focused on building a mobile application that consumes a secured REST API. The backend is developed with Spring Boot and Spring Security, while the mobile application will be developed with React Native.

The main objective of this project is to implement a complete workflow where clients can create tasks and employees can take, process, and update those tasks securely using JWT authentication.

---

## Project Overview

TaskFlow is designed to manage task requests between two main user roles:

- **Client**
- **Employee**

A client can create a task request, follow its progress, update it while it is still pending, and delete it if it has not yet been taken by an employee.

An employee can view available tasks, take one task, update its status, and mark it as completed.

This project is not only a basic CRUD application. It includes role-based access control, JWT authentication, RESTful API design, database persistence, and a clear business workflow.

---

## Main Features

### Authentication

- User registration
- User login
- JWT token generation
- Password encryption using BCrypt
- Protected API endpoints
- Role-based authorization

### Client Features

- Create a new task
- View personal tasks
- Update a task if it is still pending
- Delete a task if it is not assigned
- Follow task status

### Employee Features

- View available tasks
- Take a task
- View assigned tasks
- Update task status
- Close a completed task

---

## User Roles

The application contains two roles:

### CLIENT

A client is the user who creates task requests.

Allowed actions:

- Register
- Login
- Create tasks
- View own tasks
- Update own pending tasks
- Delete own pending tasks
- Follow task status

### EMPLOYE

An employee is the user who handles available tasks.

Allowed actions:

- Register
- Login
- View available tasks
- Take a task
- View assigned tasks
- Update task status
- Close task

---

## Business Workflow

The application follows this workflow:

1. A client registers and logs in.
2. The client creates a task.
3. The task is created with the status `EN_ATTENTE`.
4. An employee logs in.
5. The employee views available tasks.
6. The employee takes one task.
7. The task status becomes `PRISE_EN_CHARGE`.
8. The employee updates the task status to `EN_COURS`.
9. When the work is finished, the employee closes the task.
10. The task status becomes `TERMINEE`.
11. The client can view the final status of the task.

---

## Task Statuses

The task can have the following statuses:

```text
EN_ATTENTE
PRISE_EN_CHARGE
EN_COURS
TERMINEE
ANNULEE
