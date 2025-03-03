import { carts, CounterCartQuantity } from "../../data/cart.js";
import { getProduct} from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import formatCurrencies from "../utils/money.js";

export function renderPaymentSummary(){
    let productPriceCents = 0;
    let deliveryPriceCents = 0;
    carts.forEach(cartItem => {
        // item
        const product = getProduct(cartItem.productId);
        console.log(product);
        productPriceCents +=  product.priceCents * cartItem.quantity;

        //shipping
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
        deliveryPriceCents += deliveryOption.priceCents;
    });
    const totalBeforeTax = productPriceCents + deliveryPriceCents;
    const tax = totalBeforeTax * 0.10;
    const total = totalBeforeTax + tax;
    
    const paymentSummaryHTML = `
                        <div class="payment-summary">
                            <div class="payment-summary-title">
                                Order Summary
                            </div>

                            <div class="payment-summary-row">
                                <div>Items (${CounterCartQuantity()}):</div>
                                <div class="payment-summary-money">$${formatCurrencies(productPriceCents)}</div>
                            </div>

                            <div class="payment-summary-row">
                                <div>Shipping &amp; handling:</div>
                                <div class="payment-summary-money">$${formatCurrencies(deliveryPriceCents)}</div>
                            </div>

                            <div class="payment-summary-row subtotal-row">
                                <div>Total before tax:</div>
                                <div class="payment-summary-money">$${formatCurrencies(totalBeforeTax)}</div>
                            </div>

                            <div class="payment-summary-row">
                                <div>Estimated tax (10%):</div>
                                <div class="payment-summary-money">$${formatCurrencies(tax)}</div>
                            </div>

                            <div class="payment-summary-row total-row">
                                <div>Order total:</div>
                                <div class="payment-summary-money">$${formatCurrencies(total)}</div>
                            </div>

                            <button class="place-order-button">
                                Place your order
                            </button>
                            </div>
                        `

    document.querySelector('.payment-summary').innerHTML = paymentSummaryHTML;
}

renderPaymentSummary()