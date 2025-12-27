# Konnect 💬  
A real-time one-to-one chat application built using the MERN stack and Socket.io, featuring secure authentication and live user presence.

---

## 🚀 Features

- 🔐 **JWT-based Authentication**
  - Secure user sign-up and sign-in
  - Password hashing using Bcrypt
  - Protected routes for authenticated users

- 💬 **Real-Time One-to-One Messaging**
  - Instant message delivery using Socket.io (WebSockets)
  - Handles connect, disconnect, and message events efficiently

- 🟢 **Online / Offline User Status**
  - Tracks user presence in real time
  - Updates status dynamically on socket connection and disconnection

- 💾 **Message Persistence**
  - Stores chat history in MongoDB
  - Users can view previous conversations after logging in

- 🧩 **Structured Backend**
  - Follows MVC architecture (Routes, Controllers, Services)
  - Centralized error handling for better debugging and stability

- 🧪 **Input Validation**
  - Uses Zod for schema-based request validation

- 📱 **Responsive UI**
  - Clean and responsive user interface built with Tailwind CSS

---

## 🛠 Tech Stack

### Frontend
- React.js
- TypeScript
- HTML5, CSS3
- Tailwind CSS
- Redux
- Axios

### Backend
- Node.js
- Express.js
- JWT (Authentication)
- Bcrypt (Password Hashing)
- Zod (Validation)

### Database
- MongoDB

### Real-Time Communication
- Socket.io (WebSockets)

---

## 🏗 Architecture

The backend follows a **Model-View-Controller (MVC)** architecture:
- **Routes** – Define API endpoints
- **Controllers** – Handle request/response logic
- **Models** – MongoDB schemas
- **Middlewares** – Authentication, validation, and error handling

---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js
- MongoDB (local or cloud)
- Git

### Clone the Repository
```bash
git clone <repository-url>
cd konnect
