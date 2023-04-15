$(document).ready(function () {
    $('#cart').click(function () {
        // Initialize variables
        let totalPrice = 0;
        const $body = $('#body');
        const $productGrid = $('<div>', { 'id': 'product-grid' });
        const items = JSON.parse(localStorage.getItem('cart')) || [];

        // Function to update total price
        function updateTotalPrice() {
            totalPrice = 0;
            $('product-card').each(function () {
                const $productCard = $(this);
                const price = parseFloat($productCard.attr('price'));
                const itemId = $productCard.attr('id');
                const storedItem = items.find(item => item.id === itemId);
                const quantity = storedItem ? parseFloat(storedItem.quantity) : 0;
                totalPrice += price * quantity;
            });
            $('p.total-price').text('Total Price: ' + totalPrice.toFixed(2));
        }

        // Loop through items and append to body using product-card
        items.forEach(function (item) {
            const $productCard = $('<product-card>', {
                'id': item.id,
                'title': item.title,
                'price': item.price,
                'image': item.image,
                'type': 'cart'
            });

            $productCard.find('.change').on('click', () => {
                console.log('clicked');
                updateTotalPrice();
            });

            $productGrid.append($productCard);
        });

        // Append elements to the body
        $body.empty().append(
            $('<h1>', { text: 'Cart', style: 'text-align: center;' }),
            $productGrid,
            $('<p>', { text: 'Total Price: ' + totalPrice.toFixed(2), style: 'text-align: center;', class: 'total-price' }),
            $('<button>', { class: 'buy', text: 'Buy Items' })
        );

        // Call updateTotalPrice once at the beginning to set the correct total price
        updateTotalPrice();

    });
});
