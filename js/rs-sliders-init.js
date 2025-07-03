/*
Документация слайдера: https://swiperjs.com/
*/

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров

	if (document.querySelector('.rs-partners__slider')) {
		const sliderBlocks = document.querySelectorAll('.rs-partners');

		sliderBlocks.forEach(sliderBlock => {
			const sliders = sliderBlock.querySelectorAll('.rs-partners__slider');

			sliders.forEach(slider => {
				const arrowPrev = sliderBlock.querySelector('.rs-partners__button-prev');
				const arrowNext = sliderBlock.querySelector('.rs-partners__button-next');

				const swiperMain = new Swiper(slider, {
					// // Автопрокрутка
					// autoplay: {
					// 	// Пауза между прокруткой
					// 	delay: 10000,
					// 	// Закончить на последнем слайде
					// 	stopOnLastSlide: false,
					// 	// Отключить после ручного переключения
					// 	disableOnInteraction: false,
					// },


					// Обновить свайпер
					// при изменении элементов слайдера
					observer: true,
					// при изменении родительских элементов слайдера
					observeParents: true,
					// при изменении дочерних элементов слайдера
					observeSlideChildren: true,

					// Скорость смены слайдов
					speed: 800,

					// Включение/отключение
					// перетаскивание на ПК
					simulateTouch: true,
					allowTouchMove: true,
					// Чувствительность свайпа
					touchRadio: 1,
					// Угол срабатывания свайпа/перетаскивания
					touchAngle: 45,

					// Цикличность слайдера
					// loop: true,

					// Анимация переключения
					// effect: 'fade',

					// Курсор перетаскивания
					grabCursor: true,

					// Стрелки
					navigation: {
						prevEl: arrowPrev,
						nextEl: arrowNext,
					},

					// Брейкпоинты(адаптив)
					// Ширина экрана
					breakpoints: {
						320: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						539: {
							slidesPerView: 3,
							spaceBetween: 20,
						},
						767.98: {
							slidesPerView: 4,
							spaceBetween: 20,
						},
						991.98: {
							slidesPerView: 6,
							spaceBetween: 30,
						},
					},
				});
			});

		});
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	if (document.querySelector('.swiper')) {
		initSliders();
	}
});