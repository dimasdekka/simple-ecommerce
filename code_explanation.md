# Full Explanation of the Codebase

## Overview
This is a simple e-commerce application that allows users to browse products, add them to a cart, place orders, and track their orders. The application is built using HTML, CSS, and JavaScript, with data stored in localStorage.

## Data Management
### `data/cart.js`
- **Purpose**: Manages the shopping cart functionality.
- **Key Functions**:
  - `addToCart(productId)`: Adds a product to the cart.
  - `removeFromCart(productId)`: Removes a product from the cart.
  - `updateCartQuantity(productId, quantity)`: Updates the quantity of a product in the cart.
  - `saveCart()`: Saves the cart data to localStorage.

### `data/products.js`
- **Purpose**: Handles product data and operations.
- **Key Functions**:
  - `getProduct(productId)`: Retrieves a product by its ID.
  - `loadProducts()`: Loads the product data from `backend/products.json`.

### `data/orders.js`
- **Purpose**: Manages order data and operations.
- **Key Functions**:
  - `addOrder(order)`: Adds a new order to the orders list.
  - `saveStorage()`: Saves the orders data to localStorage.

### `data/deliveryOptions.js`
- **Purpose**: Handles delivery options and calculations.
- **Key Functions**:
  - `getDeliveryOption(deliveryOptionId)`: Retrieves a delivery option by its ID.

## Scripts
### `scripts/shop.js`
- **Purpose**: Manages the shop page functionality.
- **Key Functions**:
  - `renderProducts()`: Renders the products on the shop page.
  - `handleAddToCart(productId)`: Handles the "Add to Cart" button click.

### `scripts/orders.js`
- **Purpose**: Manages the orders page functionality.
- **Key Functions**:
  - `renderOrders()`: Renders the orders on the orders page.

### `scripts/tracking.js`
- **Purpose**: Manages the order tracking functionality.
- **Key Functions**:
  - `renderTracking(orderId)`: Renders the tracking information for a specific order.

### `scripts/checkout.js`
- **Purpose**: Manages the checkout process.
- **Key Functions**:
  - `renderCheckout()`: Renders the checkout page.

### `scripts/checkout/checkoutHeader.js`
- **Purpose**: Manages the checkout header.
- **Key Functions**:
  - `renderCheckoutHeader()`: Renders the checkout header.

### `scripts/checkout/orderSummary.js`
- **Purpose**: Manages the order summary in checkout.
- **Key Functions**:
  - `renderOrderSummary()`: Renders the order summary.

### `scripts/checkout/paymentSummary.js`
- **Purpose**: Manages the payment summary in checkout.
- **Key Functions**:
  - `renderPaymentSummary()`: Renders the payment summary.

### `scripts/utils/money.js`
- **Purpose**: Utility functions for currency formatting.
- **Key Functions**:
  - `formatCurrencies(priceCents)`: Formats the price in cents to a currency string.

## HTML Pages
### `index.html`
- **Purpose**: The main shop page where users can browse products and add them to the cart.

### `orders.html`
- **Purpose**: The orders page where users can view their past orders.

### `checkout.html`
- **Purpose**: The checkout page where users can place orders.

### `tracking.html`
- **Purpose**: The order tracking page where users can track the status of their orders.

## CSS Styles
### `styles/shared/general.css`
- **Purpose**: General styles shared across the application.

### `styles/pages/home.css`
- **Purpose**: Styles for the home page.

### `styles/pages/orders.css`
- **Purpose**: Styles for the orders page.

### `styles/pages/checkout/checkout.css`
- **Purpose**: Styles for the checkout page.

### `styles/pages/checkout/checkout-header.css`
- **Purpose**: Styles for the checkout header.

## How It All Works Together
1. **Browsing Products**: Users browse products on the `index.html` page. The `scripts/shop.js` script renders the products and handles adding them to the cart.
2. **Managing the Cart**: The `data/cart.js` script manages the cart functionality, including adding, removing, and updating items. The cart data is saved to localStorage.
3. **Checkout Process**: Users proceed to the `checkout.html` page, where the `scripts/checkout.js` script manages the checkout process. The `scripts/checkout/orderSummary.js` and `scripts/checkout/paymentSummary.js` scripts render the order and payment summaries.
4. **Placing Orders**: When users place an order, the `data/orders.js` script adds the order to the orders list and saves it to localStorage.
5. **Viewing Orders**: Users can view their past orders on the `orders.html` page, which is rendered by the `scripts/orders.js` script.
6. **Tracking Orders**: Users can track the status of their orders on the `tracking.html` page, which is rendered by the `scripts/tracking.js` script.

## Dependencies
- **dayjs**: Used for date and time manipulation in order tracking and delivery calculations.

## Notes
- All data is stored in localStorage, so it will persist across page reloads but will be cleared if the browser cache is cleared.
