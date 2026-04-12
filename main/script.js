const cats = [
    { id: 1, name: "Снежок", price: 'Free', img: "https://ajo-pet.ru/u/ckupload/files/turkish-angora-01.jpg" },
    { id: 2, name: "Британец", price: 'Free', img: "https://noble-star.com/images/DSC_0021.jpg" },
    { id: 3, name: "Рыжик", price: 'Free', img: "https://lapkins.ru/upload/iblock/17b/17b33aaef613a10f32f21b6024affddb.jpg" },
    { id: 4, name: "Барсик", price: 'Free', img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/960px-Cat_November_2010-1a.jpg" }
];

let total = 0;
let count = 0;
let items = []; 

function addToCart(price, name) {
    if (items.includes(name)) { 
       alert('Этот котик уже выбран вами!');
       return; 
    }
    count = count + 1;
    total = total + price;
    items.push(name); 
    updateDisplay();
}

function updateDisplay() {
    document.getElementById('count').innerText = count;
    document.getElementById('cart-items').innerText = items.join(', ');
}
