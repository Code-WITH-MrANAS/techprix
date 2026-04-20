<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React 19" />
  <img src="https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite 8" />
  <img src="https://img.shields.io/badge/Three.js-0.184-000000?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
</p>

<h1 align="center">🚀 TechPrix — Digital Agency Website</h1>

<p align="center">
  <strong>A premium, full-stack digital agency website featuring 3D animations, glassmorphism design, dark/light mode, and a complete backend API.</strong>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-getting-started">Setup</a> •
  <a href="#-api-endpoints">API</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ✨ Features

### 🎨 Frontend
- **3D Interactive Scene** — Floating geometric shapes with cursor-responsive parallax using Three.js & React Three Fiber
- **Smooth Animations** — Page transitions, scroll reveals, and micro-interactions powered by Framer Motion
- **Dark / Light Mode** — System-aware theme toggle with smooth transitions
- **Glassmorphism UI** — Modern frosted-glass design with premium aesthetics
- **Fully Responsive** — Optimized for mobile, tablet, and desktop
- **Page Load Animation** — Elegant curtain loader with progress bar
- **WhatsApp Integration** — Floating WhatsApp button for instant contact

### 🖥️ Website Sections
| Section | Description |
|---------|-------------|
| **Hero** | Bold gradient headline with 3D animated background and CTA |
| **Services** | Showcases offered services with animated cards |
| **Portfolio** | Project showcase with hover effects |
| **About** | Agency story and mission |
| **Testimonials** | Client reviews with carousel-style layout |
| **Contact** | Fully functional contact form connected to backend |
| **Footer** | Social links, navigation, and branding |

### ⚙️ Backend
- **RESTful API** — Express.js server with clean MVC architecture
- **MongoDB Integration** — Mongoose ODM for data persistence
- **Email Notifications** — Automated emails via Nodemailer (agency notification + client confirmation)
- **Input Validation** — Request validation using express-validator
- **Security** — Helmet headers, CORS configuration, and request limiting
- **Error Handling** — Centralized error handler with proper HTTP status codes
- **Request Logging** — Morgan logger for development debugging

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | UI component library |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Three.js** | 3D graphics engine |
| **React Three Fiber** | React renderer for Three.js |
| **React Three Drei** | Useful helpers for R3F |
| **React Router DOM** | Client-side routing |
| **Lucide React** | Icon library |
| **Axios** | HTTP client |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | Runtime environment |
| **Express 5** | Web framework |
| **MongoDB** | NoSQL database |
| **Mongoose 9** | MongoDB ODM |
| **Nodemailer** | Email service |
| **Helmet** | Security headers |
| **CORS** | Cross-origin handling |
| **Morgan** | HTTP request logger |
| **express-validator** | Input validation |
| **dotenv** | Environment variables |

---

## 📁 Project Structure

```
TechPrix/
├── frontend/                    # React + Vite frontend
│   ├── public/
│   │   ├── favicon.svg
│   │   └── icons.svg
│   ├── src/
│   │   ├── assets/              # Images & static assets
│   │   │   └── hero.png
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── ServicesSection.jsx
│   │   │   ├── ProjectsSection.jsx
│   │   │   ├── AboutSection.jsx
│   │   │   ├── TestimonialsSection.jsx
│   │   │   ├── ContactSection.jsx
│   │   │   ├── WhatsAppButton.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   └── ThemeContext.jsx  # Dark/Light mode context
│   │   ├── pages/
│   │   │   └── Home.jsx         # Main landing page
│   │   ├── services/
│   │   │   └── api.js           # Axios API configuration
│   │   ├── App.jsx              # Root component with routing
│   │   ├── App.css              # Global styles
│   │   ├── index.css            # Tailwind & base styles
│   │   └── main.jsx             # Entry point
│   ├── index.html
│   ├── vite.config.js
│   ├── eslint.config.js
│   └── package.json
│
├── backend/                     # Node.js + Express backend
│   ├── config/
│   │   └── db.js                # MongoDB connection
│   ├── controllers/
│   │   └── contactController.js # Contact CRUD logic
│   ├── middleware/
│   │   ├── errorHandler.js      # Global error handler
│   │   └── validate.js          # Validation middleware
│   ├── models/
│   │   └── Contact.js           # Mongoose schema
│   ├── routes/
│   │   └── contactRoutes.js     # Contact API routes
│   ├── utils/
│   │   └── emailService.js      # Nodemailer configuration
│   ├── server.js                # Express app entry point
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** (v9 or higher)
- **MongoDB Atlas** account (or local MongoDB instance)
- **Gmail Account** (for Nodemailer email service)

### 1. Clone the Repository

```bash
git clone https://github.com/Code-WITH-MrANAS/techprix.git
cd techprix
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/techprix?retryWrites=true&w=majority

# CORS
CLIENT_URL=http://localhost:5173

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
AGENCY_EMAIL=your-agency-email@gmail.com
```

> **Note:** For Gmail, you need to generate an [App Password](https://support.google.com/accounts/answer/185833) (not your regular password).

Start the backend server:

```bash
npm run dev
```

The API will be running at `http://localhost:5000`

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

The app will be running at `http://localhost:5173`

---

## 📡 API Endpoints

Base URL: `http://localhost:5000/api`

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Check if the API is running |

### Contact
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/contact` | Submit a new contact message |
| `GET` | `/contact` | Get all contact messages (admin) |
| `GET` | `/contact/:id` | Get a single contact message |
| `PATCH` | `/contact/:id` | Update contact status |
| `DELETE` | `/contact/:id` | Delete a contact message |

### Contact Status Values
- `new` — Fresh submission (default)
- `read` — Message has been viewed
- `replied` — Agency has responded
- `archived` — Archived message

### Example Request — Submit Contact

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "service": "Web Development",
    "message": "I need a website for my business."
  }'
```

### Example Response

```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully. We will get back to you within 2 hours.",
  "data": {
    "id": "663f1a2b3c4d5e6f7a8b9c0d",
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2026-04-20T12:00:00.000Z"
  }
}
```

---

## 🎨 Design Highlights

- **Color Palette** — Indigo-to-violet gradients with subtle accent tones
- **Typography** — Premium font stack with display and body variants
- **Glassmorphism** — Frosted glass effects with backdrop blur
- **Micro-Animations** — Hover states, scroll reveals, and element transitions
- **3D Elements** — Interactive floating geometry with parallax effects
- **Responsive Grid** — Fluid layouts that adapt to all screen sizes

---

## 📜 Available Scripts

### Frontend (`/frontend`)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Backend (`/backend`)
| Command | Description |
|---------|-------------|
| `npm run dev` | Start with auto-restart (watch mode) |
| `npm start` | Start production server |

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Mr. ANAS** — [@Code-WITH-MrANAS](https://github.com/Code-WITH-MrANAS)

---

<p align="center">
  <strong>⭐ If you found this project helpful, give it a star on GitHub!</strong>
</p>
