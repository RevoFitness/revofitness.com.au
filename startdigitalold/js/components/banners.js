export function handleFlashSaleBanner() {
	const flashSaleBanner = document.querySelector('[data-flashsale-banner]')
	const DAY_IN_MILLISECONDS = 86400 * 1000

	if (!flashSaleBanner) {
		return
	}

	if (!getWithExpiry('hasSeenFlashSaleBanner')) {
		setTimeout(() => {
			flashSaleBanner.parentElement.style.opacity = 1
			flashSaleBanner.parentElement.style.pointerEvents = 'auto'
		}, 5000)
	}

	flashSaleBanner
		.querySelector('[data-action="close"]')
		.addEventListener('click', () => {
			flashSaleBanner.parentElement.style.opacity = 0
			flashSaleBanner.parentElement.style.pointerEvents = 'none'
			setWithExpiry('hasSeenFlashSaleBanner', true, DAY_IN_MILLISECONDS * 3)
		})

	flashSaleBanner.querySelector('[data-link').addEventListener('click', () => {
		setWithExpiry('hasSeenFlashSaleBanner', true, DAY_IN_MILLISECONDS * 3)
	})
}

export function handlePresaleBanner() {
	const presaleBanner = document.querySelector('[data-presale-banner]')
	const isTrainersPage = document.querySelector('#gymFilters')
	const isLiveCounterPage = document.querySelector('[data-live-counter-page]')
	const DAY_IN_MILLISECONDS = 86400 * 1000

	if (!presaleBanner || isTrainersPage || isLiveCounterPage) {
		return
	}

	// Check if the user hasn't already seen the presale notice and if so, animate it in from below
	if (!getWithExpiry('hasSeenPresaleBanner')) {
		setTimeout(() => {
			document.documentElement.style.overflow = 'hidden'
			presaleBanner.classList.toggle('banner-hidden')
		}, 3000)
	}

	// Close the presale notice
	const closeButtons = presaleBanner.querySelectorAll('[data-action="close"]')

	closeButtons.forEach((button) => {
		button.addEventListener('click', () => {
			document.documentElement.style.overflow = 'auto'
			presaleBanner.classList.toggle('banner-hidden')
			setWithExpiry('hasSeenPresaleBanner', true, DAY_IN_MILLISECONDS * 3)
		})
	})
}

/**
 * Set an item in local storage with an expiry time
 *
 * @param {string} key
 * @param {any} value
 * @param {number} ttl
 */
function setWithExpiry(key, value, ttl) {
	const now = new Date()

	const item = {
		value: value,
		expiry: now.valueOf() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

/**
 * Get an item from local storage if it exists and is not expired
 *
 * @param {string} key
 */
function getWithExpiry(key) {
	const itemStr = localStorage.getItem(key)

	if (!itemStr) {
		return false
	}

	const item = JSON.parse(itemStr)
	const now = new Date()

	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key)
		return false
	}

	return item.value
}
