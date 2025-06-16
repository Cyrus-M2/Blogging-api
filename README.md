# Blog API

## 📚 Project Description

This is a **simple Blog API** implemented with **Express**, **Prisma**, and **Postgres**.  
It lets you manage **Users** and **Posts**, with a **One-to-Many** relationship (each User can author multiple Posts).  
The API is designed following **REST** principles.

## 🛠 Tech Stack

- Express — for routing and server-side functionality
- Prisma — ORM for accessing the PostgreSQL database
- PostgreSQL — relational database for persistence

## 🔹 Database Models 🔹

### User

- `id` (string, uuid, PK)
- `firstName` (string)
- `lastName` (string)
- `emailAddress` (string, unique)
- `username` (string, unique)
- `posts` (Post[])

### Post

- `id` (string, uuid, PK)
- `title` (string)
- `content` (string)
- `createdAt` (DateTime, default now)
- `lastUpdated` (DateTime, updatedAt)
- `isDeleted` (Boolean, default false)
- `authorId` (string, UserId)


## 🔹 Endpoints 🔹

---

### 👤 Users

#### GET /users
- Retrieve all users.

#### GET /users/:id
- Retrieve a specific user by their IDs, **including their blog posts**.

#### POST /users
- Create a new user.
  
- **Request Body:**
```json
{
  "firstName": "Cyrus",
  "lastName": "Maundu",
  "emailAddress": "cyrusmaundu@gmail.com",
  "username": "Cyrusmaundu"
}
