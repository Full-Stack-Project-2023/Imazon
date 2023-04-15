$(document).ready(function() {
  $.getJSON('products.json', function(products) {
    products.forEach(function(product) {
      const $productCard = $('<product-card>', {
        'id': product.id,
        'title': product.title,
        'price': product.price,
        'image': product.image,
        'type' : 'home'
      });
      $('#product-grid').append($productCard);
    });
  });
});