import cart from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";

let productHTML = '';
let timeouts = {}; // Object to store timeouts per product

// Load products and render them
loadProducts().then(() => {
  renderProducts(); 
});
// Function to render products based on category
function renderProducts(category = "all") {
  // Clear existing products
  productHTML = '';

  const input = document.querySelector('.search-bar');
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search') || '';
  input.value = search; // Set value input dari URL

  // Filter produk berdasarkan pencarian
  let filteredProducts = products;

  // Filter berdasarkan kategori jika bukan "all"
  if (category !== "all") {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }

  // Filter berdasarkan pencarian jika ada nilai search
  if (search) {
    filteredProducts = filteredProducts.filter(product =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }
  // Generate HTML for filtered products
  filteredProducts.forEach(product => {
    productHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image" src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars" src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPriceDollars()}
        </div>

        <div class="product-quantity-container">
          <select class="js-quantity-selector-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-size-chart">
          ${product.extraInfoHTML()}
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-${product.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary" data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });

  // Render products
  document.querySelector('.products-grid').innerHTML = productHTML;

  // Add event listeners for "Add to Cart" buttons
  document.querySelectorAll('.add-to-cart-button').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      cart.addToCart(productId);
      showAddedMessage(productId);
      cart.counterCartQuantity();
    });
  });
}

// Function to show "Added" message
function showAddedMessage(productId) {
  const addedElement = document.querySelector(`.js-added-${productId}`);
  if (!addedElement) return; // Ensure the element exists

  // Show "Added" message
  addedElement.style.opacity = "1";

  // Clear previous timeout (if any)
  if (timeouts[productId]) {
    clearTimeout(timeouts[productId]);
  }

  // Hide message after 1.5 seconds
  timeouts[productId] = setTimeout(() => {
    addedElement.style.opacity = "0";
  }, 1500);
}

// Add event listeners to category buttons
document.querySelectorAll('.category').forEach((categoryButton) => {
  categoryButton.addEventListener('click', () => {
    const category = categoryButton.dataset.category;
    renderProducts(category);
  });
});

// Fungsi pencarian
function searchProducts() {
  const search = document.querySelector('.search-bar').value;
  window.location.href = `index.html?search=${search}`;
}

// Event listener untuk tombol search
document.querySelector('.search-button').addEventListener('click', searchProducts);

// Event listener untuk enter di search input
document.querySelector('.search-bar').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    searchProducts();
  }
});



// Update cart quantity on page load
cart.counterCartQuantity();