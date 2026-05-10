//Сохранение кота в памяти
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let gone = JSON.parse(localStorage.getItem('gone')) || [];
let custom = JSON.parse(localStorage.getItem('custom')) || [];

//Добавление кота в корзину
function addToCart(name, img, event) {
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].name === name) {
            alert('Этот котик уже в корзине!');
            return;
        }
    }
    cart.push({ name: name, img: img });
    localStorage.setItem('cart', JSON.stringify(cart));
    event.target.closest('.card').style.display = 'none';
    updateCount();
}

//Забрать кота из корзины 
function removeFromCart(index) {
    gone.push(cart[index].name);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('gone', JSON.stringify(gone));
    alert('Котик теперь дома!');
    location.reload();
}

//Добавление новых котов 
function restockCats() {
    localStorage.clear();
    location.reload();
}

//Добавить своего кота
function addNewCat() {
    let name = document.getElementById('cat-name').value.trim();
    let img = document.getElementById('cat-img').value.trim();
    
    if (!name || !img) {
        alert('Заполни имя и ссылку на фото!');
        return;
    }
    
    custom.push({ name: name, img: img });
    localStorage.setItem('custom', JSON.stringify(custom));
    location.reload();
}

//Обновление счетчика
function updateCount() {
    let count = document.getElementById('count');
    if (count) count.innerText = cart.length;
}

//Прячем котов из списка и из корзины
document.querySelectorAll('.card').forEach(function(card) {
    if (card.id === 'add-cat-form') return;
    let name = card.querySelector('h2').innerText;
    
    let inCart = cart.some(function(c) { return c.name === name; });
    
    if (inCart || gone.includes(name)) {
        card.style.display = 'none';
    }
});

//При загрузке:показываем своих котов
custom.forEach(function(cat) {
    if (gone.includes(cat.name)) return;
    if (cart.some(function(c) { return c.name === cat.name; })) return;
    
    let div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
        <img src="${cat.img}">
        <h2>${cat.name}</h2>
        <button onclick="addToCart('${cat.name}', '${cat.img}', event)">Взять даром</button>
    `;
    document.querySelector('.cats-container').appendChild(div);});

//Показать кнопку поставки если нужно
if (gone.length > 0 || cart.length > 0) {
    let btn = document.getElementById('restock-btn');
    if (btn) btn.style.display = 'block';
}

//Тёмная тема
let theme = localStorage.getItem('theme');
if (theme === 'dark') document.body.classList.add('dark');

function toggleTheme() {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}
//Светлая тема
function toggleTheme() {
    document.body.classList.toggle('dark');
    let btn = document.getElementById('theme-btn');
    
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
        btn.style.color = 'white';
        btn.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        btn.style.color = 'black';
        btn.textContent = '🌙';
    }
}

//Цвет кнопки темы при загрузке
let btn = document.getElementById('theme-btn');
if (btn) {
    if (theme === 'dark') {
        btn.style.color = 'white';
        btn.textContent = '☀️';
    } else {
        btn.style.color = 'black';
        btn.textContent = '🌙';
    }
}
updateCount();