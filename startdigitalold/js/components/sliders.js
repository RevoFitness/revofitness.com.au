import { Swiper } from 'swiper/bundle'

export default function initSliders() {
	// TRAINERS SLIDER
	if (document.querySelector('.trainers-slider')) {
		document.querySelectorAll('.trainers-slider').forEach((slider) => {
			const trainersSlider = new Swiper(slider, {
				direction: 'horizontal',
				loop: false,
				speed: 500,
				slidesPerView: 1.25,
				spaceBetween: 20,
				breakpoints: {
					520: {
						slidesPerView: 2.25,
					},
					1024: {
						slidesPerView: 3.25,
					},
				},
				scrollbar: {
					el: '.swiper-scrollbar',
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			})
		})
	}

	// APP SLIDER
	if (document.querySelector('.app-slider')) {
		document.querySelectorAll('.app-slider').forEach((slider) => {
			const appSlider = new Swiper(slider, {
				direction: 'horizontal',
				loop: false,
				speed: 500,
				slidesPerView: 1.25,
				spaceBetween: 20,
				breakpoints: {
					600: {
						slidesPerView: 2.25,
					},
					1000: {
						slidesPerView: 3.25,
					},
					1200: {
						slidesPerView: 4,
					},
				},
				scrollbar: {
					el: '.swiper-scrollbar',
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			})
		})
	}

	// TABS SLIDER
	if (document.querySelector('.tabs-slider')) {
		document.querySelectorAll('.tabs-slider').forEach((slider) => {
			const tabsSlider = new Swiper(slider, {
				direction: 'horizontal',
				loop: false,
				speed: 500,
				slidesPerView: 1,
				spaceBetween: 40,
				scrollbar: {
					el: '.swiper-scrollbar',
				},
			})
		})
	}

	// MEMBERSHIPS SLIDER
	if (document.querySelector('.membership-cards-slider')) {
		document.querySelectorAll('.membership-cards-slider').forEach((slider) => {
			const membershipsSlider = new Swiper(slider, {
				direction: 'horizontal',
				loop: false,
				speed: 500,
				slidesPerView: 1.01,
				spaceBetween: 10,
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
				},
			})
		})
	}

	// HOME BANNER SLIDER
	if (document.querySelector('.home-banner-slider')) {
		const homeBannerSlider = new Swiper('.home-banner-slider', {
			effect: 'fade',
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 4000,
			},
			allowTouchMove: false,
		})
	}

	// SINGLE GYM BANNER SLIDER
	if (document.querySelector('.single-gym-slider')) {
		const singleGymSlider = new Swiper('.single-gym-slider', {
			effect: 'fade',
			loop: true,
			speed: 1500,
			autoplay: {
				delay: 4000,
			},
			allowTouchMove: false,
		})
	}

	// GYM SLIDERS
	if (document.querySelector('.gym-slider')) {
		document.querySelectorAll('.gym-slider').forEach((slider) => {
			const gymSlider = new Swiper(slider, {
				direction: 'horizontal',
				loop: true,
				speed: 500,
				slidesPerView: 1,
				spaceBetween: 10,
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			})
		})
	}

	// PRESALE SLIDER
	if (document.querySelector('[data-presale-slider]')) {
		new Swiper('[data-presale-slider]', {
			direction: 'horizontal',
			loop: false,
			speed: 500,
			slidesPerView: 1.25,
			spaceBetween: 16,
			breakpoints: {
				768: {
					slidesPerView: 2.25,
				},
				1024: {
					slidesPerView: 3.25,
				},
				1600: {
					slidesPerView: 4.25,
					spaceBetween: 24,
				},
			},
			scrollbar: {
				el: '.swiper-scrollbar',
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})
	}

	/**
	 * Gallery Swiper
	 */
	if (document.querySelector('.gallerySwiper')) {
		new Swiper('.gallerySwiper', {
			loop: true,
			speed: 500,
			centeredSlides: true,
			slidesPerView: 1.3,
			spaceBetween: 16,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		})
	}

	// CARD SLIDER FOR GYM MAP
	if (document.querySelector('.card-slider')) {
		new Swiper('.card-slider', {
			effect: 'cards',
			cardsEffect: {
				slideShadows: false,
				perSlideOffset: 4,
			},
			loop: true,
			speed: 500,
			centeredSlides: true,
			slidesPerView: 1,
			spaceBetween: 16,
			grabCursor: true,
		})
	}
}
