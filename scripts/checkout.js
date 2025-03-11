import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
import { loadCart }  from "../data/cart.js";

async function loadPage() {
    try {
      await Promise.all([
        loadProducts(),
        loadCart()
      ]);
  
      // Only render if there are no errors
      renderCheckoutHeader();
      renderOrderSummary();
      renderPaymentSummary();
  
    } catch (error) {
      console.error('Unexpected error. Please try again later.', error);
      alert('Failed to load the page. Please try again later.');
    }
  }
  
  loadPage();



