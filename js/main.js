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

// scroll smooth
/*
(function () {
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
})();
*/

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
