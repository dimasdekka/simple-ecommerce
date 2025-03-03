import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import cart from "../data/cart-oop.js";

renderCheckoutHeader();
renderOrderSummary();
renderPaymentSummary();