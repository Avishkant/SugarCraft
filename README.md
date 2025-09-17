# SugarCraft
A full-stack Sweet Shop Management System

# SugarCraft Backend

Sweet Shop Management System API

## Tech Stack
- Node.js
- Express
- MongoDB
- JWT Authentication
- Jest (TDD)
- ESLint & Prettier

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up your `.env` file in the `config` folder (see below).
3. Run in development mode:
   ```bash
   npm run dev
   ```
4. Run tests:
   ```bash
   npm test
   ```

## Environment Variables
Create a `.env` file in the `config` folder with:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## TDD Workflow
- Write failing tests first (Red)
- Implement code to pass tests (Green)
- Refactor for clarity and performance (Refactor)

## AI Co-authorship
For every commit using AI, add:
```
Co-authored-by: GitHub Copilot <AI@users.noreply.github.com>
```
