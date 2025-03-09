import formatCurrencies from "../scripts/utils/money.js";

export function getProduct(productId) {
  const product = products.find(product => product.id === productId);
  return product;
}

class Product {
  constructor(productDetail) {
    this.id = productDetail.id;
    this.image = productDetail.image;
    this.name = productDetail.name;
    this.rating = productDetail.rating;
    this.priceCents = productDetail.priceCents;
    this.keywords = productDetail.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPriceDollars() {
    return formatCurrencies(this.priceCents);
  }

  extraInfoHTML() {
    return "";
  }
}

class Fashion extends Product {
  constructor(productDetail) {
    super(productDetail);
    this.category = "fashion";
    this.sizeChartLink = productDetail.sizeChartLink || "images/clothing-size-chart.png"; 
  }
  extraInfoHTML() {
    return `<a href="${this.sizeChartLink}" target="_blank">Size Chart</a>`;
  }
}

class Electronics extends Product {
  constructor(productDetail) {
    super(productDetail);
    this.category = "electronics";
    this.instructionsLink = productDetail.instructions || "images/appliance-instructions.png";
    this.warrantyLink = productDetail.warranty || "images/appliance-warranty.png";
  }
  extraInfoHTML() {
    return `<a href="${this.instructionsLink}" target="_blank">Instructions</a> | <a href="${this.warrantyLink}" target="_blank">Warranty</a>`;
  }
}

class Home extends Product {
  constructor(productDetail) {
    super(productDetail);
    this.category = "home";
  }
}

class Sports extends Product {
  constructor(productDetail) {
    super(productDetail);
    this.category = "sports";
  }
}

export let products = [];
export function loadProduct(callback) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "backend/products.json");
  xhr.send();

  xhr.addEventListener("load", function () {
        products = JSON.parse(xhr.response).map((productDetail) => {
          switch (productDetail.category) {
            case "fashion":
              return new Fashion(productDetail);
            case "electronics":
              return new Electronics(productDetail);
            case "home":
              return new Home(productDetail);
            case "sports":
              return new Sports(productDetail);
            default:
              return new Product(productDetail);
          }
        });
        callback();
  });
}