const initialCartItems = [
  {
    id: 1,
    name: "Laptop",
    price: 1200.0,
    quantity: 1,
    image: "https://via.placeholder.com/400x300?text=Premium+Leather+Bag",
  },

  {
    id: 2,
    name: "Headphones",
    price: 150.0,
    quantity: 1,
    image: "https://via.placeholder.com/400x300?text=Premium+Leather+Bag",
  },

  {
    id: 3,
    name: "Mouse",
    price: 25.0,
    quantity: 1,
    image: "https://via.placeholder.com/400x300?text=Premium+Leather+Bag",
  },

  {
    id: 4,
    name: "Airpods",
    price: 120.0,
    quantity: 1,
    image: "https://via.placeholder.com/400x300?text=Premium+Leather+Bag",
  },
  {
    id: 5,
    name: "Cable",
    price: 10.0,
    quantity: 1,
    image: "https://via.placeholder.com/400x300?text=Premium+Leather+Bag",
  },

  {
    id: 6,
    name: "Keyboard",
    price: 50.0,
    quantity: 1,
    image: "https://via.placeholder.com/400x300?text=Premium+Leather+Bag",
  },

  {
    id: 7,
    name: "Smart Watch",
    price: 70.0,
    quantity: 1,
    image: "https://via.placeholder.com/400x300?text=Premium+Leather+Bag",
  },

  {
    id: 8,
    name: "Pen Drive",
    price: 11.0,
    quantity: 1,
    image: "https://via.placeholder.com/400x300?text=Premium+Leather+Bag",
  },
];
// console.log(initialCartItems);

// const initialCartItems = [];

// DOM Elements
const cartItemsContainer = document.querySelector(".cart-items-container");
const totalEle = document.getElementById("cart-total");
const checkoutBtn = document.getElementById("checkout-btn");
const cartTotalEle = document.getElementById("cart-total");

function initializeCart(items) {
  localStorage.clear();
  localStorage.setItem("cartItems", JSON.stringify(items));
}

document.addEventListener("DOMContentLoaded", () => {
  initializeCart(initialCartItems);
  displayCartItems();
});

// Event Listener for checkOut Button
checkoutBtn.addEventListener("click", () => {
  const cartTotal = calculateTotalPrice();
  if (!cartTotal > 0) {
    alert("Sorry, can't proceed! Your cart is empty.");
    cartItemsContainer.innerHTML = `<p>Your cart is empty! Explore our 
    <a href="./products.html">products</a> section to add items to the cart.</p>
    `;
  } else {
    alert("Proceeding to checkout");
    localStorage.setItem("cartItems", JSON.stringify([]));
    cartItemsContainer.innerHTML = `<p>Thank You for your purchase! You might also enjoy some of our related 
    products — discover more <a href="./products.html">here.</a></p>
    `;
    calculateTotalPrice();
  }
});

function displayCartItems() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  if (cartItems.length > 0) {
    cartItemsContainer.innerHTML = "";
    cartItems.forEach((item, index) => {
      const itemCard = `<div class="col-xl-3 col-md-4 col-sm-6 mb-4" id="item-Cont">
             <div class="card h-100">
                  <img src="${
                    item.image
                  }" class="card-img-top" alt="cart item image">
                  <div class="card-body">
                        <h5 class="card-title">${item.name}</h5>
                        <p class="card-text">$${item.price.toFixed(2)}</p>
                        <div class="actions">
                        <input type="number" class="cart-quantity ${
                          item.name
                        }" name="cartQuantity" min="1" max="100" value="${
        item.quantity
      }" />
                        <button type="button" class="btn btn-danger remove-btn ${
                          item.name
                        }">Remove</button>
                        </div>
                  </div>
              </div>    
           </div>`;
      cartItemsContainer.insertAdjacentHTML("beforeend", itemCard);
      // style="width: 32%;"

      const itemContainer = cartItemsContainer.querySelector(
        "#item-Cont:last-of-type"
      );
      const quantityInput = itemContainer.querySelector(".cart-quantity");
      const removeBtn = itemContainer.querySelector(".remove-btn");

      //   Event Listeners for quantityInput & RemoveBtn
      quantityInput.addEventListener("change", (event) => {
        item.quantity = event.target.value;
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        // console.log(cartItems);
        displayCartItems();
      });

      removeBtn.addEventListener("click", () => {
        cartItems.splice(index, 1);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        // console.log(cartItems);
        displayCartItems();
      });
    });

    calculateTotalPrice();
  } else {
    cartItemsContainer.innerHTML = `<p>Your cart is empty! Explore our
    <a href="./products.html">products</a> section to add items to the cart.</p>
    `;
  }
}

// function to calculate Total price
function calculateTotalPrice() {
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const totalPrice = cartItems.reduce((acc, item, index) => {
    acc = acc + Number(item.price.toFixed(2)) * item.quantity;
    return acc;
  }, 0);
  cartTotalEle.textContent = `Total : $${totalPrice.toFixed(2)}`;
  return totalPrice;
}
