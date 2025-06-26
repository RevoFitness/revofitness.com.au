import Swiper from 'swiper'

class Hiitfit {
	constructor() {
		this.setupGlossarySlider()
	}

	setupGlossarySlider() {
		new Swiper('.glossarySwiper', {
			slidesPerView: 1,
			spaceBetween: 16,
			breakpoints: {
				1024: {
					slidesPerView: 3,
					spaceBetween: 48,
					allowTouchMove: false,
					grid: {
						rows: 2,
					},
				},
			},
			scrollbar: {
				el: '.glossarySwiper .swiper-scrollbar',
			},
			navigation: {
				nextEl: '.glossarySwiper [data-next]',
				prevEl: '.glossarySwiper [data-prev]',
			},
		})
	}
}

export default Hiitfit
