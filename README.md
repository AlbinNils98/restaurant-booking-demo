# Restaurant Booking Demo
A full-stack demo application for managing restaurant bookings.

## Overview
This monorepo contains:

Server: Node.js, Express, GraphQL Yoga, TypeScript, GraphQL Code Generator

App: Vite, React, TypeScript, Apollo Client, GraphQL Code Generator, MUI
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

MongoDB

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

- GraphQL Yoga – simple, fast GraphQL server

- TypeScript – end-to-end type safety

- GraphQL Code Generator – auto-generates types and React hooks

- Vite – lightning-fast frontend tooling

- Apollo Client – state management & GraphQL data fetching

- MUI – UI component library

## Deployment
- Server: Build with npm build and deploy to your Node hosting of choice.
- App: Build with npm build and serve the static files (for example Vercel or Netlify).
