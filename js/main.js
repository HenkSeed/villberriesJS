const mySwiper = new Swiper('.swiper-container', {
	loop: true,

	// Navigation arrows
	navigation: {
		nextEl: '.slider-button-next',
		prevEl: '.slider-button-prev',
	},
});

// cart
const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
// const modalClose = document.querySelector('.modal-close'); // Сделано через event

const openModal = function () {
	modalCart.classList.add('show');
};

const closeModal = function () {
	modalCart.classList.remove('show');
};

buttonCart.addEventListener('click', openModal);
// modalClose.addEventListener('click', closeModal); // Сделано через event

modalCart.addEventListener('click', function (event) {
	const target = event.target;

	if (
		// Если
		target.classList.contains('overlay') || // кликнули мимо модального окна ИЛИ
		target.classList.contains('modal-close') // кликнули на крестик модального окна,
	) {
		closeModal(); // то закрываем модальное окно
	}
});

// SCROLL-SMOOTH
/*
// Первый вариант плавного скроллинга страницы
//_____________________________________________________________________________
(function () {
	const scrollLinks = document.querySelectorAll('a.scroll-link');

	for (let i = 0; i < scrollLinks.length; i++) {
		scrollLinks[i].addEventListener('click', function (event) {
			event.preventDefault();	// Отключаем действие по умолчанию, чтобы заменить своим
			const id = scrollLinks[i].getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		});
	}
})();
________________________________________________________________________________
*/

// Второй вариант плавного скроллинга страницы
/* ______________________________________________________________________________
{
	const scrollLinks = document.querySelectorAll('a.scroll-link');

	for (let i = 0; i < scrollLinks.length; i++) {
		scrollLinks[i].addEventListener('click', function (event) {
			event.preventDefault();
			const id = scrollLinks[i].getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		});
	}
}
__________________________________________________________________________________
*/

// Третий вариант плавного скроллинга страницы
{
	const scrollLinks = document.querySelectorAll('a.scroll-link');

	for (const scrollLink of scrollLinks) {
		scrollLink.addEventListener('click', (event) => {
			event.preventDefault();
			const id = scrollLink.getAttribute('href');
			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		});
	}
}

// Тернарный оператор - объяснение Макса: [Условие] ? [Если истина] : [Если ложь]
//_______________________________________________________________________________ начало
// let a = 5;
// let x = prompt('Угадай число');

// let result =
// 	x > a
// 		? 'Ваше число больше загаданного'
// 		: x < a
// 		? 'Ваше число меньше загаданного'
// 		: 'Вы угадали';
// console.log(result);
// _______________________________________________________________________________ конец

// Goods

const longGoodsList = document.querySelector('.long-goods-list'); // Список товаров
const viewAll = document.querySelectorAll('.view-all'); // Кнопка View all
const navigationLink = document.querySelectorAll(
	'.navigation-link:not(.view-all)'
); // Меню header-а, плюс псевдокласс not исключает работу функции с .view-all
const showAcsessories = document.querySelectorAll('.showAcsessories'); // При нажатии на картинку с набором аксессуаров требуется эта константа
const showClothing = document.querySelectorAll('.showClothing'); // При нажатии на картинку с набором одежды требуется эта константа

// Функция, которая получает данные (товары) с сервера. Функция асинхронная, поэтому позволяет
// использовать await - ожидание получения результата от fetch
const getGoods = async function () {
	const result = await fetch('db/db.json'); // Функция, встроенная в браузер, обращается к серверу и даёт promice,
	// что сервер ответит. Параметр функции - адрес (url) файла, который обрабатывает запрос
	// Если result имеет свойство ok: true , то значит запрос отработал нормально
	// Для тренировки можно указать в fetch фейковый url: https://jsonplaceholder.typicode.com/todos/1
	// Если убрать /1, то будут запрошены все данные, а не одна позиция
	if (!result.ok) {
		// Если запрос не ок, то
		throw 'Ошибочка вышла: ' + result.status; // Принудительно выдаём сообщение об ошибке
	}
	return await result.json(); // Метод json возвращает данные в формате json (массив в данном случае)
	// можно return await result.text; Вернёт данные в формате текста
};

// getGoods().then(function (data) {
// Метод then ждёт, когда выполнится getGoods(), и только после этого
// выполняет function (data)
//	console.log(data);
//});

// Создаём карточку с товаром, используя метод деструктуризации
const createCard = function ({ label, name, img, description, id, price }) {
	// objCard - это объект, содержащий все карточки товаров
	const card = document.createElement('div');
	card.className = 'col-lg-3 col-sm-6'; // Создаёт новые классы для card, затирая старые классы (если бы были)
	// Заполняет данными HTML блок div (card). Обратные кавычки позволяют заносить
	// форматированный текст
	card.innerHTML = `
						<div class="goods-card">
							${label ? `<span class="label">${label}</span>` : ''}
								 							
							<img
								src="db/${img}"
								alt="${name}"
								class="goods-image"
							/>
							<h3 class="goods-title">${name}</h3>
							<p class="goods-description">${description}</p> <!-- Интерполяция -->
							<button class="button goods-card-btn add-to-cart" data-id="${id}">
								<span class="button-price">$${price}</span>
							</button>
						</div>
				`;
	return card;
};

// Выводим карточки на страницу, получив их с сервера
const renderCards = function (data) {
	longGoodsList.textContent = ''; // Зачищает данные
	const cards = data.map(createCard); // Метод map берет данные массива с сервера, формирует
	// и передаёт в итоге весь массив в cards
	// cards.forEach(function (card) {	|
	// 	longGoodsList.append(card);			|	Первый вариант. Второй вариант следует за этим (...cards)

	longGoodsList.append(...cards); //| Второй вариант (Метод spread???)

	document.body.classList.add('show-goods');
};

// Блок добавлен в связи с домашкой по выбору в верхнем меню All
//--------------------------------------------------------------
const showAll = function (event) {
	event.preventDefault();
	getGoods().then(renderCards);
};

viewAll.forEach(function (elem) {
	elem.addEventListener('click', showAll);
}); // Работает с querySelectorAll

// Фильтруем карточки (с помощью функции фильтр)
//___________________________________________________________________________
const filterCards = function (field, value) {
	// Функция получает свойство и значение
	getGoods()
		.then(function (data) {
			// Для этого сначала получает данные с сервера (строка выше),
			// а затем фильтрует их по параметрам field & value (строка ниже)
			const filteredGoods = data.filter(function (good) {
				return good[field] === value; // Если истина, то возвращает этот товар в filteredGoods,
				// а если ложь, то товар игнорируется, и сортировка переходит к следующему товару
			});
			return filteredGoods; // Функция возвращает отфильтрованный массив
		}) // Здесь не должно быть точки с запятой (;), только после последнего .then
		.then(renderCards);
};

navigationLink.forEach(function (link) {
	link.addEventListener('click', function (event) {
		event.preventDefault();
		const field = link.dataset.field;
		const value = link.textContent;
		console.log(field);
		console.log(value);
		filterCards(field, value);
	});
});

showAcsessories.forEach((item) => {
	item.addEventListener('click', (event) => {
		event.preventDefault();
		filterCards('category', 'Accessories');
	});
});

showClothing.forEach((item) => {
	item.addEventListener('click', (event) => {
		event.preventDefault();
		filterCards('category', 'Clothing');
	});
});
