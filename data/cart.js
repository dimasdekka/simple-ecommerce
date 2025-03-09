class Cart {
    #localStorageKey;
    constructor(localStorageKey) {
        this.#localStorageKey = localStorageKey;
        this.cartItems = new Map(); // Use a Map for efficient item lookup
        this.#loadFromStorage();
    }

    #loadFromStorage() {
        const storedItems = JSON.parse(localStorage.getItem(this.#localStorageKey) || '[]');
        storedItems.forEach(item => this.cartItems.set(item.productId, item));
    }

    saveStorage() {
        localStorage.setItem(this.#localStorageKey, JSON.stringify(Array.from(this.cartItems.values())));
    }

    addToCart(productId) {
        const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
        let productQuantity = 1;

        if (quantitySelector) {
            const inputValue = Number(quantitySelector.value);
            if (!isNaN(inputValue) && inputValue > 0) {
                productQuantity = inputValue;
            }
        }

        if (this.cartItems.has(productId)) {
            const existingItem = this.cartItems.get(productId);
            existingItem.quantity += productQuantity;
        } else {
            this.cartItems.set(productId, {
                productId: productId,
                quantity: productQuantity,
                deliveryOptionId: 1,
            });
        }

        this.saveStorage();
    }

    counterCartQuantity() {
        let quantityCounter = Array.from(this.cartItems.values()).reduce((sum, item) => sum + item.quantity, 0);
        const cartQuantityElement = document.querySelector('.cart-quantity');
        if (cartQuantityElement) {
            cartQuantityElement.innerHTML = quantityCounter;
        }
        return quantityCounter;
    }

    updateQuantity(productId, newQuantity) {
        if (this.cartItems.has(productId)) {
            const matchingItem = this.cartItems.get(productId);
            matchingItem.quantity = newQuantity;
            this.saveStorage();
        }
    }

    removeCartItem(productId) {
        this.cartItems.delete(productId);
        this.saveStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        if (this.cartItems.has(productId)) {
            const matchingItem = this.cartItems.get(productId);
            matchingItem.deliveryOptionId = deliveryOptionId;
            this.saveStorage();
        }
    }
}

const cart = new Cart('cart');

export function loadCart(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();

  xhr.addEventListener("load", () => {
        console.log(xhr.response);
        callback();
        });
}

export default cart;
