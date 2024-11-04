// DOM Elements
const searchInputEle = document.getElementById("searchInput");
const selectRangeEle = document.getElementById("priceRange");
const productsDiv = document.getElementById("product-list");

// class for products
class Product {
  constructor(name, description, image, price) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.price = Number(price);
  }
  display() {
    return `<div class="col-xl-3 col-md-4 col-sm-6 mb-4">
         <div class="card h-100">
            <img src=${this.image} class="card-img-top" alt="product image" />
            <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">
              ${this.description}
            </p>
            <p class="card-text fw-semibold">$${this.price.toFixed(2)}</p>
            <div class="d-flex align-items-center flex-lg-row flex-sm-column gap-2">
              <input type="number" class="product-quantity w-25" name="productQuantity" min="1" max="100" value="1"/>
              <a href="#" class="btn btn-primary cart-btn ">Add to Cart</a>
            </div>
          </div>
        </div>`;
  }
}

// discounted Product class
class DiscountedProduct extends Product {
  constructor(name, description, image, price, discount) {
    super(name, description, image, price, discount);
    this.discount = Number(discount);
  }
  display() {
    const discountedPrice = (
      this.price -
      (this.discount / 100) * this.price
    ).toFixed(2);
    return `<div class="col-xl-3 col-md-4 col-sm-6 mb-4">
         <div class="card h-100">
            <img src=${this.image} class="card-img-top" alt="product image" />
            <div class="card-body">
            <h5 class="card-title">${this.name}</h5>
            <p class="card-text">
              ${this.description}
            </p>
            <p class="card-text fw-semibold">$${discountedPrice} &nbsp;<span class="badge rounded-pill bg-danger">${this.discount}% OFF</span></p>
            <div class="d-flex align-items-center flex-lg-row flex-sm-column gap-2">
              <input type="number" class="product-quantity w-25" name="productQuantity" min="1" max="100" value="1"/>
              <a href="#" class="btn btn-primary cart-btn ">Add to Cart</a>
            </div>
          </div>
        </div>`;
  }
}

// All Event Listeners
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("./products.json");
    const data = await res.json();
    window.products = data;
    displayProducts(data);
    const discountedProduct = new DiscountedProduct(
      "Dummy Discounted Product",
      "There is discount on this product",
      "https://via.placeholder.com/400x300?text=Discounted+Product",
      59.44,
      30
    );
    productsDiv.insertAdjacentHTML("beforeend", discountedProduct.display());
  } catch (error) {
    console.error("Error while fetching products!", error);
    productsDiv.innerHTML = `<div class="alert alert-info" role="alert">
                                  Failed to load products! Please try again.
                              </div>`;
  }
});

searchInputEle.addEventListener("keyup", handleSearchQueryAndFilter);
selectRangeEle.addEventListener("change", handleSearchQueryAndFilter);

// All functions.................

// Function to display the products
function displayProducts(products) {
  productsDiv.innerHTML = "";
  console.log(products);

  products.forEach((p) => {
    const product = new Product(p.name, p.description, p.image, p.price);
    const productCard = product.display();
    productsDiv.insertAdjacentHTML("beforeend", productCard);
  });
}

// Function to filter out the products based on search input & price range
function handleSearchQueryAndFilter(event) {
  try {
    const searchQuery = searchInputEle.value.toLowerCase();
    const priceRange = selectRangeEle.value;
    console.log(searchQuery, priceRange);
    let min = 0;
    let max = Infinity;

    if (priceRange != "") {
      [min, max] = priceRange.split("-");
    }

    const filteredProducts = window.products.filter((prod) => {
      const inputCondition =
        prod.name.toLowerCase().includes(searchQuery) ||
        prod.description.toLowerCase().includes(searchQuery);
      const priceRangeCondition =
        prod.price >= Number(min) && prod.price <= Number(max);
      return inputCondition && priceRangeCondition;
    });
    if (filteredProducts.length == 0) {
      productsDiv.innerHTML = `<div class="alert alert-info" role="alert">
                                  Sorry! No products available with the provided filter. Please try again.
                              </div>`;
      return;
    }
    displayProducts(filteredProducts);
  } catch (error) {
    console.error("Error while filtering out the products!", error);
    productsDiv.innerHTML = `<div class="alert alert-info" role="alert">
                                  Sorry! there is some error while filtering out the products.
                              </div>`;
  }
}
