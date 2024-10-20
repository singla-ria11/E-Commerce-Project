//

displayFeaturedProducts();

async function displayFeaturedProducts() {
  const productsCont = document.getElementById("products-grid-container");
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log(data);

    if (data.length > 0) {
      //   productsCont.innerHTML = "";
      data.slice(0, 10).forEach((prod) => {
        const productDiv = document.createElement("div");
        productDiv.className = "product";
        const productData = `<img
            src=${prod.image} alt="image for ${prod.title}" height="100px" width="100px"
          />
          <h3>${prod.title}</h3>
          <p>$${prod.price}</p>`;
        productDiv.innerHTML = productData;
        productsCont.appendChild(productDiv);
      });
    } else {
      productsCont.innerHTML = `<p>No products Available</p>`;
    }
  } catch (error) {
    console.log(error);
  }
}
