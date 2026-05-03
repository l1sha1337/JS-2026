let cart = JSON.parse(localStorage.getItem('cart')) || [];
let gone = JSON.parse(localStorage.getItem('gone')) || [];

function addToCart(name, img, event) {
    let alreadyInCart = false;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) alreadyInCart = true;
    }
    
    if (alreadyInCart) {
        alert('Этот котик уже в корзине!');
        return;
    }

    cart.push({ name: name, img: img });
    localStorage.setItem('cart', JSON.stringify(cart));
    
    let card = event.target.closest('.card');
    card.style.display = 'none';
    
    updateCount();
}

function updateCount() {
    let countSpan = document.getElementById('count');
    if (countSpan) countSpan.innerText = cart.length;
}

function removeFromCart(index) {
    let cat = cart[index];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    gone.push(cat.name);
    localStorage.setItem('gone', JSON.stringify(gone));
    
    alert('Теперь у котика есть дом, ура!');
    location.reload();
}

function restockCats() {
    localStorage.removeItem('cart');
    localStorage.removeItem('gone');
    alert('Привезли новых котиков!');
    location.reload();
}

let cards = document.querySelectorAll('.card');
for (let i = 0; i < cards.length; i++) {
    let name = cards[i].querySelector('h2').innerText;
    
    let inCart = false;
    for (let j = 0; j < cart.length; j++) {
        if (cart[j].name === name) inCart = true;
    }
    
    if (inCart || gone.includes(name)) {
        cards[i].style.display = 'none';
    }
}

let restockBtn = document.getElementById('restock-btn');
if (restockBtn && (gone.length > 0 || cart.length > 0)) {
    restockBtn.style.display = 'block';
}

updateCount();