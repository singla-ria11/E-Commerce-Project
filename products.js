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

const productsDiv = document.getElementById("product-list");

products.forEach((p) => {
  const productCard = `<div class="col-lg-3 col-md-4 col-sm-6 mb-4">
         <div class="card h-100" style="width: 18rem">
           <img src=${p.image} class="card-img-top" alt="product image" />
           <div class="card-body">
            <h5 class="card-title">${p.name}</h5>
            <p class="card-text">
              ${p.description}
            </p>
            <p class="card-text">$${p.price}</p>
            <a href="#" class="btn btn-primary">Add to Cart</a>
           </div>
          </div>
        </div>`;
  productsDiv.insertAdjacentHTML("beforeend", productCard);
});
