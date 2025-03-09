import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProduct } from "../data/products.js";
import  cart, { loadCart }  from "../data/cart.js";

Promise.all([
    new Promise(resolve => loadProduct(() => resolve())),
    new Promise(resolve => loadCart(() => resolve()))
]).then(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
});


