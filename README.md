# Sehaty - Modern Healthcare Platform

Sehaty is a comprehensive digital healthcare solution that connects patients with healthcare providers seamlessly. The platform enables appointment scheduling, medical record management, telemedicine consultations, and more.

## Features

- **User Authentication**: Secure login and registration for patients, doctors, and administrators
- **Appointment Management**: Schedule, view, update, and cancel medical appointments
- **Doctor Discovery**: Find healthcare providers by specialization, location, or availability
- **Medical Records**: Access and manage electronic health records securely
- **Telemedicine**: Virtual consultations through integrated video conferencing
- **Notifications**: Reminders for upcoming appointments and medication schedules

## Technology Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB connection

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/sehaty.git
cd sehaty
```

2. Install frontend dependencies:
```bash
cd sehaty-frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../sehaty-backend
npm install
```

4. Set up environment variables:
Create a `.env` file in the sehaty-backend directory with the following content:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000
```

5. Run the development servers:

Frontend:
```bash
cd sehaty-frontend
npm run dev
```

Backend:
```bash
cd sehaty-backend
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) to see the frontend application in your browser.

## Project Structure

```
sehaty/
├── sehaty-frontend/          # Frontend application
│   ├── src/                 # Source code
│   │   ├── components/      # React components
│   │   ├── pages/          # Page components
│   │   ├── styles/         # CSS styles
│   │   └── utils/          # Utility functions
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
│
├── sehaty-backend/          # Backend application
│   ├── src/                # Source code
│   │   ├── routes/         # API routes
│   │   ├── models/         # Database models
│   │   ├── services/       # Business logic
│   │   └── server.js       # Main server file
│   └── package.json        # Backend dependencies
│
├── docs/                   # Documentation
└── README.md              # Project documentation
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Sehaty - Your health companion