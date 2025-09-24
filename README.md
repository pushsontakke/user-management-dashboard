# User Management Dashboard

A modern React-based user management dashboard that allows you to view, add, edit, and delete users with advanced filtering, searching, and sorting capabilities.

## Features

- **User Management**: Add, edit, and delete users
- **Advanced Search**: Search users by name, email, or department
- **Filtering**: Filter users by multiple criteria
- **Sorting**: Sort users by ID, name, email, or department
- **Responsive Design**: Clean and modern UI that works on all devices
- **Real-time Updates**: Dynamic user count and filtering results

## Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **HTTP Client**: Axios 1.12.2
- **Styling**: CSS3 with custom stylesheets
- **Linting**: ESLint with React-specific rules
- **API**: JSONPlaceholder (for demo data)

## Project Structure

```
src/
├── Dashboard/          # Main dashboard component
├── UserDetails/        # User table and management logic
├── Modal/             # Add/Edit user modal component
├── Filter/            # Advanced filtering component
├── Pagination/        # Pagination component
├── assets/            # Static assets
├── App.jsx           # Root application component
├── main.jsx          # Application entry point
└── *.css             # Component-specific styles
```

## Components Overview

- **Dashboard**: Main container component that manages user state and API calls
- **UserDetailsTable**: Displays users in a sortable table with search and filter functionality
- **Modal**: Handles user creation and editing forms
- **Filter**: Advanced filtering popup with multiple criteria
- **Pagination**: Handles pagination of user data

## Setup Instructions

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/pushsontakke/user-management-dashboard.git
cd user-management-dashboard
```

2. Install dependencies:

```bash
npm install
```

### Running the Application

1. Start the development server:

```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## API Integration

The application uses JSONPlaceholder API for demo purposes:

- **GET** `/users` - Fetch all users
- **POST** `/users` - Add new user
- **PUT** `/users/:id` - Update existing user
- **DELETE** `/users/:id` - Delete user

## Development

The project uses Vite for fast development and building, with React Fast Refresh enabled for instant updates during development. ESLint is configured with React-specific rules to maintain code quality.
