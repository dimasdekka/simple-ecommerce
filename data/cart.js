export let carts = JSON.parse(localStorage.getItem('carts') || '[]');

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
            quantity: productQuantity
        });
    }
    saveStorage();
}

export function removeCartItem(productId) {
const cartItems = [];
carts.forEach((cart)=>{
    if(cart.productId !== productId){
    cartItems.push(cart)    
    }
 });
carts = cartItems;
saveStorage();
}