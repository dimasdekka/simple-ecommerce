export let carts = JSON.parse(localStorage.getItem('carts') || '[]');
let timeouts = {};

export function saveStorage(){
    localStorage.setItem('carts', JSON.stringify(carts));
}

export function addToCart(productId) {
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    if (!quantitySelector) {
        console.error(`Quantity selector for product ${productId} not found`);
        return;
    }
    
    let productQuantity = Number(quantitySelector.value);
    if (productQuantity <= 0) {
        console.error('Quantity must be greater than 0');
        return;
    }

    let productExists = false;
    carts.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            cartItem.quantity += productQuantity;
            productExists = true;
        }
    });

    if (!productExists) {
        carts.push({
            productId: productId,
            quantity: productQuantity,
            deliveryOptionId: 1,
        });
    }
    console.log(carts);
    
    saveStorage();
}

export function showAddedMessage(productId) {
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
}

export function CounterCartQuantity() {
    let quantityCounter = 0;
    carts.forEach(cartItem => {
        quantityCounter += cartItem.quantity;
        
    });

    // Update cart quantity in shop page
    const cartQuantityElement = document.querySelector('.cart-quantity');
    if (cartQuantityElement) {
        cartQuantityElement.innerHTML = quantityCounter;
    }

    // Update cart quantity in other pages
    const returnToHomeLink = document.querySelector('.return-to-home-link');
    if (returnToHomeLink) {
        returnToHomeLink.innerHTML = `${quantityCounter} items`;
    }
}

export function updateQuantity (productId, newQuantity) {
    let matchingItem;
    carts.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.quantity = newQuantity;
    saveStorage();
  }

  export function removeCartItem(productId) {
    carts = carts.filter(cart => cart.productId !== productId);
    saveStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;
    carts.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    saveStorage();
}