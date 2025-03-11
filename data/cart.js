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
                productId: String(productId), // Pastikan dalam bentuk string
                quantity: Number(productQuantity), // Pastikan dalam bentuk number
                deliveryOptionId: String(1), // Pastikan dalam bentuk string
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
            matchingItem.quantity = Number(newQuantity); // Pastikan dalam bentuk number
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
            matchingItem.deliveryOptionId = String(deliveryOptionId); // Pastikan dalam bentuk string
            this.saveStorage();
        }
    }

    getItems() {
        // Pastikan semua item memiliki tipe data yang benar sebelum dikembalikan
        return Array.from(this.cartItems.values()).map(item => ({
            productId: String(item.productId),
            quantity: Number(item.quantity),
            deliveryOptionId: String(item.deliveryOptionId),
        }));
    }
    clearCart() {
        this.cartItems.clear(); // Clear the Map
        this.saveStorage(); // Update local storage
    }
}

const cart = new Cart('cart');

// export function loadCart(callback) {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", "https://supersimplebackend.dev/cart");
//     xhr.send();

//     xhr.addEventListener("load", () => {
//         console.log(xhr.response);
//         callback();
//     });
// }

export async function loadCart() {
    try{
    const response = await fetch("https://supersimplebackend.dev/cart");
    const cart = await response.text();
    console.log(cart);
    return cart;
    }
    catch(error){
        console.log("Error loading cart:", error);
        alert("Failed to load cart. Please try again later.");
    }
}

export default cart;
