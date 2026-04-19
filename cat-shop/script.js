let items = JSON.parse(localStorage.getItem('myCart')) || [];

function addToCart(name, img) {
    let namesOnly = items.map(cat => cat.name);
    if (namesOnly.includes(name)) {
        alert('Этот котик уже выбран!');
        return;
    }

    items.push({ name: name, img: img });
    
    localStorage.setItem('myCart', JSON.stringify(items));
    updateDisplay();
}

function updateDisplay() {
    if (document.getElementById('count')) {
        document.getElementById('count').innerText = items.length;
    }
}

updateDisplay();
