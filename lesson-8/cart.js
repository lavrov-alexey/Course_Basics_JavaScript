'use strict';

const cartEl = document.querySelector('span.cartIconWrap');  // корзина
const cartCount = cartEl.lastElementChild;  // счетчик товаров в корзине
// контейнер с товарами
const feturedCont = document.querySelector('div.featuredItems');
let feturedEls = feturedCont.children;  // массив товаров на текущей странице
// console.log(feturedCont);
// console.log(feturedEls);

//вешаем обработчик клика на контейнер с товарами
feturedCont.addEventListener('click', ev => {
    
});
