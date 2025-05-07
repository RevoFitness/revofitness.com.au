import initSliders from '../../js/components/sliders'

class TrainersFilter {
	constructor() {
		this.state = document.querySelector('#stateSelect').value
		this.fetchGymsWhereState(this.state)

		this.setupUpdateState()
		this.setupUpdateGym()
	}

	setupUpdateState() {
		const stateSelect = document.querySelector('#stateSelect')
		stateSelect.addEventListener('change', (e) => {
			const state = e.target.value
			this.fetchGymsWhereState(state)
			this.fetchGymsWhereStateHTML(state)
		})
	}

	setupUpdateGym() {
		const gymSelect = document.querySelector('#gymSelect')
		gymSelect.addEventListener('change', (e) => {
			const gyms = document.querySelectorAll('[data-gym]')
			const gym = e.target.value

			gyms.forEach((g) =>
				g.getAttribute('data-gym') !== gym
					? g.classList.add('hidden')
					: g.classList.remove('hidden')
			)
		})
	}

	/**
	 * Get Gyms grouped by the state they're in
	 */
	fetchGymsWhereState(state) {
		jQuery.ajax({
			type: 'post',
			dataType: 'json',
			url: ajax.ajax_url,
			data: {
				action: 'get_gyms_where_state',
				state: state,
				security: ajax.nonce,
			},
			success: ({ data }) => {
				const gyms = data
				const gymOptions = document.querySelector('#gymSelect')

				gymOptions.innerHTML = `<option disabled selected>Choose your gym</option>`
				gyms.forEach((gym) => {
					gymOptions.innerHTML += `<option value="${gym.post_title}">${gym.post_title}</option>`
				})
			},
		})
	}

	/**
	 * Get Gyms grouped by the state they're in
	 */
	fetchGymsWhereStateHTML(state) {
		jQuery.ajax({
			type: 'post',
			dataType: 'json',
			url: ajax.ajax_url,
			data: {
				action: 'get_gyms_where_state_html',
				state: state,
				template: 'partial/trainers-loop.twig',
				security: ajax.nonce,
			},
			success: ({ data }) => {
				const container = document.querySelector('[data-sliders-container]')
				container.innerHTML = data
				container.style.scrollMarginTop = '100px'
				container.scrollIntoView({ behavior: 'smooth' })
				initSliders()
			},
		})
	}
}

export default TrainersFilter
