class Analytics {
	constructor() {
		this.checkPartialFormComplete()
	}

	/**
	 * Track when the user has partially completed the form (filled out all user details)
	 */
	checkPartialFormComplete() {
		const customerDetails = document.querySelector('#customer-details')
		const requiredInputs = customerDetails.querySelectorAll('input[required]')

		let isValid = false
		const onBlur = () => {
			isValid = this.validateInputs(requiredInputs)

			if (isValid) {
				this.sendPartialFormCompleteEvent()
				for (let index = 0; index < requiredInputs.length; index++) {
					const input = requiredInputs[index]
					input.removeEventListener('blur', onBlur)
				}
			}
		}

		for (let index = 0; index < requiredInputs.length; index++) {
			const input = requiredInputs[index]
			input.addEventListener('blur', onBlur)

			if (isValid) {
				break // Exit the loop if isValid is already true
			}
		}
	}

	/**
	 * @param {HTMLCollection} requiredInputs Required inputs
	 * @returns {Bool} If the required inputs have been filled or not
	 */
	validateInputs(requiredInputs) {
		let allInputsFilled = true

		requiredInputs.forEach((input) => {
			if (input.value.trim() === '') {
				allInputsFilled = false
			}
		})

		if (!allInputsFilled) {
			return false
		}

		return true
	}

	sendPartialFormCompleteEvent() {
		window.dataLayer = window.dataLayer || []
		window.dataLayer.push({
			event: 'SemiRegistrationComplete',
		})
	}
}

export default Analytics
