function parallaxImageSmooth(selector) {
	const images = document.querySelectorAll(selector);
	const parallaxItems = [];

	images.forEach(image => {
		parallaxItems.push({
			el: image,
			currentY: 0,
			targetY: 0
		});
	});

	function updateParallax() {
		const windowHeight = window.innerHeight;

		parallaxItems.forEach(item => {
			const rect = item.el.getBoundingClientRect();
			const imgHeight = rect.height;

			// Рассчитываем положение в экране
			const visibleRatio = (windowHeight - rect.top) / (windowHeight + imgHeight);
			const clampedRatio = Math.min(Math.max(visibleRatio, 0), 1);

			// Цель для translateY от 20% до -50%
			item.targetY = 0 - 10 * clampedRatio;

			// Сглаживаем движение (lerp)
			item.currentY += (item.targetY - item.currentY) * 0.1;

			item.el.style.transform = `translateY(${item.currentY}%)`;
		});

		requestAnimationFrame(updateParallax);
	}

	updateParallax();
	window.addEventListener('resize', updateParallax);
}

parallaxImageSmooth('.rs-parallax__bg img');