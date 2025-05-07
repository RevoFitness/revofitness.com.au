import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Apply animations to elements
 */
export default function initAnimateOnScroll() {
	// ENTRANCE ANIMATIONS --------------------------------------------------
	const elements = document.querySelectorAll('[data-animate]')
	const elementsLeft = document.querySelectorAll('[data-animate-left]')
	const elementsSpin = document.querySelectorAll('[data-animate-spin]')

	document.querySelectorAll('[data-animate-stagger]').forEach((stagger) => {
		const elementsStagger = gsap.utils.toArray(stagger.children)

		gsap.from(elementsStagger, {
			scrollTrigger: {
				trigger: stagger,
				start: 'top bottom-=15%',
			},
			y: 20,
			autoAlpha: 0,
			stagger: 0.15,
		})
	})

	elements.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: 'top bottom-=15%',
			},
			y: -16,
			autoAlpha: 0,
		}

		// Animation time
		gsap.from(element, settings)
	})

	elementsLeft.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: 'top bottom-=15%',
			},
			x: 30,
			autoAlpha: 0,
		}

		// Animation time
		gsap.from(element, settings)
	})

	elementsSpin.forEach((element) => {
		const settings = {
			scrollTrigger: {
				trigger: element,
				start: 'top bottom-=15%',
			},
			rotation: 40,
			autoAlpha: 0,
			duration: 0.5,
			scale: 0.5,
			ease: 'power3.inOut',
		}

		// Animation
		gsap.from(element, settings)
	})
}

// REVEAL ON SCROLL ------------------------------------

if (document.querySelector('.reveal-left')) {
	const revealLeft = gsap.utils.toArray('.reveal-left')
	revealLeft.forEach((reveal) => {
		let image = reveal.querySelector('img')
		let tl = gsap.timeline({
			scrollTrigger: {
				trigger: reveal,
				start: 'top 80%',
			},
		})
		tl.set(reveal, {
			autoAlpha: 1,
		})
		tl.fromTo(
			reveal,
			{
				xPercent: -100,
			},
			{
				xPercent: 0,
				duration: 1.5,
				ease: 'power3.easeInOut',
			}
		)
		tl.fromTo(
			image,
			{
				xPercent: 100,
				scale: 1.3,
			},
			{
				xPercent: 0,
				scale: 1,
				delay: -1.5,
				duration: 1.5,
				ease: 'power3.easeInOut',
			}
		)
	})
}
