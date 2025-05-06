function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-container');
    container.innerHTML = '';

    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = `<p class="empty">Seu carrinho está vazio.</p>`;
        return;
    }

    cart.forEach((game, index) => {
        const card = document.createElement('div');
        card.classList.add('cart-card');

        card.innerHTML = `
            <img src="${game.image}" alt="${game.name}">
            <div class="cart-info">
                <h2>${game.name}</h2>
                <p>${game.description}</p>
                <p class="price">R$ ${game.price.toFixed(2)}</p>
                <button class="remove-btn" data-index="${index}">Remover</button>
            </div>
        `;

        container.appendChild(card);
        total += game.price;
    });

    const summary = document.createElement('div');
    summary.classList.add('summary');

    summary.innerHTML = `
        <h3>Total: R$ ${total.toFixed(2)}</h3>
        <button id="end-btn">Finalizar Pedido</button>
    `;

    container.appendChild(summary);

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            removerItem(parseInt(btn.dataset.index));
        });
    });
    
    document.getElementById("end-btn").onclick = generatePaymentQRCode;

}

function removerItem(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
}

function generatePaymentQRCode() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, game) => sum + parseFloat(game.price), 0).toFixed(2);
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=Pagamento%20de%20R$${total}`;

    // Criação do overlay
    const overlay = document.createElement("div");
    overlay.classList.add("qr-overlay");

    // Conteúdo centralizado
    const container = document.createElement("div");
    container.classList.add("qr-popup");

    const text = document.createElement("p");
    text.textContent = `Escaneie para pagar R$ ${total}`;
    text.classList.add("qr-popup-text");

    const img = document.createElement("img");
    img.src = qrCodeURL;
    img.alt = "QR Code para pagamento";
    img.classList.add("qr-popup-img");

    const close = document.createElement("button");
    close.textContent = "Fechar";
    close.classList.add("qr-popup-close");
    close.onclick = () => overlay.remove();

    container.appendChild(text);
    container.appendChild(img);
    container.appendChild(close);
    overlay.appendChild(container);
    document.body.appendChild(overlay);

    // Limpa o carrinho
    document.getElementsByClassName('qr-popup-close')[0].addEventListener('click', () => {
        alert('Pedido finalizado com sucesso!');
        localStorage.removeItem('cart');
        loadCart();
    });
}



window.addEventListener('DOMContentLoaded', loadCart);
