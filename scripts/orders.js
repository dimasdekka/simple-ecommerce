import { getProduct, loadProducts } from '../data/products.js';
import cart from '../data/cart.js';
import { orders } from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import formatCurrencies from './utils/money.js';

console.log(orders);

async function loadPage() {
  await loadProducts();
  let ordersHTML = ''; // Initialize the variable to store the HTML for all orders

  orders.forEach(order => {
    const orderTimeString = dayjs(order.orderTime).format('MMMM D');

    ordersHTML +=
      `<div class="order-container">
         <div class="order-header">
           <div class="order-header-left-section">
             <div class="order-date">
               <div class="order-header-label">Order Placed:</div>
               <div>${orderTimeString}</div>
             </div>
             <div class="order-total">
               <div class="order-header-label">Total:</div>
               <div>$${formatCurrencies(order.totalCostCents)}</div>
             </div>
           </div>

           <div class="order-header-right-section">
             <div class="order-header-label">Order ID:</div>
             <div>${order.id}</div>
           </div>
         </div>

         <div class="order-details-grid">
           ${productItem(order)} <!-- Pass the current order object to productItem -->
         </div>
       </div>`;
  });

  function productItem(order) {
    let productHtml = '';
    const products = order.products || [];
    // Iterate over order.products (not orders.products)
    products.forEach(productItem => {
      const product = getProduct(productItem.productId); // Use productItem.productId, not productItem.id
      productHtml +=
        `<div class="product-image-container">
        
            <img src="${product.image}">
          </div>
          <div class="product-details">
            <div class="product-name">
              ${product.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: 
              ${dayjs(productItem.estimatedDeliveryTime).format('MMMM D')}
            </div>
            <div class="product-quantity">
              Quantity: ${productItem.quantity}
            </div>
            <button class="button-primary js-buy-again" data-product-id="${product.id}" >
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${product.id}">
              <button class="button-secondary">
                Track package
              </button>
            </a>
          </div>`;
    });
    return productHtml;
  }

  // Render the orders HTML
  document.querySelector('.orders-grid').innerHTML = ordersHTML;
  // document.querySelectorAll('.js-buy-again').forEach((button) => {
  //   button.addEventListener('click', () => {
  //     cart.addToCart(button.dataset.productId);

  //     // (Optional) display a message that the product was added,
  //     // then change it back after a second.
  //     button.innerHTML = 'Added';
  //     setTimeout(() => {
  //       button.innerHTML = `
  //         <img class="buy-again-icon" src="images/icons/buy-again.png">
  //         <span class="buy-again-message">Buy it again</span>
  //       `;
  //     }, 1000);
  //   });
  // });
}

loadPage();