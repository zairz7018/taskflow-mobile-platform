# TaskFlow Backend

TaskFlow Backend is a Spring Boot REST API for a task management and tracking platform. It implements JWT authentication, role-based access, and a structured workflow between CLIENT and EMPLOYE users.

## Technologies

- Java 17
- Spring Boot 3.x (Web, Security, Data JPA, Validation)
- MySQL
- JWT (JJWT 0.11.5)
- Lombok
- Maven

## Architecture

- `controller` exposes REST endpoints and stays thin
- `service` contains business rules and workflow validation
- `repository` handles persistence with Spring Data JPA
- `security` provides JWT authentication and authorization rules
- `exception` centralizes API error handling

## Database Configuration

The project targets an existing MySQL database named `taskflow_db`.

`src/main/resources/application.properties`:

```
spring.datasource.url=jdbc:mysql://127.0.0.1:3306/taskflow_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=
```

## How to Run

```
mvn spring-boot:run
```

The API runs on `http://localhost:8080` by default.

## API Endpoints Summary

Auth:

- POST `/api/auth/register`
- POST `/api/auth/login`

User:

- GET `/api/users/me`

Client tasks:

- POST `/api/tasks`
- GET `/api/tasks/my-tasks`
- PUT `/api/tasks/{id}`
- DELETE `/api/tasks/{id}`

Employe tasks:

- GET `/api/tasks/available`
- PUT `/api/tasks/{id}/take`
- GET `/api/tasks/my-assigned-tasks`
- PUT `/api/tasks/{id}/status`
- PUT `/api/tasks/{id}/close`

## JWT in This Project

- Tokens are created on login and must be sent using `Authorization: Bearer <token>`
- Tokens expire after 5 minutes (300000 ms)
- Claims include `role` and `fullName` to support client-side display

## Postman Testing

Manual Postman steps are documented in `postmantest.txt`.

## Author

Author: Your Name Here
