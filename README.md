# Alt-Credit-Scoring

Alt-Credit-Scoring is a full-stack application designed to provide alternative credit scoring solutions. It features a robust backend API and a modern frontend interface.

## Tech Stack

### Backend
- **Node.js & Express**: API framework
- **MongoDB & Mongoose**: Database and ODM
- **JWT & bcrypt**: Authentication and security

### Frontend
- **React**: UI library
- **Vite**: Build tool and development server

## Project Structure

- `/backend` - Contains the Express server, controllers, models, and routes.
- `/frontend` - Contains the React application built with Vite.

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- MongoDB

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `backend/.env` (e.g., `PORT`, `MONGO_URI`, `JWT_SECRET`).
4. Start the development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## API Endpoints (Preview)
- **Auth**: `/api/auth/register`, `/api/auth/login`
- **Loans**: `/api/loans`, `/api/loans/my-applications`, `/api/loans/:id`

## License
ISC
