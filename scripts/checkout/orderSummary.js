import cart from "../../data/cart.js";
import { getProduct, loadProducts } from "../../data/products.js";
import { renderCheckoutHeader } from "./checkoutHeader.js"; 
import { renderPaymentSummary } from "./paymentSummary.js"; 
import formatCurrencies from "../utils/money.js";
import { deliveryOptions, getDeliveryOption, calculateDeliveryDate } from "../../data/deliveryOptions.js";

export function renderOrderSummary() {
    let cartsHTML = ""; 
    cart.cartItems.forEach(cartItem => {
        const productId = cartItem.productId;
        let matchingProduct = getProduct(productId);
        const deliveryOptionId = cartItem.deliveryOptionId; // Use deliveryOptionId
        let deliveryOption = getDeliveryOption(deliveryOptionId);
        const dateString = calculateDeliveryDate(deliveryOption);  
        
        cartsHTML += `<div class="cart-item-container-${matchingProduct.id}">
                <div class="delivery-date">
                    ${dateString}
                </div>

                <div class="cart-item-details-grid">
                    <img class="product-image"
                        src="${matchingProduct.image}">

                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            $${formatCurrencies(matchingProduct.priceCents)}
                        </div>
                        <div class="product-quantity">
                            <span>
                                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                            </span>
                            <span class="update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                                Update
                            </span>
                            <input class="quantity-input quantity-input-${productId}">
                            <span class="save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
                            <span class="delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
                                Delete
                            </span>
                        </div>
                    </div>
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHTML(matchingProduct, cartItem)}
                    </div>
                </div>
            </div>`;
    });

    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = "";
        deliveryOptions.forEach((deliveryOption) => {
            const dateString = calculateDeliveryDate(deliveryOption); 
            const priceString = deliveryOption.priceCents === 0 ? 'FREE Shipping' : `$${formatCurrencies(deliveryOption.priceCents)}- Shipping`;
            
            let isChecked = cartItem.deliveryOptionId == deliveryOption.id; // Ensure the correct value is used

            html += `<div class="delivery-option js-delivery-option"
                        data-product-id="${matchingProduct.id}"
                        data-delivery-option-id="${deliveryOption.id}">
                        <input type="radio"
                            class="delivery-option-input"
                            name="delivery-option-${matchingProduct.id}"
                            ${isChecked ? "checked" : ""}>
                        <div>
                            <div class="delivery-option-date">
                                ${dateString}
                            </div>
                            <div class="delivery-option-price">
                                ${priceString}
                            </div>
                        </div>
                    </div>`;
        });
        return html;
    }

    cart.counterCartQuantity();
    document.querySelector('.order-summary').innerHTML = cartsHTML;

    // delete
    document.querySelectorAll('.delete-quantity-link')
        .forEach((link) => {
            link.addEventListener('click', (link) => {
                const productId = link.target.dataset.productId;
                cart.removeCartItem(productId);
                renderCheckoutHeader();
                renderOrderSummary();
                renderPaymentSummary();
            });
        });

    // update
    document.querySelectorAll('.update-quantity-link')
        .forEach((link) => {
            link.addEventListener('click', (link) => {
                const productId = link.target.dataset.productId;
                const container = document.querySelector(`.cart-item-container-${productId}`);
                container.classList.add('is-editing-quantity'); 
            });
        });

    // save
    document.querySelectorAll('.save-quantity-link')
        .forEach((link) => {
            const handleSave = (event) => {
                const productId = event.target.dataset.productId;
                const container = document.querySelector(`.cart-item-container-${productId}`);
                container.classList.remove('is-editing-quantity'); 

                const quantityInput = document.querySelector(`.quantity-input-${productId}`);
                const newQuantity = Number(quantityInput.value);

                if (newQuantity >= 0 && newQuantity <= 1000) {
                    cart.updateQuantity(productId, newQuantity);
                    const quantityLabel = container.querySelector('.quantity-label');
                    quantityLabel.textContent = newQuantity;
                    quantityInput.value = '';
                    renderCheckoutHeader();
                    renderPaymentSummary();
                } else {
                    alert('Please enter a valid quantity between 0 and 1000.');
                }
            };

            // Event listener for save button click
            link.addEventListener('click', handleSave);

            // Get input field
            const quantityInput = document.querySelector(`.quantity-input-${link.dataset.productId}`);
            
            // Event listener for pressing Enter in input field
            if (quantityInput) {
                quantityInput.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter') {
                        handleSave({ target: link }); // simulate button click
                    }
                });
            }
        });

    document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
        element.addEventListener('click', () => {
            const productId = element.dataset.productId;
            const deliveryOptionId = element.dataset.deliveryOptionId;
            cart.updateDeliveryOption(productId, deliveryOptionId);
            renderOrderSummary();
            renderPaymentSummary();
        });
    });
}
