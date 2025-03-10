import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
import { loadCart }  from "../data/cart.js";

async function loadPage() {
    try{
        await loadProducts();
        await new Promise(resolve => loadCart(() => resolve())); 
        renderCheckoutHeader();
        renderOrderSummary();
        renderPaymentSummary();
    } catch (error) {
        console.error("Error loading products:", error);
        alert("Failed to load products. Please try again later."); // Memberikan alert kepada user
    }
}

loadPage();



