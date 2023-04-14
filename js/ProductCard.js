class ProductCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  static get observedAttributes() {
    return ['id', 'title', 'price', 'image'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this.render();
  }

  render() {
    const id = this.getAttribute('id');
    const title = this.getAttribute('title');
    const price = this.getAttribute('price');
    const image = this.getAttribute('image');

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
          <button id="add-to-cart-${id}">Add to Cart</button>
        </div>
      </div>
    `;

    const $addToCartButton = this.shadowRoot.querySelector(`#add-to-cart-${id}`);
    $addToCartButton.addEventListener('click', () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      cart.push({ id, title, price, image });
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  }
}

customElements.define('product-card', ProductCard);