document.addEventListener('DOMContentLoaded', () => {
    searchProducts('ofertas');
});

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    searchProducts(query);
});

document.getElementById('search-input').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const query = event.target.value;
        searchProducts(query);
    }
});

async function searchProducts(query) {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`);
    const data = await response.json();
    displayProducts(data.results);
}

function getHighResolutionImageUrl(thumbnail) {
    // Reemplaza el sufijo 'I' o cualquier otro sufijo de baja calidad por 'O' para alta calidad
    return thumbnail.replace('I.jpg', 'O.jpg').replace('W.jpg', 'O.jpg');
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        const highResImage = getHighResolutionImageUrl(product.thumbnail);
        productCard.innerHTML = `
            <img src="${highResImage}" alt="${product.title}">
            <h3>${product.title}</h3>
            <a href="${product.permalink}" target="_blank">
                <button>Comprar</button>
            </a>
        `;
        productList.appendChild(productCard);
    });
}
