import './zendesk'
import '../Revo/js/ezypay'
import animateOnScroll from './utils/animate-on-scroll'
import initAccordions from './components/accordions'
import initSliders from './components/sliders'
import initTables from './components/tables'
import {
	handleFlashSaleBanner,
	handlePresaleBanner,
} from './components/banners'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import Hiitfit from './hiitfit'


document.addEventListener('DOMContentLoaded', () => {
	gsap.registerPlugin(ScrollTrigger)

	toggleMenu()
	toggleMobileSubMenu()
	animateOnScroll()
	loadAjaxPosts()
	initSliders()
	handleFlashSaleBanner()
	handlePresaleBanner()
	handleTrainsAtForm()
	handleScrollToStudioList()
	handleGuestSignUpForm()

	setupTimeline()

	if (document.querySelector('.tablepress')) {
		initTables()
	}

	if (document.querySelector('[data-daily-workout]')) {
		new Hiitfit()
	}

	if (document.querySelector('#liveCounter')) {
		liveCounterDropdown()
	}

	if (document.querySelector('.coming-soon')) {
		const radioButtons = document.querySelectorAll('input[type="radio"]')
		const selectedStateDiv = document.querySelector('.selected-state')
		const closeModal = document.querySelector('.close-modal')
		const comingSoonForm = document.querySelector('[data-coming-soon-form]')

		radioButtons.forEach((radio) => {
			radio.addEventListener('click', function () {
				comingSoonForm.style.bottom = '0'
				document.querySelectorAll('label').forEach((label) => {
					label.setAttribute('data-selected', 'false')
				})
				this.closest('label').setAttribute('data-selected', 'true')

				const selectedGymName = this.closest('label').querySelector(
					'.coming-soon-gym-name'
				).innerHTML
				const input = document.querySelector('.gym-name input[type="text"]')

				selectedStateDiv.innerHTML = selectedGymName

				if (input) {
					input.value = selectedGymName
				}
			})
		})

		closeModal.addEventListener('click', () => {
			comingSoonForm.style.bottom = '-100%'

			radioButtons.forEach((radio) => {
				radio.closest('label').setAttribute('data-selected', 'false')
			})
		})
	}

	if (document.querySelector('.good-stuff-button')) {
		const goodStuffButtons = document.querySelectorAll('.good-stuff-button')

		const toggleGoodStuff = () => {
			goodStuffButtons.forEach((goodStuffButton, index) => {
				document.querySelectorAll('.card-section-expand').forEach((expand) => {
					if (index === 0) {
						goodStuffButton.innerHTML = expand.classList.contains('hidden')
							? '- The good stuff'
							: '+ The good stuff'
					} else if (index > 0) {
						goodStuffButton.innerHTML = expand.classList.contains('hidden')
							? '- Even more good stuff'
							: '+ Even more good stuff'
					}
				})
			})
			document.querySelectorAll('.card-section-expand').forEach((expand) => {
				expand.classList.toggle('hidden')
			})
		}

		goodStuffButtons.forEach((button) => {
			button.addEventListener('click', () => {
				toggleGoodStuff()
			})
		})
	}

	if (document.querySelector('[data-scrolling-text]')) {
		scrollingText()
	}

	if (document.querySelector('.accordion')) {
		initAccordions()
	}

	// ANIMATE INTERNAL BANNER
	if (document.querySelector('[data-animate-banner]')) {
		gsap.from('[data-animate-banner]', {
			y: 100,
			opacity: 0,
			duration: 1,
			ease: 'power3.out',
			scrollTrigger: {
				trigger: '[data-animate-banner]',
				start: 'top 80%',
				toggleActions: 'play none none none'
			}
		})
	}


	// TOGGLE FILTER BUTTON
	if (document.querySelector('.filter-button') && window.innerWidth < 768) {
		const filterButton = document.querySelector('.filter-button')
		const filterModal = document.querySelector('.filter-modal')
		let isActive = false

		filterButton.addEventListener('click', () => {
			isActive = !isActive

			isActive
				? (filterModal.style.left = `${
						filterModal.getBoundingClientRect().width / 2
				  }px`)
				: (filterModal.style.left = '-72px')
		})
	}

	// REMOVE DEFAULT ACTION AND LINK FROM PARENT NAVIGATION ITEMS

	if (document.querySelector('.no-link')) {
		const noLink = document.querySelectorAll('.no-link > a')

		noLink.forEach((link) => {
			link.removeAttribute('href')

			link.addEventListener('click', (e) => {
				e.preventDefault()
			})
		})
	}

	// TOGGLE TOPBAR AND MENU SHADOW
	const topbar = document.querySelector('[data-topbar]')
	const header = document.querySelector('header')
	let previousScrollPosition = window.scrollY
	let scrollingUp = false

	if (window.innerWidth > 1024) {
		window.addEventListener('scroll', () => {
			const currentScrollPosition = window.scrollY

			if (currentScrollPosition > previousScrollPosition + 10) {
				// Scrolling down
				if (currentScrollPosition > 50 && !scrollingUp) {
					header.style.transform = `translateY(-${topbar.offsetHeight}px)`
				}
				scrollingUp = false
			} else {
				// Scrolling up
				if (currentScrollPosition < previousScrollPosition - 5) {
					header.style.transform = ''
					scrollingUp = true
				}
			}

			if (currentScrollPosition >= 20) {
				header.classList.add('menu-scrolling')
			} else {
				header.classList.remove('menu-scrolling')
			}

			previousScrollPosition = currentScrollPosition
		})
	}

	/**
	 * Tabs functionality
	 */

	if (document.querySelector('.tab-icon')) {
		const tabIcons = document.querySelectorAll('.tab-icon')
		const tabs = document.querySelectorAll('.tab')
		const firstChildIcon =
			document.querySelector('.tab-icons').firstElementChild
		const firstChildContent =
			document.querySelector('.tab-content').firstElementChild

		firstChildIcon.classList.add('active')
		firstChildContent.classList.add('active')

		tabIcons.forEach((icon) => {
			icon.addEventListener('click', () => {
				const tabId = icon.getAttribute('data-tab')
				const currentTab = document.getElementById(tabId)

				tabIcons.forEach((icon) => icon.classList.remove('active'))
				icon.classList.add('active')

				tabs.forEach((tab) => tab.classList.remove('active'))
				currentTab.classList.add('active')
			})
		})
	}

	if (document.querySelector('[data-block="studio_locations"]')) {
		const block = document.querySelector('[data-block="studio_locations"]')
		const tabToggles = block.querySelectorAll('.tab-toggle')
		const tabs = block.querySelectorAll('.tab')
		const firstToggle = block.querySelector('.tab-toggles').firstElementChild
		const firstState = firstToggle.getAttribute('data-state')

		// Helper function to activate tab and its content
		const activateTab = (selectedState) => {
			// Update toggle buttons
			tabToggles.forEach((toggle) => {
				if (toggle.getAttribute('data-state') === selectedState) {
					toggle.classList.add('active')
				} else {
					toggle.classList.remove('active')
				}
			})

			// Update content tabs
			tabs.forEach((tab) => {
				if (tab.getAttribute('data-state') === selectedState) {
					tab.classList.add('active')
					tab.classList.remove('hidden')
				} else {
					tab.classList.remove('active')
					tab.classList.add('hidden')
				}
			})
		}

		// Add click handlers to all toggles
		tabToggles.forEach((toggle) => {
			toggle.addEventListener('click', () => {
				const selectedState = toggle.getAttribute('data-state')
				activateTab(selectedState)
			})
		})

		// Initialize with first tab active
		activateTab(firstState)
	}
})

