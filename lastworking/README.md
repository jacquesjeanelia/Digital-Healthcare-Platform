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

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, Express, Next.js API Routes
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS Modules

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

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following content:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3001](http://localhost:3001) to see the application in your browser.

## Project Structure

```
sehaty/
├── public/           # Static assets
├── src/              # Source code
│   ├── components/   # React components
│   ├── models/       # Data models
│   ├── pages/        # Pages and API routes
│   ├── styles/       # CSS styles
│   └── utils/        # Utility functions
├── .env.local        # Environment variables
└── package.json      # Project dependencies
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Sehaty - Your health companion