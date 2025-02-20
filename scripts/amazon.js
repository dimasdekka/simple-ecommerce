import {cart} from "../data/cart";
import {products} from "../data/products.js";
console.log(cart)
console.log(products)

let productHTML = ''
let timeouts = {}; // Objek untuk menyimpan timeout per produk

products.forEach(e => {
    productHTML += `
            <div class="product-container">
                <div class="product-image-container">
                    <img class="product-image"
                    src=${e.image}>
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${e.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars"
                    src="images/ratings/rating-${e.rating.stars * 10}.png">
                    <div class="product-rating-count link-primary">
                    ${e.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    $${(e.priceCents / 100).toFixed(2)}
                </div>

                <div class="product-quantity-container">
                    <select class="js-quantity-selector-${e.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    </select>
                </div>

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-${e.id}">
                    <img src="images/icons/checkmark.png">
                    Added
                </div>

                <button class="add-to-cart-button button-primary"
                data-product-id="${e.id}">
                    Add to Cart
                </button>
                </div>
    `
});

document.querySelector('.products-grid').innerHTML = productHTML;
document.querySelectorAll('.add-to-cart-button')
    .forEach((button)=>{
        button.addEventListener('click', (e)=>{
            const {productId} = button.dataset;
            let productExists = false;
            let quantityCounter = 0;
            let productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
            let addedElement = document.querySelector(`.js-added-${productId}`);

            // Tampilkan "Added"
            addedElement.style.opacity = "1";
             
            if (timeouts[productId]) {
                clearTimeout(timeouts[productId]);
            }
             // Sembunyikan setelah 2 detik
             timeouts[productId] = setTimeout(() => {
                addedElement.style.opacity = "0";
             }, 1500);

            
            cart.forEach((e) => {
                if (productId === e.id) {
                    e.quantity += productQuantity;
                    productExists = true;
                }
            });

            if (!productExists) {
                cart.push({
                    id: productId,
                    quantity: productQuantity
                });
            }
            cart.forEach(e => {
                quantityCounter += e.quantity;
            });
            document.querySelector('.cart-quantity').innerHTML = quantityCounter;
            console.log(cart)
            
        })
    })



