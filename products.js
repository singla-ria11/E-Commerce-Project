const products = [
  {
    name: "Premium Leather Bag",
    description:
      "Handcrafted leather bag with multiple compartments and adjustable strap. Ideal for daily use or travel.",
    price: 129.99,
    image: "https://via.placeholder.com/400x300?text=Premium+Leather+Bag",
  },

  {
    name: "Smart Watch Series 5",
    description:
      "Advanced smartwatch with GPS, heart rate monitoring, and waterproof design. Comes in multiple colors.",
    price: 199.99,
    image: "https://via.placeholder.com/400x300?text=Smart+Watch+Series+5",
  },

  {
    name: "Wireless Noise Cancellation Headphones",
    description:
      "High-fidelity wireless headphones with active noise cancellation and up to 30 hours of battery life.",

    price: 299.99,
    image: "https://via.placeholder.com/400x300?text=Wireless+Headphones",
  },
  {
    name: "Designer UV Sunglasses",
    description:
      "Fashionable sunglasses with UV protection and scratch-resistant lenses. Available in various styles.",
    price: 79.99,
    image: "https://via.placeholder.com/400x300?text=Designer+Sunglasses",
  },

  {
    name: "Gourmet Coffee Gift Set",
    description:
      "A curated selection of gourmet coffee beans from around the world. Perfect gift for coffee lovers.",
    price: 49.99,
    image: "https://via.placeholder.com/400x300?text=Gourmet+Coffee+Gift+Set",
  },

  {
    name: "Fitness Tracker Bracelet",
    description:
      "Waterproof fitness tracker with heart rate monitor, sleep tracking, and smartphone notifications.",
    price: 89.99,
    image: "https://via.placeholder.com/400x300?text=Fitness+Tracker+Bracelet",
  },
  {
    name: "Portable Bluetooth Speaker",
    description:
      "Compact Bluetooth speaker with powerful sound and built-in microphone for hands-free calls.",
    price: 59.99,
    image: "https://via.placeholder.com/400x300?text=Bluetooth+Speaker",
  },

  {
    name: "Professional Chef's Knife",
    description:
      "High-quality chef's knife made from Damascus steel. Perfect for slicing and dicing in the kitchen.",
    price: 149.99,
    image: "https://via.placeholder.com/400x300?text=Chef's+Knife",
  },
];

// DOM Elements
const searchInputEle = document.getElementById("searchInput");
const selectRangeEle = document.getElementById("priceRange");
const productsDiv = document.getElementById("product-list");

// All Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  displayProducts(products);
});

searchInputEle.addEventListener("keyup", handleSearchQuery);
selectRangeEle.addEventListener("change", handleSearchQuery);

// All functions.................

// Function to display the products
function displayProducts(products) {
  productsDiv.innerHTML = "";
  console.log(products);

  products.forEach((p) => {
    const productCard = `<div class="col-xl-3 col-md-4 col-sm-6 mb-4">
         <div class="card h-100">
           <img src=${p.image} class="card-img-top" alt="product image" />
           <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">
              ${p.description}
            </p>
            <p class="card-text">$${p.price}</p>
            <div class="d-flex align-items-center flex-lg-row flex-sm-column gap-2">
              <input type="number" class="product-quantity w-25" name="productQuantity" min="1" max="100" value="1"/>
              <a href="#" class="btn btn-primary cart-btn ">Add to Cart</a>
            </div>
          </div>
        </div>`;
    productsDiv.insertAdjacentHTML("beforeend", productCard);
  });

  // align-items-center
  // flex-sm-column
}

// Function to filter out the products based on search input & price range
function handleSearchQuery(event) {
  try {
    const searchQuery = searchInputEle.value.toLowerCase();
    const priceRange = selectRangeEle.value;
    console.log(searchQuery, priceRange);

    let min = 0;
    let max = Infinity;

    if (priceRange != "") {
      [min, max] = priceRange.split("-");
    }

    const filteredProducts = products.filter((prod) => {
      const inputCondition =
        prod.name.toLowerCase().includes(searchQuery) ||
        prod.description.toLowerCase().includes(searchQuery);
      const priceRangeCondition =
        prod.price >= Number(min) && prod.price <= Number(max);
      return inputCondition && priceRangeCondition;
    });
    if (filteredProducts.length == 0) {
      productsDiv.innerHTML = `<div class="alert alert-info" role="alert">
                                  Sorry! No products available with provided filter.
                              </div>`;
      return;
    }
    displayProducts(filteredProducts);
  } catch (error) {
    console.log(error);
    productsDiv.innerHTML = `<div class="alert alert-info" role="alert">
                                  Sorry! there is some error while filtering out the products.
                              </div>`;
  }
}
