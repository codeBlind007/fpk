# Flipkart Clone Frontend

A modern e-commerce frontend built with Next.js 16, React 19, TypeScript, Tailwind CSS, and shadcn/ui.

## Features Implemented

### 1. **Product Listing Page**

- Display products in a responsive grid layout
- Search functionality to find products by name
- Filter products by category
- Filter products by price range
- Mobile-responsive design with collapsible filters
- Product cards with images, name, price, ratings, and add to cart button

### 2. **Product Detail Page**

- Image carousel with multiple images
- Previous/next navigation and thumbnail selector
- Product specifications and stock availability
- "Add to Cart" and "Buy Now" buttons

### 3. **Shopping Cart**

- View all items with update/remove functionality
- Quantity controls (increment/decrement)
- Order summary with subtotal, tax, shipping, and total

### 4. **Checkout Page**

- Shipping address form for delivery details
- Order review before placement
- Order summary with prices

### 5. **Order Confirmation**

- Success confirmation with order ID
- Shipping address and order items display
- Total amount summary

## Component Architecture

Built with small, reusable components:

- **ProductCard**: Individual product display
- **CategoryFilter**: Category-based filtering
- **PriceFilter**: Price range filtering
- **ImageCarousel**: Product image gallery
- **CartItemComponent**: Cart item management
- **AddressForm**: Address input form
- **PriceSummary**: Price breakdown display
- And more...

## Setup Instructions

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Set up environment variables in `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

3. Run the development server:

```bash
npm run dev
```

4. Open http://localhost:3000

## Technologies Used

- **Next.js 16**: React framework
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Utility-first CSS
- **shadcn/ui**: Pre-built components
- **Zustand**: State management
- **Axios**: HTTP client
- **Lucide React**: Icons

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
│   ├── _pages/            # Page components
│   ├── product/[id]/      # Product detail page
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   └── order-confirmation/[id]/ # Confirmation page
├── components/             # Reusable components
│   ├── ui/                # shadcn/ui components
│   └── [Component files]  # Feature components
└── lib/                   # Utilities and API
    ├── api.ts             # API client
    ├── store.ts           # Zustand store
    └── utils.ts           # Helper functions
```

## Key Design Principles

- ✅ **Small, Reusable Components**: Each component has a single responsibility
- ✅ **Mobile-First Responsive Design**: Works seamlessly on all devices
- ✅ **State Management**: Centralized cart state with Zustand
- ✅ **Loading States**: Skeleton components for smooth UX
- ✅ **Error Handling**: Proper error feedback and empty states
- ✅ **Performance**: Image optimization and code splitting

## API Endpoints

See backend for complete API documentation. Frontend uses:

- Products: `GET /products`, `GET /products/:id`, `GET /products/search`, `GET /products/filter`
- Cart: `GET/POST/PATCH/DELETE /cart`, `GET /cart/summary`
- Orders: `POST /orders`, `GET /orders/:id`

## Notes

- Mock userId "user_123" used for demo
- All components are TypeScript for type safety
- Tailwind CSS 4 with custom configuration
- Next.js Image component for optimization
