import SignUpForm from './SignUpForm'
import setupAccordions from './accordion'
import { initializeGymMap } from './gym-map'
import TrainersFilter from './TrainersFilter'
import { initLiveCounter } from './live-counter'

document.addEventListener('DOMContentLoaded', () => {
	if (document.querySelector('#sign-up-form')) {
		new SignUpForm()
	}

	if (document.querySelector('#gymFilters')) {
		new TrainersFilter()
	}

	initializeGymMap()
	initLiveCounter()
	setupAccordions()

	if (document.querySelector('[data-presale-form]')) {
		const presaleForm = document.querySelector('[data-presale-form]')
		const formContent = document.querySelector('[data-presale-form-content]')

		presaleForm.addEventListener('click', () =>
			formContent.classList.toggle('hidden')
		)
	}
})