/**
 * Toggle the state of the mobile menu
 *
 * @returns void
 */
const toggleMenu = () => {
	// Add event listeners to menu buttons
	const menuButtons = document.querySelectorAll('[data-toggle-menu]')
	menuButtons.forEach((btn) => {
		btn.addEventListener('click', () => {
			const tl = gsap.timeline({ paused: true })
			const menuItems = document.querySelectorAll('[data-mobile-menu-item]')

			// Set initial state for all menu items
			gsap.set(menuItems, { opacity: 0, y: 20 })

			// Add animation to timeline with stagger effect
			setTimeout(() => {
				tl.to(menuItems, { opacity: 1, y: 0, stagger: 0.1 })
			}, 300)

			// Toggle body and html classes
			document.body.classList.toggle('menuIsOpen')
			document.documentElement.classList.toggle('overflow-hidden')

			// Play or reverse the timeline based on the menu state
			if (document.body.classList.contains('menuIsOpen')) {
				tl.play()
			} else {
				tl.reverse()
			}
		})
	})
}

/**
 * Toggles the mobile sub menu
 *
 * @returns void
 */
const toggleMobileSubMenu = () => {
	const toggles = document.querySelectorAll('[data-toggle-mobile-sub-menu]')

	toggles.forEach((toggle) => {
		toggle.addEventListener('click', () => {
			const parentEl = toggle.closest('[data-mobile-menu-item]')
			const subMenu = parentEl.querySelector('[data-mobile-sub-menu]')

			// Doesn't exist, bail early
			if (!subMenu) {
				return
			}

			toggle.classList.toggle('mobile-submenu-open')

			subMenu.classList.toggle('hidden')
		})
	})
}

/**
 * Load posts via ajax into a container
 */
function loadAjaxPosts() {
	if (!document.querySelector('[data-posts-container]')) {
		return
	}

	const posts = new AjaxContent({
		container: '[data-posts-container]',
		item_template: 'ajax/post.twig',
		query: {
			post_type: 'post',
			post_status: 'publish',
			posts_per_page: 5,
		},
	})

	document.querySelectorAll('[data-category]').forEach((button) => {
		const category = button.getAttribute('data-category')
		button.addEventListener('click', () => {
			posts.update({
				tax_query: {
					0: {
						taxonomy: 'category',
						field: 'slug',
						terms: category,
					},
				},
			})
		})
	})
}

