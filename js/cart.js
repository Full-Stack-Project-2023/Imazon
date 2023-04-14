$(document).ready(function () {
    $('#cart').click(function () {
        let totalPrice = 0;

        $body = $('#body');
        $body.empty();
        $body.append('<h1 style="text-align: center;">Cart</h1>');
        const $productGrid = $('<div>', {
            'id': 'product-grid'
        });

        const items = JSON.parse(localStorage.getItem('cart')) || [];

        // Loop through items and append to body using product-card
        items.forEach(function (item) {
            const $productCard = $('<product-card>', {
                'id': item.id,
                'title': item.title,
                'price': item.price,
                'image': item.image
            });
            $productGrid.append($productCard);
            totalPrice += parseFloat($productCard.attr('price'));
        });
        $totalPrice = $('<p style="text-align: center;">Total Price: ' + totalPrice.toFixed(2) + '</p>'); 
        $body.append($totalPrice);
        $body.append($productGrid);
    });
});