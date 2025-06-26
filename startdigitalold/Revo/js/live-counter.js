/**
 * Initializes the live counter functionality.
 */
export function initLiveCounter() {
	if (!document.querySelector('#liveCounter')) {
		return
	}

	const gymSelect = document.querySelector('#liveCounter #gymSelect')
	gymSelect.addEventListener('change', (e) => gymSelectChangeHandler(e))

	/**
	 * Event listener for gym selection change.
	 * @param {Event} e - The change event object.
	 */
	const gymSelectChangeHandler = (e) => {
		const gym = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '')
		const card = document.querySelector(`[data-counter-card="${gym}"]`)
		const count = document.querySelector(`[data-live-count="${gym}"]`)

		console.log(card)
		document
			.querySelectorAll('[data-counter-card]')
			?.forEach((card) => card.classList.add('hidden'))
		document
			.querySelectorAll('[data-live-count]')
			?.forEach((count) => count.classList.add('hidden'))

		card?.classList.remove('hidden')
		count?.classList.remove('hidden')
	}
}
