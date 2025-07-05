// Obtenemos el carrito del localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para actualizar y mostrar el carrito
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count'); // Contador de productos

    // Limpiamos el contenido previo del carrito
    cartItems.innerHTML = '';

    let total = 0;

    // Recorremos el carrito y lo mostramos
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('cart-item');
        itemDiv.innerHTML = `<p>${item.name} - S/. ${item.price} <button class="remove-item" data-index="${index}">Eliminar</button></p>`;
        cartItems.appendChild(itemDiv);
        total += parseFloat(item.price);
    });

    // Actualizamos el total
    cartTotal.innerHTML = `Total: S/. ${total.toFixed(2)}`;

    // Actualizamos el contador de productos en el botón
    cartCount.textContent = cart.length;

    // Guardamos el carrito actualizado en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Añadir al carrito
const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = button.getAttribute('data-price');

        // Añadimos el producto al carrito
        cart.push({ name, price });
        updateCart();
    });
});

// Mostrar el carrito cuando se hace clic en el botón
document.getElementById('cart-button').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'flex';
});

// Cerrar el carrito
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('cart-modal').style.display = 'none';
});

// Eliminar producto del carrito
document.getElementById('cart-items').addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-item')) {
        const index = e.target.getAttribute('data-index');
        cart.splice(index, 1); // Eliminar el producto del carrito
        updateCart(); // Actualizar el carrito
    }
});

// Vaciar el carrito
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    updateCart();
});

// Inicializamos el carrito al cargar la página
updateCart();
