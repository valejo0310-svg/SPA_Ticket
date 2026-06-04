# SPA Ticket Management System

## Description

SPA (Single Page Application) developed with JavaScript for managing technical support tickets.

The system includes:

* User authentication
* Session persistence
* Role-based access control
* Ticket management
* Route protection
* CRUD operations
* Communication with two independent JSON Server APIs

## Technologies Used

* HTML5
* CSS3
* JavaScript ES6 Modules
* Axios
* JSON Server
* Vite
* LocalStorage

---

## Installation

Install project dependencies:

```bash
npm install
```

---

## Running the Project

### 1. Start Authentication Server

This service handles authentication, users, roles, and permissions.

```bash
npx json-server --watch assets/db/auth-db.json --port 3001

```

### 2. Start Data Server

This service handles tickets and application data.

```bash
npx json-server --watch assets/db/data-db.json --port 3002
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Open the Application

Open the URL displayed by Vite in your browser.

Usually:

```text
http://localhost:5173
```

---

## Project Structure

```text
SPA_TICKET
│
├── assets
├── css
│   └── styles.css
│
├── db
│   ├── auth-db.json
│   └── data-db.json
│
├── js
│   ├── components
│   ├── middleware
│   ├── pages
│   ├── services
│   ├── utils
│   └── views
│
├── index.html
├── package.json
└── README.md
```

---

## Roles and Permissions

### Administrator

* View all tickets
* Create tickets
* Edit tickets
* Delete tickets
* Assign technicians
* Manage users
* Update ticket status

### Technician

* Create tickets
* View own tickets
* Edit own tickets
* Update ticket status

### Client

* Register account
* Create tickets
* View own tickets
* Edit tickets only when no technician is assigned

---

## APIs

### Authentication API

Port: 3001

Responsible for:

* Login
* Registration
* Users
* Roles
* Permissions

### Data API

Port: 3002

Responsible for:

* Tickets
* Assigned technicians
* Business data

---

## Technical Decisions

* Modular architecture using ES Modules.
* Axios used for API communication.
* Route protection through middleware.
* Session persistence using LocalStorage.
* Separate JSON Server instances to simulate a real backend architecture.
* Dynamic rendering without page reloads following SPA principles.

---

## Main Commands

```bash
npm install

npx json-server --watch db/auth-db.json --port 3001

npx json-server --watch db/data-db.json --port 3002

npm run dev
```

## Team members

* Alexandra Peña
* Valentina Cabas
* Valery Avila
* Bryan Lozada (In charge of the presentation)
