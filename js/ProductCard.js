class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['id', 'title', 'price', 'image', 'type'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    const id = this.getAttribute('id');
    const title = this.getAttribute('title');
    const price = this.getAttribute('price');
    const image = this.getAttribute('image');
    const type = this.getAttribute('type');
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');

    const cartItem = cart.find(item => item.id === id);
    let quantity = 1;
    if (cartItem) {
      quantity = cartItem.quantity;
    }

    let addToCartButton = `
      <button id="add-to-cart-${id}">Add to Cart</button>
    `;

    if (type === 'cart') {
      addToCartButton = `
        <div>
          <p>Quantity: <span id="quantity-${id}">1</span></p>
          <button id="decrease-quantity-${id}" class="change">-</button>
          <button id="increase-quantity-${id}" class="change">+</button>
        </div>
      `;
    }

    this.shadowRoot.innerHTML = `
      <style>
      .product-card {
        width: auto;
        margin: 10px;
        border: 3px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        text-align: center;
        height: 100%;
        max-width: 100%;
        box-sizing: border-box;
      }
      
      .product-card img {
          max-width: 80%;
          height: auto;
          margin-bottom: 10px;
      }
      
      .product-card:hover {
          background-color: rgb(175, 233, 233);
      }
      
      button {
          width: 100px;
          height: 30px;
          border-radius: 100px;
      }
      
      button:hover {
          background-color: bisque;
      }
      </style>
      <div class="product-card">
        <img src="${image}" alt="${title}">
        <div class="product-info">
          <h3>${title}</h3>
          <p>$${price}</p>
          ${addToCartButton}
        </div>
      </div>
    `;

    if (type === 'cart') {
      const $quantity = this.shadowRoot.querySelector(`#quantity-${id}`);
      const $decreaseButton = this.shadowRoot.querySelector(`#decrease-quantity-${id}`);
      const $increaseButton = this.shadowRoot.querySelector(`#increase-quantity-${id}`);

      $quantity.textContent = quantity;

      function updateTotalPrice() {
        let totalPrice = 0;
        $('product-card').each(function () {
          const $productCard = $(this);
          const price = parseFloat($productCard.attr('price'));
          const itemId = $productCard.attr('id');
          const storedItem = cart.find(item => item.id === itemId);
          const quantity = storedItem ? parseFloat(storedItem.quantity) : 0;
          totalPrice += price * quantity;
        });
        $('p.total-price').text('Total Price: ' + totalPrice.toFixed(2));
      }

      $decreaseButton.addEventListener('click', () => {
        cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartItem = cart.find(item => item.id === id);
        cartItem.quantity = cartItem.quantity - 1;
        $quantity.textContent = cartItem.quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateTotalPrice();
        if (cartItem.quantity == 0) {
          const index = cart.findIndex(item => item.id === id);
          if (index !== -1) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            $(`#${id}`).remove();
          }
        }
      });

      $increaseButton.addEventListener('click', () => {
        cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const cartItem = cart.find(item => item.id === id);
        if (cartItem) {
          cartItem.quantity = cartItem.quantity + 1;
          $quantity.textContent = cartItem.quantity;
        } 
        localStorage.setItem('cart', JSON.stringify(cart));
        updateTotalPrice();
      });
    } else {
      const $addToCartButton = this.shadowRoot.querySelector(`#add-to-cart-${id}`);
      $addToCartButton.addEventListener('click', () => {
        let cart = JSON.parse(localStorage.getItem('cart') || '[]');
        let cartItem = cart.find(item => item.id === id);

        if (cartItem) {
          cartItem.quantity += 1;
        } else {
          cartItem = { id, title, price, image, quantity: 1 };
          cart.push(cartItem);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
      });
    }
  }
}

customElements.define('product-card', ProductCard);
