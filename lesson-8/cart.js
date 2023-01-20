'use strict';

const cartWindowEl = document.querySelector('.cart');  // окно корзины
// счетчик над корзиной - ищем сначала эл-т с классом cartIconWrap и в нем span
const cartCounterEl = document.querySelector('.cartIconWrap span');

class Cart {
    totalCount = 0;
    totalSum = 0;

    add (prodId, prodName, prodPrice, prodCount = 1) {
        if (!(prodId in this)) {  // если товара в корзине еще нет - добавляем
            this[prodId] = {prodId, prodName, prodPrice, prodCount: 0};
        }
        this[prodId].prodCount += prodCount;  // увеличиваем кол-во товара
        this.totalCount += prodCount;  // и общего кол-ва товара в корзине
        this.totalSum += prodPrice * prodCount;  // и общей суммы корзины
    }
}

const cartObj = new Cart();  // создаем заготовку объекта корзины с товарами

// контейнер с товарами
const feturedCont = document.querySelector('div.featuredItems');
let feturedEls = feturedCont.children;  // массив товаров на текущей странице

// вешаем обработчик на клик по иконке корзины
document.querySelector('span.cartIconWrap').addEventListener('click', ev => {
    cartWindowEl.classList.toggle('hidden');
});


//вешаем обработчик клика на контейнер с товарами
feturedCont.addEventListener('click', ev => {
    // если клик не на кнопке добавления в корзину или на эл-те, у которого
    // нет в родителях этой кнопки (метод closest) - уходим
    if (!ev.target.closest('.addToCart')) {
        return;
    }
    
    // увеличиваем счетчик на корзине
    cartCounterEl.textContent = +cartCounterEl.textContent + 1;

    // находим эл-т с кликнутым товаром
    const prodData = ev.target.closest('.featuredItem').dataset;

    cartObj.add(prodData.id, prodData.name, prodData.price);
    console.log(cartObj);

});
