import { getOrder, orders } from "../data/orders.js";
import {getProduct, loadProducts} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadPage(){
    await loadProducts();
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    const productId = urlParams.get('productId');
    
    const order = getOrder(orderId);
    const product = getProduct(productId);
    
    let productDetails;
    order.products.forEach(detail => {
        if(detail.productId === product.id) {
            productDetails = detail;
        }
    });

    const today = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
    const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;
    
    let trackingHtml = `
          <div class="order-tracking">
            <a class="back-to-orders-link" href="orders.html">
              ← Back to orders
            </a>
    
            <div class="delivery-date">
              Arriving on ${
                dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')
              }
            </div>
    
            <div class="product-info">
              ${product.name}
            <div class="product-info">
              Quantity: ${productDetails.quantity}
            </div>
    
            <img class="product-image" src="${product.image}">
    
            <div class="progress-labels-container">
              <div class="progress-label
                ${
                  (percentProgress < 50) ? 'current-status' : ''
                }">
                Preparing
              </div>
              <div class="progress-label 
              ${
                (percentProgress >= 50 && percentProgress < 100) ? 'current-status' : ''
              }">
                Shipped
              </div>
              <div class="progress-label
              ${
                (percentProgress >= 100) ? 'current-status' : ''
              }">
                Delivered
              </div>
            </div>
    
            <div class="progress-bar-container">
              <div class="progress-bar" style="width: ${percentProgress}%;"></div>
            </div>
          </div>
        `;

    document.querySelector('.main').innerHTML = trackingHtml;
}

loadPage();