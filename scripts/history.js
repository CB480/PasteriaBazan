// Función para mostrar el historial de compras
function showHistory() {
    const historyBody = document.getElementById('history-body');
    const history = JSON.parse(localStorage.getItem('purchaseHistory')) || [];

    if (history.length === 0) {
        const noDataRow = document.createElement('tr');
        noDataRow.innerHTML = '<td colspan="4">No hay compras previas</td>';
        historyBody.appendChild(noDataRow);
    } else {
        history.forEach(purchase => {
            const row = document.createElement('tr');
            const date = new Date(purchase.date);
            row.innerHTML = `
                <td>${date.toLocaleDateString()} ${date.toLocaleTimeString()}</td>
                <td>${purchase.product}</td>
                <td>${purchase.quantity}</td>
                <td>S/. ${purchase.total}</td>
            `;
            historyBody.appendChild(row);
        });
    }
}

// Llamamos a la función para mostrar el historial de compras al cargar la página
document.addEventListener('DOMContentLoaded', showHistory);