// GET VALUE OF DROPDOWN SELECTOR AND ADD TO OVERLAY WITH LARGER FONT SIZE
function liveCounterDropdown() {
	const selectElement = document.querySelector('#gymSelect')
	const selectedGymElement = document.querySelector('.selected-gym')

	if (selectElement) {
		const selectedTitle = selectElement.value
		selectedGymElement.textContent = selectedTitle
	}

	selectElement?.addEventListener('change', function () {
		const selectedTitle = selectElement.value
		selectedGymElement.textContent = selectedTitle
	})
}

/**
 * Populate the form on the trains page to dynamically show where they train at
 */
function handleTrainsAtForm() {
	const trainsAt = document.querySelector('[data-trains-at]')

	if (!trainsAt) {
		return
	}

	const gyms = trainsAt.getAttribute('data-trains-at').split(',')
	const select = document.querySelector('.gymsList select')
	select.innerHTML = ''

	gyms.forEach((gym) => {
		const option = document.createElement('option')
		option.value = gym
		option.innerHTML = gym
		select.appendChild(option)
	})
}

/**
 * Handle the timelines for the Our Story page
 */
function setupTimeline() {
	const timeline = document.querySelector('[data-timeline]')

	if (!timeline) {
		return
	}

	const year = gsap.utils.toArray(
		timeline.querySelectorAll('[data-timeline-year]')
	)
	const icons = gsap.utils.toArray(timeline.querySelectorAll('[data-icon]'))
	const progressBars = gsap.utils.toArray(
		timeline.querySelectorAll('[data-progress]')
	)

	// Create a timeline for the icons
	const iconTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: timeline,
			start: 'top center+=100',
			end: 'bottom center',
			scrub: 1,
		},
	})
	const yearTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: timeline,
			start: 'top center+=50',
			end: 'bottom center',
			scrub: 1,
		},
	})

	// Scale up and down the icons as they enter the middle of the viewport
	icons.forEach((icon, index) => {
		iconTimeline.fromTo(
			icon,
			{ scale: 1 },
			{
				scale: 1.75,
				backgroundColor: '#CB333B',
				borderColor: '#CB333B',
				color: '#FFFFFF',
			},
			`iconEnter${index}`
		)
	})

	// The text color needs to update as we scroll
	year.forEach((year, index) => {
		yearTimeline.fromTo(
			year,
			{ color: '#C1BFBF' },
			{ color: '#CB333B' },
			`yearEnter${index}`
		)
	})

	// Create a timeline for the progress bars
	const progressBarTimeline = gsap.timeline({
		scrollTrigger: {
			trigger: timeline,
			start: 'top center+=50',
			end: 'bottom center',
			scrub: true,
		},
	})

	// Update the scaleY of each progress bar from 0 to 100 as it moves from one icon to the next
	progressBars.forEach((progressBar, index) => {
		progressBarTimeline.fromTo(
			progressBar,
			{ scaleY: 0 },
			{ scaleY: 1 },
			`progressBar${index}`
		)
	})
}

function handleScrollToStudioList() {
	const url = new URL(window.location.href)
	const studioList = document.querySelector('#the-studio')

	if (!url.href.includes('#the-studio') || !studioList) {
		return
	}

	setTimeout(() => {
		studioList.scrollIntoView({ behavior: 'instant' })
	}, 500)
}

function handleGuestSignUpForm() {
	if (!document.querySelector('[data-guest-sign-up]')) return

	const guestSignUpForm = document.querySelector('[data-guest-sign-up]')
	const gymToggle = guestSignUpForm.querySelector('#gymSelect')
	const chooseMembership = guestSignUpForm.querySelector('.choose-membership')

	gymToggle.addEventListener('change', () => {
		const selectedOption = gymToggle.options[gymToggle.selectedIndex]
		const openDate = selectedOption.getAttribute('data-gym-open-date')

		if (!openDate) {
			chooseMembership?.classList.remove('hidden')
			return
		}

		const [day, month, year] = openDate.split('/')
		const date = new Date(year, month - 1, day)
		date.setMonth(date.getMonth() + 1)

		const formattedDay = date.getDate().toString().padStart(2, '0')
		const formattedMonth = (date.getMonth() + 1).toString().padStart(2, '0')
		const formattedYear = date.getFullYear()

		const newOpenDate = `${formattedDay}/${formattedMonth}/${formattedYear}`

		if (
			selectedOption.classList.contains('is-presale') &&
			!isDateInPast(newOpenDate)
		) {
			chooseMembership?.classList.add('hidden')
		} else {
			chooseMembership?.classList.remove('hidden')
		}
	})
}

function isDateInPast(dateStr) {
	const [day, month, year] = dateStr.split('/')
	const date = new Date(year, month - 1, day)
	const today = new Date()
	return date < today
}
