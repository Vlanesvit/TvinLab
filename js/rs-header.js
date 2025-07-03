/* ====================================
Инициализация меню
==================================== */
function menuFunction() {
	const menus = document.querySelectorAll('.rs-header__menu');

	// === Блокировка скролла при открытии меню ===
	function menuToggle(className) {
		bodyLockToggle();
		document.documentElement.classList.toggle(className);
	}

	// === Инициализация бургеров ===
	function initBurgerToggle() {
		menus.forEach(menu => {
			menu.querySelectorAll('.menu__icon').forEach(btn => {
				btn.addEventListener("click", (e) => {
					e.preventDefault();
					menuToggle("menu-open");

					// Закрываем все открытые подменю и сбрасываем классы
					const menuItemDropdowns = menu.querySelectorAll('.menu__dropdown');
					const menuItemDropdownsMenu = menu.querySelectorAll('.menu__dropdown_list');
					menuItemDropdownsMenu.forEach(drop => _slideUp(drop, 500));
					menuItemDropdowns.forEach(item => item.classList.remove('_open-menu'));
				});
			});
		});
	}

	// === Добавление стрелок в пункты с подменю ===
	function addDropdownArrows(menu) {
		menu.querySelectorAll('.menu__dropdown').forEach(item => {
			const link = item.querySelector('a');
			if (link && !item.querySelector('.menu__dropdown_arrow')) {
				const arrowBtn = document.createElement('button');
				arrowBtn.type = 'button';
				arrowBtn.setAttribute("aria-label", "toggle submenu");
				arrowBtn.classList.add('menu__dropdown_arrow');
				item.insertBefore(arrowBtn, link.nextSibling);
			}
		});
	}

	// === Инициализация выпадающих уровней ===
	function initDropdownHierarchy(menu) {
		const dropdownItems = menu.querySelectorAll('.menu__dropdown');

		dropdownItems.forEach(item => {
			const toggleBtn = item.querySelector('.menu__dropdown_arrow');
			const submenu = item.querySelector('.menu__dropdown_list');

			if (!toggleBtn || !submenu) return;

			toggleBtn.addEventListener('click', (e) => {
				e.preventDefault();

				const parentLevel = item.parentElement; // ul на текущем уровне
				const isOpen = item.classList.contains('_open-menu');

				// Закрыть все остальные элементы на текущем уровне
				parentLevel.querySelectorAll('.menu__dropdown._open-menu').forEach(openItem => {
					if (openItem !== item) {
						openItem.classList.remove('_open-menu');
						const sub = openItem.querySelector('.menu__dropdown_list');
						if (sub) _slideUp(sub, 500);

						// Также закрыть все вложенные активные
						openItem.querySelectorAll('.menu__dropdown._open-menu').forEach(child => {
							child.classList.remove('_open-menu');
							const childSub = child.querySelector('.menu__dropdown_list');
							if (childSub) _slideUp(childSub, 500);
						});
					}
				});

				// Переключить текущий
				if (!isOpen) {
					item.classList.add('_open-menu');
					_slideDown(submenu, 500);
				} else {
					item.classList.remove('_open-menu');
					_slideUp(submenu, 500);
				}
			});
		});
	}

	// === Основная инициализация меню ===
	function menuInit() {
		menus.forEach(menu => {
			addDropdownArrows(menu);
			initDropdownHierarchy(menu);

			// Закрытие всех подменю при клике по иконке (например, крестик)
			document.addEventListener("click", (e) => {
				if (e.target.closest('.menu__icon')) {
					menu.querySelectorAll('.menu__dropdown._open-menu').forEach(drop => {
						drop.classList.remove('_open-menu');
					});
					menu.querySelectorAll('.menu__dropdown_list').forEach(list => {
						_slideUp(list, 500);
					});
				}
			});
		});
	}

	initBurgerToggle();
	menuInit();


	function wrapTextNodes(selector) {
		const elements = document.querySelectorAll(selector);
		if (!elements.length) return;

		elements.forEach(element => {
			// Создаем массив из всех дочерних узлов
			const childNodes = Array.from(element.childNodes);

			childNodes.forEach(node => {
				// Проверяем, является ли узел текстом и содержит ли не только пробелы
				if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
					const span = document.createElement('span');
					span.textContent = node.textContent;
					element.replaceChild(span, node);
				}
			});
		});
	}
	wrapTextNodes('.rs-header__menu .menu__list li  a');
}
menuFunction();

/* ====================================
Header при скролле
==================================== */
function headerScroll() {
	const header = document.querySelector('.rs-header');
	if (!header) return;

	let lastScrollTop = 0;
	let ticking = false;

	function updateHeaderOnScroll() {
		const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

		// Добавление/удаление класса при прокрутке
		header.classList.toggle('_header-scroll', scrollTop > 0);

		// Скрытие/показ шапки
		if (scrollTop > 500) {
			if (scrollTop > lastScrollTop) {
				// Скроллим вниз — скрыть
				header.style.transform = `translateY(-${header.clientHeight + 1}px)`;
				header.classList.remove('_header-show');
			} else {
				// Скроллим вверх — показать
				header.style.transform = `translateY(0)`;
				header.classList.add('_header-show');
			}
		} else {
			header.classList.remove('_header-show');
			header.style.transform = 'translateY(0)';
		}

		lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
		ticking = false;
	}

	function onScroll() {
		if (!ticking) {
			window.requestAnimationFrame(updateHeaderOnScroll);
			ticking = true;
		}
	}

	// Вешаем слушатель только на scroll
	window.addEventListener('scroll', onScroll);

	// Обновляем при загрузке страницы
	updateHeaderOnScroll();
}
headerScroll();
