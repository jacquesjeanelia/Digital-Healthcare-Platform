# Sehaty - Digital Healthcare Platform

Sehaty is a modern, user-friendly digital healthcare platform that connects patients with healthcare providers, facilitating seamless appointment scheduling, medical record management, and healthcare service delivery.

## 🌟 Features

### For Patients
- User-friendly appointment scheduling
- Secure medical records management
- Real-time appointment tracking
- Doctor search and filtering
- Insurance information management
- Secure messaging with healthcare providers

### For Healthcare Providers
- Appointment management dashboard
- Patient records access
- Schedule management
- Professional profile customization
- Verification system
- Consultation fee management

### For Administrators
- User management
- Provider verification
- System monitoring
- Content management

## 🚀 Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Radix UI Components
- React Router DOM
- Axios
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Bcrypt for password hashing

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sehaty.git
cd sehaty
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. Set up environment variables:

Create a `.env` file in the backend directory:
```env
MONGODB_URI=your_mongodb_connection_string (Should be requested from the owner of the project)
JWT_SECRET=your_jwt_secret (Should be requested from the owner of the project)
PORT=5000
```

Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🚀 Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

3. Access the application:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## 🧪 Test Accounts

For testing purposes, you can use the following accounts:

### Test Patient
- Email: test@patient.com
- Password: test123

### Test Doctor
- Email: test@doctor.com
- Password: test123

## 📁 Project Structure
```
sehaty/
├── frontend/ # Frontend React application
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── screens/ # Page components
│ │ ├── lib/ # Utility functions and contexts
│ │ └── routes/ # Route definitions
│ └── public/ # Static assets
│
├── backend/ # Backend Node.js application
│ ├── src/
│ │ ├── models/ # Database models
│ │ ├── routes/ # API routes
│ │ ├── middleware/ # Custom middleware
│ │ └── scripts/ # Utility scripts
│ └── config/ # Configuration files
│
└── docs/ # Documentation
```


## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Input validation
- CORS configuration
- Environment variable protection

## 👥 Authors

- Ahmed Elzahaby
- Karim Abolghar
