const url = new URL(window.location.href);
console.log(url.searchParams.get('orderId','productId'));