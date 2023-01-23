'use strict';

class Cart {
    totalCount = 0;
    totalSum = 0;

    constructor() {
        this.windowEl = document.querySelector('.cart');  // окно корзины
        // счетчик над корзиной - эл-т с классом cartIconWrap и в нем span
        this.counterEl = document.querySelector('.cartIconWrap span');
        // эл-т с общей суммой корзины
        this.totalSumEl = 
            this.windowEl.querySelector('.cartTotalValue');
        // эл-т контейнер продуктов в корзине
        this.prodsEl = this.windowEl.querySelector('.cartProds');
        this.products= {};  // сюда будем добавлять собственно продукты
    }

    // добавляет товар в корзину и обновляет счетчик и сумму товаров
    addProduct(id, name, price, count) {
        // если товара в корзине еще нет - добавляем
        if (!(id in this.products)) {  
            const newProdInCartEl = document.createElement('div');
            this.products[id] = {id, name, price, count, 
                prodRowEl: newProdInCartEl};
            newProdInCartEl.innerHTML = this._getHtmlProductRow(id);
            this.prodsEl.appendChild(newProdInCartEl);
        }
        this.products[id].count += count;  // увеличиваем кол-во товара
        
       продолжаем здесь
        

        // формируем и сохраняем html-строку для товара в корзине
        this.products[id].html = this._getHtmlProductRow(id);
        this.totalCount += count;  // обновляем общее кол-во товара в корзине
        this.totalSum += price * count;  // и общую сумму всех товаров в корзине
        // увеличиваем счетчик на корзине
        this.counterEl.textContent = +this.totalCount + 1;
        // обновляем общую сумму всех товаров в корзине
        this.totalSumEl.textContent = this.totalSum.toFixed(2);
    }

    // формирует html-код строки продукта корзины с переданным id
    _getHtmlProductRow(id) {
        return `
        <div class='cartRow' data-prodId='${this.products[id].id}'>
            <div>${this.products[id].name}</div>
            <div>
                <span class='prodCount'>${this.products[id].count}</span> шт.
            </div>
            <div>$${this.products[id].price}</div>
            <div>
                $<span class='totalProd'>${(this.products[id].price * 
                    this.products[id].count).toFixed(2)}</span>
            </div>
        </div>
        `;
    }

    // формирует и подставляет html-код всех строк продуктов в корзине
    showProdsCart() {
        let prodsHtml = '';
        for (const idx in this.products) {
            prodsHtml += this.products[idx].html;
        }
        // вставляем готовый html-код в эл-т контейнер продуктов в корзине
        this.prodsEl.innerHTML = prodsHtml;
    }
}

const cartObj = new Cart();  // создаем объект корзины для товаров

// контейнер с товарами
const prodsCont = document.querySelector('div.featuredItems');

// вешаем обработчик на клик по иконке корзины
document.querySelector('span.cartIconWrap').addEventListener('click', ev => {
    // скрываем или показываем окно с товарами в корзине
    cartObj.windowEl.classList.toggle('hidden');
});


//вешаем обработчик клика на контейнер с товарами
prodsCont.addEventListener('click', ev => {
    // если клик не на кнопке добавления в корзину или на эл-те, у которого
    // нет в родителях этой кнопки (метод closest) - уходим
    if (!ev.target.closest('.addToCart')) {
        return;
    }
    
    // находим эл-т с кликнутым товаром
    const prodData = ev.target.closest('.featuredItem').dataset;
    // добавляем в корзину данные о товаре
    cartObj.addProduct(prodData.id, prodData.name, prodData.price, 1);
    // отрисовываем корзину с товарами
    cartObj.showProdsCart();
});
