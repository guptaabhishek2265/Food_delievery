# Bingo Food Delivery App

Bingo is a full-stack food delivery web application with separate workflows for customers, restaurant owners, and delivery partners. The app supports restaurant discovery, menu browsing, cart checkout, online/COD payments, real-time order updates, delivery assignment, live tracking, and OTP-based delivery confirmation.

## Features

- Customer dashboard with location-based shops, categories, food search, cart, checkout, and order tracking.
- Restaurant owner dashboard to create/edit shops, manage food items, receive orders, and update order status.
- Delivery partner dashboard with nearby assignments, live location updates, delivery stats, and OTP delivery verification.
- Real-time order notifications and delivery location updates using Socket.IO.
- Online payment support with Razorpay and image upload support with Cloudinary.
- JWT authentication with secure cookie handling and Google/Firebase authentication support.

## Tech Stack

**Frontend:** React, Vite, Redux Toolkit, Tailwind CSS, React Router, Axios, Leaflet, Recharts, Socket.IO Client, Firebase

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Socket.IO, Razorpay, Cloudinary, Multer, Nodemailer

## Project Structure

```text
Food_delievery/
  backend/    Express API, database models, controllers, routes, Socket.IO
  frontend/   React/Vite user interface and dashboards
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- MongoDB database
- Cloudinary account
- Razorpay account
- Firebase project
- Email account/app password for OTP email

### Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Update `backend/.env` with your MongoDB, JWT, email, Cloudinary, Razorpay, and frontend URL values.

### Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Update `frontend/.env` with your API URL, Firebase API key, and Razorpay key.

## Available Scripts

Backend:

```bash
npm run dev
npm start
```

Frontend:

```bash
npm run dev
npm run build
npm run preview
```

## Main User Roles

- **Customer:** Browse food, add items to cart, place orders, pay online or COD, and track deliveries.
- **Owner:** Manage restaurant profile, add/edit menu items, accept and update orders.
- **Delivery Partner:** Accept nearby assignments, share live location, send OTP, and complete deliveries.

## Verification

The frontend production build has been verified with:

```bash
npm run build
```

