# Simple E-Commerce Application Documentation

## Overview
This is a simple e-commerce application that allows users to browse products, add them to a cart, place orders, and track their orders. The application is built using HTML, CSS, and JavaScript, with data stored in localStorage.

## File Structure
The project is organized into the following directories and files:

### Data Management
- `data/cart.js`: Manages the shopping cart functionality.
- `data/products.js`: Handles product data and operations.
- `data/orders.js`: Manages order data and operations.
- `data/deliveryOptions.js`: Handles delivery options and calculations.

### Scripts
- `scripts/shop.js`: Manages the shop page functionality.
- `scripts/orders.js`: Manages the orders page functionality.
- `scripts/tracking.js`: Manages the order tracking functionality.
- `scripts/checkout.js`: Manages the checkout process.
- `scripts/checkout/checkoutHeader.js`: Manages the checkout header.
- `scripts/checkout/orderSummary.js`: Manages the order summary in checkout.
- `scripts/checkout/paymentSummary.js`: Manages the payment summary in checkout.
- `scripts/utils/money.js`: Utility functions for currency formatting.

### HTML Pages
- `index.html`: The main shop page.
- `orders.html`: The orders page.
- `checkout.html`: The checkout page.
- `tracking.html`: The order tracking page.

### CSS Styles
- `styles/shared/general.css`: General styles shared across the application.
- `styles/pages/home.css`: Styles for the home page.
- `styles/pages/orders.css`: Styles for the orders page.
- `styles/pages/checkout/checkout.css`: Styles for the checkout page.
- `styles/pages/checkout/checkout-header.css`: Styles for the checkout header.

## Key Functionalities
### Shopping Cart
- **Add/Remove Items**: Users can add or remove items from the cart.
- **Update Quantity**: Users can update the quantity of items in the cart.
- **Save to LocalStorage**: Cart data is saved to localStorage for persistence.

### Checkout Process
- **Order Summary**: Displays a summary of the items in the cart.
- **Payment Summary**: Calculates and displays the total cost, including delivery charges.
- **Place Order**: Users can place an order, which is saved to localStorage.

### Order Management
- **View Orders**: Users can view their past orders.
- **Track Order**: Users can track the status of their orders.

### Product Management
- **Load Products**: Products are loaded from `data/products.js`.
- **Product Details**: Users can view details of each product.

## How to Run
1. Open `index.html` in a web browser to start the application.
2. Browse products, add them to the cart, and proceed to checkout.
3. View and track orders from the orders and tracking pages.

## Dependencies
- **dayjs**: Used for date and time manipulation in order tracking and delivery calculations.

## Notes
- All data is stored in localStorage, so it will persist across page reloads but will be cleared if the browser cache is cleared.
