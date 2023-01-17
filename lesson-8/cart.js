'use strict';

const cartWindowEl = document.querySelector('.cart');  // окно корзины
// счетчик над корзиной - ищем сначала эл-т с классом cartIconWrap и в нем span
const cartCountEl = document.querySelector('.cartIconWrap span');
// при загрузке страницы - счетчик изначально обнуляем
cartCountEl.textContent = '0';
const cartObj = {};

// контейнер с товарами
const feturedCont = document.querySelector('div.featuredItems');
let feturedEls = feturedCont.children;  // массив товаров на текущей странице

// вешаем обработчик на клик по иконке корзины
document.querySelector('span.cartIconWrap').addEventListener('click', ev => {
    cartWindowEl.classList.toggle('hidden');
});


//вешаем обработчик клика на контейнер с товарами
feturedCont.addEventListener('click', ev => {
    // если клик не на кнопке в товаре - ничего не делаем
    if (!ev.target.classList.contains('addToCart')) return;
    // увеличиваем счетчик на корзине
    cartCountEl.textContent = +cartCountEl.textContent + 1;

});
