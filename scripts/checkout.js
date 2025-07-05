// Recuperamos el carrito del localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = 0; // total global

// Función para mostrar los productos en el checkout
function updateCheckout() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total');

    checkoutItems.innerHTML = '';
    total = 0; // reiniciamos total

    cart.forEach((item) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('checkout-item');
        itemDiv.innerHTML = `<p>${item.name} - S/. ${item.price}</p>`;
        checkoutItems.appendChild(itemDiv);
        total += parseFloat(item.price);
    });

    checkoutTotal.innerHTML = `Total: S/. ${total.toFixed(2)}`;
}

// Proceso de pago
document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;

    if (name && cart.length > 0) {
        alert('Pago realizado con éxito. ¡Gracias por tu compra!');

        // Guardar en historial con los datos pedidos
        const purchase = {
            date: new Date(),             // <-- Fecha y hora actual
            product: name,                // nombre del titular
            quantity: cart.length,        // cantidad de productos
            total: total.toFixed(2)       // total formateado
        };

        let purchaseHistory = JSON.parse(localStorage.getItem('purchaseHistory')) || [];
        purchaseHistory.push(purchase);
        localStorage.setItem('purchaseHistory', JSON.stringify(purchaseHistory));

        // Vaciar carrito
        localStorage.removeItem('cart');
        cart = [];
        updateCheckout();
    } else {
        alert('Por favor, completa el nombre y asegúrate de tener productos en el carrito.');
    }
});

// Inicializar el checkout al cargar
updateCheckout();
