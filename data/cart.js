export const carts = [
    {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
    },{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
    }
];

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
}