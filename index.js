const apiUrl = "https://nxapi-mongodb-jply-xyzv1.vercel.app/api/products";

document.addEventListener("DOMContentLoaded", loadProducts);

async function loadProducts() {
  const response = await fetch(apiUrl);
  const products = await response.json();
  
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach(product => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <img src="${product.imagen}" alt="${product.nombre}">
      <div class="product-info">
        <h3>${product.nombre}</h3>
        <p>${product.descripcion}</p>
        <p><strong>Fecha de entrada:</strong> ${product.fecha_entrada}</p>
        <div class="actions">
          <button class="action-button update" onclick="updateProduct('${product._id}')">Actualizar</button>
          <button class="action-button delete" onclick="deleteProduct('${product._id}')">Eliminar</button>
        </div>
      </div>
    `;
    productList.appendChild(productCard);
  });
}

document.getElementById("product-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const newProduct = {
    nombre: document.getElementById("nombre").value,
    descripcion: document.getElementById("Precio").value,
    imagen: document.getElementById("imagen").value,
    fecha_entrada: document.getElementById("fecha_entrada").value
  };

  console.log(newProduct);

  await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newProduct)
  });

  e.target.reset();
  loadProducts();
});

async function deleteProduct(productId) {
  await fetch(`${apiUrl}/${productId}`, {
    method: "DELETE"
  });
  loadProducts();
}

async function updateProduct(productId) {
  const updatedProduct = {
    nombre: prompt("Nuevo nombre del producto:"),
    descripcion: prompt("Nueva descripción del producto:"),
    imagen: prompt("Nueva URL de la imagen:"),
    fecha_entrada: prompt("Nueva fecha de entrada (YYYY-MM-DD):")
  };

  await fetch(`${apiUrl}/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedProduct)
  });

  loadProducts();
}

