import { carts, removeCartItem, updateQuantity, CounterCartQuantity, updateDeliveryOption, saveStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import formatCurrencies from "./utils/money.js";
import {deliveryOptions} from "../data/deliveryOptions.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

let cartsHTML = ""; 
carts.forEach(cartItem => {
    const productId = cartItem.productId;
    let matchingProduct;
    products.forEach((product) => {
        if(product.id === productId) {
            matchingProduct = product;
        } 
    });

    const deliveryOptionId = cartItem.deliveryOptionId; // Use deliveryOptionId
    if (deliveryOptionId === undefined) {
        console.error("Delivery options ID is undefined for cart item:", cartItem);
        return; // Skip this cart item if deliveryOptionId is undefined
    }

    let deliveryOption;
    deliveryOptions.forEach(option => {
        if(option.id == deliveryOptionId){ // Use deliveryOptionId
            deliveryOption = option;
        }
    });

    const today = dayjs();
    if (deliveryOption) {
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'd');
        const dateString = deliveryDate.format('dddd, D MMMM'); 

        if (matchingProduct) {
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
                  </div>
            `;
        } else {
            console.error("Matching product not found for ID:", productId);
        }
    } else {
        console.error("Delivery option not found for ID:", deliveryOptionId); // Use deliveryOptionId
    }
});

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html= "";
  deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, 'd');
      const dateString = deliveryDate.format('dddd, D MMMM'); 
      const priceString = deliveryOption.price === 0 ? 'FREE Shipping' : `$${formatCurrencies(deliveryOption.price)}- Shipping`;
      
      let isChecked = cartItem.deliveryOptionId == deliveryOption.id; // Pastikan nilai yang benar digunakan

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

CounterCartQuantity();

document.querySelector('.order-summary').innerHTML = cartsHTML;

// delete
document.querySelectorAll('.delete-quantity-link')
  .forEach((link) => {
      link.addEventListener('click', (link) => {
          const productId = link.target.dataset.productId;
          removeCartItem(productId);
          const container = document.querySelector(`.cart-item-container-${productId}`);
          container.remove();
          CounterCartQuantity();
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
              updateQuantity(productId, newQuantity);
              const quantityLabel = container.querySelector('.quantity-label');
              quantityLabel.textContent = newQuantity;
              quantityInput.value = '';
              
              CounterCartQuantity();
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
    updateDeliveryOption(productId, deliveryOptionId);
    location.reload();
  });
});
