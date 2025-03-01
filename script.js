const cards = document.getElementById('cards');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartPage = document.getElementById('cartPage');
const cartItems = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const clearAllButton = document.getElementById('clearAllButton');
const backButton = document.getElementById('backButton');

// Mahsulotlarni ko'rsatish
let cart = [];
fetch("https://fakestoreapi.com/products?limit=10")
  .then(res => res.json())
  .then(data => {
    const products = data;
    showProducts(products);
  });

function showProducts(products) {
  cards.innerHTML = '';
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <h3>${product.title}</h3>
      <img src="${product.image}">
      <p>${product.price}$</p>
      <p>${product.category}</p>
      <button class="buyButton" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}">Buy</button>
    `;
    cards.appendChild(card);
  });

  // Buy tugmasiga event listener qo'shish
  const buyButtons = document.querySelectorAll('.buyButton');
  buyButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const productId = event.target.dataset.id;
      const productTitle = event.target.dataset.title;
      const productPrice = event.target.dataset.price;
      addToCart(productId, productTitle, productPrice);
    });
  });
}

// Mahsulotni korzinkaga qo'shish
function addToCart(id, title, price) {
  const product = { id, title, price };
  cart.push(product);
  updateCart();
}

// Korzinkani yangilash
function updateCart() {
  cartCount.innerText = cart.length;
  
  // Korzinkadagi mahsulotlarni ko'rsatish
  cartItems.innerHTML = '';
  let totalPrice = 0;
  cart.forEach(item => {
    const itemElement = document.createElement('p');
    itemElement.textContent = `${item.title} - ${item.price}$`;
    cartItems.appendChild(itemElement);
    totalPrice += parseFloat(item.price);
  });

  totalPriceElement.innerText = `Total: ${totalPrice.toFixed(2)}$`;
}

// Clear All tugmasiga event listener qo'shish
clearAllButton.addEventListener('click', () => {
  cart = []; // Korzinkani tozalash
  updateCart();
  alert('All items have been removed from the cart!');
});

// Korzinkaga o'tish
cartIcon.addEventListener('click', () => {
  cartPage.style.display = 'block';
});

// Back to Products tugmasiga event listener qo'shish
backButton.addEventListener('click', () => {
  cartPage.style.display = 'none';
});
