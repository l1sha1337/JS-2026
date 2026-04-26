let items = JSON.parse(localStorage.getItem('myCart')) || [];

function addToCart(name, img, event) {
    let namesOnly = items.map(cat => cat.name);
    if (namesOnly.includes(name)) {
        alert('Этот котик уже выбран!');
        return;
    }

    items.push({ name: name, img: img });
    
    localStorage.setItem('myCart', JSON.stringify(items));
    updateDisplay();

    let card = event.target.closest('.card'); 
    card.style.display = 'none';  
}

function updateDisplay() {
    if (document.getElementById('count')) {
        document.getElementById('count').innerText = items.length;
    }
}

function removeFromCart(index) {
    items.splice(index, 1);
    localStorage.setItem('myCart', JSON.stringify(items));
    alert('Теперь у котика есть дом, ура!)')
    location.reload();
}

updateDisplay();
