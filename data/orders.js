export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
    orders.unshift(order);
    saveStorage();
}
function saveStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId){
  const order = orders.find(order => order.id === orderId);
  return order;
}