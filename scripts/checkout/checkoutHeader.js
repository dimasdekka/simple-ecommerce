import cart from "../../data/cart.js";// Create an instance of the Cart class

export function renderCheckoutHeader() {
    const checkoutHeaderHTML = `
      <div class="header-content">
        <div class="header-left-section">
          <a href="index.html">
            <span class="site-name">ShopStyle</span>
          </a>
        </div>

        <div class="header-middle-section">
          Checkout (<a class="return-to-home-link"
            href="index.html">${cart.counterCartQuantity()}</a>)
        </div>

        <div class="header-right-section">
          <img src="images/icons/checkout-lock-icon.png">
        </div>
      </div>
    `;
  
    document.querySelector('.js-checkout-header')
      .innerHTML = checkoutHeaderHTML;
}
