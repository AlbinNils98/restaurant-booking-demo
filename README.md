# Restaurant Booking Demo
A full-stack demo application for managing restaurant bookings.

## Overview
This monorepo contains:

### Server: 
- Node.js, Express, GraphQL Yoga, TypeScript, GraphQL Code Generator

### App: 
- Vite, React, TypeScript, Apollo Client, GraphQL Code Generator, MUI

The goal is to demonstrate a modern TypeScript-based GraphQL stack with end-to-end type safety.

## Project Structure
```
restaurant-booking-demo/ (tsc + esLint + husky config)
├── server/ (Express + GraphQL Yoga backend)
└── app/ (Vite + React frontend)
```

## Prerequisites

Node.js 18 or later

npm

MongoDB (local or cloud, e.g., MongoDB Atlas)

## Getting Started
Clone the repository and install dependencies:
```
git clone https://github.com/your-username/restaurant-booking-demo.git
cd restaurant-booking-demo
npm install
npm run husky
```
### Server
```
cd server
npm install
cp .env.example .env (update environment variables as needed)
npm run dev (starts Express + GraphQL Yoga in watch mode)
Runs on: http://localhost:4000
```

#### Server Environment Variables

The server requires the following environment variables. You need to create a `.env` file in the `server/` folder based on the examples below.

##### Development (`.env.dev`)
```
NODE_ENV=development
PORT=4000
MONGO_URI=mongodb://localhost:27017
DB_NAME=RestaurantDB

JWT_SECRET=your_jwt_secret_here

GMAILUSER=your_email@example.com

GMAILPASS=your_gmail_app_password_here
```
##### Production (`.env.prod`)
```
NODE_ENV=production
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net
DB_NAME=RestaurantDB

JWT_SECRET=your_production_jwt_secret_here

GMAILUSER=your_email@example.com

GMAILPASS=your_gmail_app_password_here
```

**Notes:**
- `NODE_ENV`: Set to `development` or `production`.  
- `PORT`: Port the server will run on.  
- `MONGO_URI`: Your MongoDB connection URI.  
- `DB_NAME`: Name of the database.  
- `JWT_SECRET`: Secret used for signing JWT tokens.  
- `GMAILUSER`: Your Gmail email connected to the gmail app password.
- `GMAILPASS`: A **Gmail App Password** generated for use with external apps (not your normal Gmail password).

If using `NODE_ENV=development` the server seeds the database with example values. 

- GraphQL endpoint: /graphql
- Code generation: npm codegen

### App
```
cd app
npm run install
npm run dev
Runs on: http://localhost:5173
```

- Apollo Client configured to talk to http://localhost:5000/graphql
- Code generation: pnpm codegen

## Scripts
```
Location | Script | Description
server | npm run dev | Start backend in development mode
server | npm run build | Build TypeScript output
server | npm run codegen | Generate GraphQL types
app | npm run dev | Start Vite development server
app | npm build | Build production React app
app | npm codegen | Generate GraphQL hooks/types for Apollo Client
```

## Tech Highlights

### Server
- **MongoDB** – document database for booking data

- **GraphQL Yoga** – simple, fast GraphQL server

- **TypeScript** – end-to-end type safety

- **GraphQL Code Generator (Server)** – generates TypeScript types from GraphQL schemas, which are used for resolvers and also for defining MongoDB collections, ensuring backend type safety and consistency  

### App

- **Vite** – lightning-fast frontend tooling
  
- **GraphQL Code Generator** – fetches types from the server schema to auto-generate TypeScript types and React hooks, ensuring full type safety on the frontend

- **Apollo Client** – state management & GraphQL data fetching

- **MUI** – UI component library

## Deployment
- Server: Build with npm build and deploy to your Node hosting of choice.
- App: Build with npm build and serve the static files (for example Vercel or Netlify).
