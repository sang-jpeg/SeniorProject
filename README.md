# QA Testing Platform

A comprehensive platform for managing QA testing workflows, including test cases, test runs, and issue tracking.

## Features

- User authentication and authorization
- Test case management
- Test run execution and reporting
- Issue tracking
- Client and project management
- Payment tracking
- Certification management

## Tech Stack

- Frontend:
  - React
  - Material-UI
  - TypeScript
  - React Router

- Backend:
  - Node.js
  - Express
  - TypeScript
  - Sequelize ORM
  - PostgreSQL

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:
Create `.env` files in both client and server directories with the necessary environment variables.

4. Start the development servers:
```bash
# Start client development server
cd client
npm start

# Start server development server
cd ../server
npm run dev
```

## Project Structure

```
.
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── layouts/       # Page layouts
│   │   ├── pages/        # Page components
│   │   └── services/     # API services
│   └── package.json
│
└── server/                # Backend Node.js application
    ├── src/
    │   ├── config/       # Configuration files
    │   ├── models/       # Database models
    │   ├── routes/       # API routes
    │   └── types/        # TypeScript type definitions
    └── package.json
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is fully owned and copyrighted by Sang Brian - please reach out ot him for any licensing
