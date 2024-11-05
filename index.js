//
localStorage.clear();
displayFeaturedProducts();
displayFeaturesTable();

async function displayFeaturedProducts() {
  const productsCont = document.getElementById("products-grid-container");
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();

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

async function displayFeaturesTable() {
  const tBodyEle = document.querySelector("tbody");

  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    data.slice(0, 5).forEach((p) => {
      const tbody = `<tr>
            <td>${p.title}</td>
            <td>${p.price}</td>
            <td>${p.description}</td>
            <td>N/A</td>
            <td>N/A</td>
          </tr>`;
      tBodyEle.insertAdjacentHTML("beforeend", tbody);
    });
  } catch (error) {
    console.log(error);
  }
}
