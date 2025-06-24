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
	// check email input for existing membership
	// This is a custom function that checks if the email exists in the database
	checkEmail()

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

	// TOGGLE FILTER BUTTON
	if (document.querySelector('.filter-button') && window.innerWidth < 768) {
		const filterButton = document.querySelector('.filter-button')
		const filterModal = document.querySelector('.filter-modal')
		let isActive = false

		filterButton.addEventListener('click', () => {
			isActive = !isActive

			isActive
				? (filterModal.style.left = `${filterModal.getBoundingClientRect().width / 2
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

			// Set initial state for alfl menu items
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
let isChecking = false;

function checkEmail() {
	const emailInput = document.getElementById('email');
	const phoneInput = document.getElementById('phoneNumber');
	const form = document.getElementById('sign-up-form');
	if (!emailInput || !phoneInput) return;
	
	// ⛔ Prevent form submit while popup is visible
	document.querySelector('form')?.addEventListener('submit', (e) => {
		if (document.querySelector('.email-notify-up')) {
			console.log('🚫 Prevented form submission due to popup');
			e.preventDefault();
		}
	});

	const bgColors = {
		current: '#09b663',    // Green
		notstarted: '#e36a20', // Orange
		freezed: '#0d82bc',    // Blue
		ended: '#cb3d3b'       // Red
	};

	const createMessage = (status, content, buttons = []) => {
		console.log('🛠 createMessage:', status, buttons);

		const msg = document.createElement('div');
		msg.className = `email-notify-up ${status}`;
		msg.style.cssText = `
			margin-top:6px;
			font-size:0.9rem;
			display:flex;
			flex-direction:column;
			gap:10px;
			position:absolute;
			right:24px;
			padding:12px;
			background:${bgColors[status] || '#cb3d3b'};
			border-radius: 8px;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 0px 4px, rgb(51, 51, 51) -2px 2px 0px 1px;
			z-index:9999;
			pointer-events:auto;
			padding-right:40px;
		`;

		const text = document.createElement('div');
		text.innerHTML = content;
		msg.appendChild(text);

		const btnContainer = document.createElement('div');
		btnContainer.style.cssText = 'display:flex; gap:10px;';

		buttons.forEach(({ label, callback }) => {
			console.log(`🔧 Attaching click for ${label}`);
			const btn = document.createElement('button');
			btn.textContent = label;
			btn.setAttribute('type', 'button');
			btn.style.cssText = `
				padding:6px 12px;
				background:#000;
				color:#fff;
				border:none;
				border-radius:4px;
				cursor:pointer;
				z-index:10000;
				padding-top:10px;
				font-weight:bold;
			`;

			btn.addEventListener('click', (e) => {
				e.preventDefault();
				e.stopPropagation();
				console.warn(`🖱 ${label} clicked`);
				requestAnimationFrame(() => {
					callback();
					msg.remove();
				});
			});

			btnContainer.appendChild(btn);
		});

		if (buttons.length) msg.appendChild(btnContainer);

		const closeBtn = document.createElement('span');
		closeBtn.classList.add('close-btn');
		closeBtn.innerHTML = '&times;';
		closeBtn.style.cssText = `
			cursor:pointer;
			font-weight:bold;
			font-size:24px;
			position:absolute;
			top:8px;
			right:12px;
		`;
		closeBtn.addEventListener('click', () => {
			msg.remove();
			emailInput.classList.remove(status);
		});

		msg.appendChild(closeBtn);
		return msg;
	};

	const runCheck = (source) => async () => {
		const alreadyChecked = sessionStorage.getItem('membership-check-source');
		if (alreadyChecked && alreadyChecked !== source) return;
		sessionStorage.setItem('membership-check-source', source);

		const email = emailInput.value.trim();
		const phone = phoneInput.value.replace(/\s+/g, '');
		const wrapper = emailInput.closest('.input-wrapper');
		const label = wrapper.querySelector('label');
		const submitBtn = document.getElementById('PostPaymentMethod');
		if ((!email && !phone) || isChecking) return;
		isChecking = true;

		// strip old status classes
		emailInput.className = emailInput.className
			.split(' ')
			.filter(c => !['current', 'ended', 'notstarted', 'freezed'].includes(c.toLowerCase()))
			.join(' ');

		// remove any old message
		const oldMsg = wrapper.querySelector('.email-notify-up');
		if (oldMsg) oldMsg.remove();

		if (label) {
			label.innerHTML = `Email <span class="loader" style="background:#fff;margin-left:8px;display:inline-block;width:12px;height:12px;border:2px solid #ccc;border-top-color:#333;border-radius:50%;animation:spin 1s linear infinite;position: absolute;bottom: 8.5px;left: 36px;"></span>`;
		}

		try {
			const response = await fetch('/wp-admin/admin-ajax.php', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams({
					action: 'check_pg_membership',
					email,
					phoneNumber: phone
				})
			});

			const result = await response.json();
			console.log(result);
			// — if check failed or no existing membership, *show* the submit button again and exit —
			if (!result.success || !result.data?.exists) {
				if (submitBtn) {
					submitBtn.style.opacity = 1;
					submitBtn.style.zIndex  = ''; // reset to whatever your default is
				}
				return;
			}

			const members = result.data.members || [];
			const statuses = members
				.flatMap(m => m.statuses || [])
				.filter(s => typeof s === 'string' || (s && typeof s.status === 'string'))
				.map(s => typeof s === 'string' ? s.toLowerCase() : s.status.toLowerCase());

			const priority = ['current', 'notstarted', 'freezed', 'ended'];
			const status = priority.find(s => statuses.includes(s)) || 'current';

			emailInput.classList.add(status);
			const member = members[0] || {};

			console.log('💡 Status check:', statuses, '→ chosen:', status);
	
				if(result.data.all[0].memberType === "Guest") {
					document.getElementById('existing-member-id').value = result.data.all[0].id;
					document.getElementById('old-member-email').value = document.getElementById('email').value;
					 return;
					
				}
			
			let msgElement;
			if (status === 'current') {
				msgElement = createMessage(status, `
					There is an existing active membership using this email. <br/><br/>
					Please email <a href="mailto:support@revofitness.com.au">support@revofitness.com.au</a> or visit your nearest club for assistance.
				`);
			} else if (status === 'ended') {
				msgElement = createMessage(
					status,
					`There is an ended membership with this email address. Are you <strong>${member.firstName}</strong>?`,
					[
						{
							label: 'NO',
							callback: () => {
								console.log('❌ NO clicked — clearing fields');
								document.getElementById('existing-member-id').value = '';
								document.getElementById('old-member-id').value      = member.memberId || '';
								document.getElementById('old-member-email').value = emailInput.value || '';
								emailInput.value = '';
								document.getElementById('firstName').value  = '';
								document.getElementById('lastName').value   = '';
								document.getElementById('gender').value     = '';
								const dobInput = document.getElementById('dateOfBirth');
								if (dobInput) dobInput.value = '';
							}
						},
						{
							label: 'YES',
							callback: () => {
								console.log('✅ YES clicked — pre-filling details');
								document.getElementById('existing-member-id').value = member.memberId || '';
								document.getElementById('old-member-id').value      = '';
								document.getElementById('firstName').value          = member.firstName || '';
								document.getElementById('lastName').value           = member.lastName  || '';
								document.getElementById('gender').value             = member.gender    || '';
								const dobInput = document.getElementById('dateOfBirth');
								if (dobInput && member.dateOfBirth) {
									const birth = new Date(member.dateOfBirth);
									const formatted = `${String(birth.getDate()).padStart(2, '0')}/${String(birth.getMonth()+1).padStart(2, '0')}/${birth.getFullYear()}`;
									dobInput.value = formatted;
								}
							}
						}
					]
				);
			} else if (status === 'notstarted') {
				msgElement = createMessage(status, `
					There is an existing membership using this email already. <br/><br/>
					Please email <a href="mailto:support@revofitness.com.au">support@revofitness.com.au</a> or visit your nearest club for assistance.
				`);
			} else if (status === 'freezed') {
				msgElement = createMessage(status, `
					There is an existing frozen membership using this email already.<br/><br/>
					Please email <a href="mailto:support@revofitness.com.au">support@revofitness.com.au</a> or visit your nearest club for assistance.
				`);
			}

			if (msgElement) wrapper.appendChild(msgElement);

			// For all “exists” statuses except ‘ended’, we hide the submit button
			if (submitBtn) {
				const hide = ['current', 'notstarted', 'freezed'].includes(status);
				submitBtn.style.opacity = hide ? 0 : 1;
				submitBtn.style.zIndex  = status === 'ended' ? 2 : -1;
			}

			// Autofill if needed
			if (emailInput.value.trim() === '') {
				console.log('🔁 Autofilling email with member.email');
				emailInput.value = member.email;
			} else {
				console.log('🚫 Email input already filled — skipping autofill');
			}
		} catch (err) {
			console.error('🔥 Error during membership check:', err);
			// On network/error, restore the button so user can retry
			if (submitBtn) {
				submitBtn.style.opacity = 1;
				submitBtn.style.zIndex  = '';
			}
		} finally {
			if (label) label.textContent = 'Email';
			isChecking = false;
		}
	};

	emailInput.addEventListener('blur', runCheck('email'));
	// phoneInput.addEventListener('blur', runCheck('phone'));
}

if (!document.querySelector('#email-spinner-style')) {
	const style = document.createElement('style');
	style.id = 'email-spinner-style';
	style.innerHTML = `
		@keyframes spin {
			0% { transform: rotate(0deg); }
			100% { transform: rotate(360deg); }
		}
	`;
	document.head.appendChild(style);
}

console.log('📌 DOM ready — initializing membership check logic');
checkEmail();
