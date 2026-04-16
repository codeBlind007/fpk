# Flipkart-Style E-Commerce App

Full-stack e-commerce project with a Next.js frontend and an Express + PostgreSQL backend.

## Project Overview

This project implements a Flipkart-like shopping experience with:

- Product listing and product details
- Cart and checkout flow
- Order placement and order history
- Wishlist management
- Product image and spec support

Repository structure:

- `frontend/`: Next.js app (UI + client-side state + API integration)
- `backend/`: Express API with PostgreSQL data storage

## Tech Stack

### Frontend

- Next.js 14.2.3
- React 18.2.0
- TypeScript 5
- Tailwind CSS 4
- Zustand (state management)
- Lucide React (icons)

### Backend

- Node.js + Express 5
- PostgreSQL (`pg`)
- dotenv
- CORS

## Setup Instructions

## 1. Prerequisites

- Node.js 18+
- npm
- PostgreSQL 14+

## 2. Backend Setup

1. Install dependencies:

```bash
cd backend
npm install
```

2. Create `backend/.env` with:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=ecommerce
NODE_ENV=development
```

3. Start backend:

```bash
npm start
```

or for dev mode:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`.

## 3. Frontend Setup

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Create `frontend/.env.local` with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

Optional (recommended for production image path stability):

```env
NEXT_PUBLIC_IMAGE_BASE_URL=http://localhost:5000
```

3. Start frontend:

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`.

## 4. Production Build Commands

Backend:

```bash
cd backend
npm start
```

Frontend:

```bash
cd frontend
npm run build
npm start
```

## Environment Notes

- Frontend variables must start with `NEXT_PUBLIC_` to be available in browser code.
- In Next.js, `.env.local` overrides `.env` for the same key.
- Restart frontend server after changing env values.

## Database Schema Design

The schema is designed to support a scalable and normalized e-commerce model.

### Products

`products` stores core product fields:

- `id` (primary key)
- `name`, `price`, `stock_quantity`, `category`, `description`

### Product Images

`product_images` supports one-to-many product images:

- One product can have multiple images
- Enables product detail carousels
- Stores image path, backend serves static files

### Product Specifications

`product_specs` stores key-value specs:

- Flexible attributes by product type
- No schema migration needed for new spec keys
- Dynamic rendering on frontend

### Cart Items

`cart_items` stores user cart rows:

- `user_id`, `product_id`, `quantity`
- Unique constraint on `(user_id, product_id)` avoids duplicate rows
- Quantity is updated for existing items

### Orders

`orders` is the order header:

- `user_id`, `total_amount`, `shipping_address`, `status`

### Order Items

`order_items` stores line items for each order:

- One order to many items
- `quantity`, `price_at_purchase` for historical price correctness

### Wishlist

`wishlist` stores saved products by user:

- Many-to-many style relation between users and products
- Unique constraint prevents duplicate wishlist entries

## Design Principles Followed

- Normalization: separated logical entities to reduce redundancy
- Scalability: supports multiple images, multiple order items, etc.
- Flexibility: key-value specifications for heterogeneous products
- Data integrity: foreign keys and constraints
- Real-world modeling: order header + order line-items separation

## Assumptions

### Backend Assumptions

- A default/mock authenticated user is used (no real auth system yet)
- Categories are stored as plain text
- Images are served from backend static path
- Product variants (size/color) are not implemented

### Frontend Assumptions

- API base URL is provided through env (`NEXT_PUBLIC_API_URL`)
- Image URLs can be normalized from relative paths to backend `/images/...`
- Cart and wishlist badge state is maintained client-side via Zustand

## Current Feature Scope

- Product listing with filters/search
- Product details with image carousel
- Cart add/remove/update
- Checkout and order placement
- Order confirmation and order history
- Wishlist add/remove/move to cart

## Troubleshooting

### Images not loading in deployment

- Ensure `NEXT_PUBLIC_API_URL` points to backend `/api`
- Ensure Next.js image remote host is allowed in `frontend/next.config.mjs`
- Redeploy frontend after config/env changes

### PostgreSQL SCRAM password error

- Ensure `DB_PASSWORD` in backend env is correct
- Ensure dotenv is loaded before creating the DB pool
