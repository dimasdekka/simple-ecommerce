export let carts = JSON.parse(localStorage.getItem('carts') || '[]');
let timeouts = {};

export function saveStorage(){
    localStorage.setItem('carts', JSON.stringify(carts));
}

export function addToCart(productId) {
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    
    // Default quantity 1 jika tidak ada selector atau value tidak valid
    let productQuantity = 1;

    if (quantitySelector) {
        const inputValue = Number(quantitySelector.value);
        if (!isNaN(inputValue) && inputValue > 0) {
            productQuantity = inputValue;
        }
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

    return quantityCounter;
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