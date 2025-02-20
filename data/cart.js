export const carts = [];

export function addToCart(productId){
    let productQuantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    let productExists = false;
    carts.forEach((cartItem) => {
        if (productId === cartItem.id) {
            cartItem.quantity += productQuantity;
            productExists = true;
        }
    });

         if (!productExists) {
            carts.push({
            id: productId,
            quantity: productQuantity
        });
    }
}