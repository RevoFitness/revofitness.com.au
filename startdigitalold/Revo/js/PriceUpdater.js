class PriceUpdater {
	constructor() {
		this.SURCHARGE
		this.priceToggles = document.querySelectorAll('[data-price-toggle]')

		//this.setDefaultMembershipLevel()
	}

	/**
	 * Wait the specified amount of time before continuing
	 *
	 * @param {Number} amount
	 * @returns {Promise}
	 */
	wait(amount = 0) {
		return new Promise((resolve, reject) => {
			this.timerId = setTimeout(resolve, amount)
			this.cancelPromise = reject
		})
	}

	async setDefaultMembershipLevel() {
		const membershipTypes = document.querySelectorAll('[name="membershipType"]')
		const firstItem = membershipTypes[0]
		const lastItem = membershipTypes[membershipTypes.length - 1]
		const secondLastItem = membershipTypes[membershipTypes.length - 2]

		await this.wait(100)

		if (firstItem) {
			firstItem.checked = true
		}

		// if (lastItem.closest('[data-price-toggle]').classList.contains('hidden')) {
		// 	secondLastItem.checked = true
		// } else {
		// 	lastItem.checked = true
		// }

		this.calculateSurcharge()
		this.setPrice()
		this.addPriceToggleListener()

		return true
	}

	setPrice() {
		if (
			document.querySelector('[name="discountCodeType"]')?.value ===
			'free_level_two'
		) {
			return
		}

		const price = document.querySelector('[data-price]')

		if (!price) {
			return
		}

		if (document.querySelector('[data-guest-sign-up]')) {
			price.textContent = 0
			return
		}

		if (
			document.querySelector('[name="membershipType"]:checked')?.value ==
			'level-3'
		) {
			price.textContent = 72.32
		}

		if (document.querySelector('[data-five-week-membership]')) {
			if (
				document.querySelector('[name="membershipType"]:checked').value ==
				'level-3'
			) {
				price.textContent = 100
			} else {
				price.textContent =
					document.querySelector('[name="membershipType"]:checked').value ==
					'level-1'
						? 60
						: 85
			}

			return
		}

		const gyms = document.querySelector('#gymSelect')
		const level = document.querySelector(
			'[name="membershipType"]:checked'
		)?.value

		let membershipType

		if (level === 'level-1') {
			membershipType = 'data-level-one'
		} else if (level === 'level-2') {
			membershipType = 'data-level-two'
		} else {
			membershipType = 'data-level-three'
		}
		let paymentAmount

		// Default
		if (gyms?.options[gyms.selectedIndex].value == 'select-a-gym') {
			this.SURCHARGE = 2.0
			paymentAmount = membershipType === 'data-level-one' ? 42.0 : 55.0
		} else if (membershipType === 'data-level-three') {
			paymentAmount = 72.32
		} else {
			paymentAmount =
				gyms?.options[gyms.selectedIndex].getAttribute(membershipType)
		}

		// Probably HIITFIT, a presale gym or (most likely) the user is paying via bank
		if (
			!gyms ||
			document.querySelector('[data-guest-sign-up]') ||
			document.querySelector('[data-five-week-membership]') ||
			document.querySelector('[data-payment-type="bank"].isActive')
		) {
			this.SURCHARGE = 0
		}

		price.textContent = (
			parseFloat(paymentAmount) + parseFloat(this.SURCHARGE)
		).toFixed(2)
	}

	calculateSurcharge() {
		const gyms = document.querySelector('#gymSelect')

		// Probably HIITFIT, a presale gym or (most likely) the user is paying via bank
		if (
			!gyms ||
			document.querySelector('[data-guest-sign-up]') ||
			document.querySelector('[data-five-week-membership]') ||
			document.querySelector('[data-payment-type="bank"].isActive')
		) {
			this.SURCHARGE = 0
			return
		}

		const frequency = gyms.options[gyms.selectedIndex].getAttribute(
			'data-payment-frequency'
		)
		let membershipType

		const level =
			document.querySelector('[name="membershipType"]:checked')?.value ??
			'level-2'

		if (level === 'level-1') {
			membershipType = 'data-level-one'
		} else if (level === 'level-2') {
			membershipType = 'data-level-two'
		} else {
			membershipType = 'data-level-three'
		}

		// $2 or 1.8% + 35c, whichever is greater
		if (frequency == 'monthly') {
			let paymentAmount

			if (membershipType === 'data-level-three') {
				paymentAmount = 72.32
			} else {
				paymentAmount =
					gyms?.options[gyms.selectedIndex].getAttribute(membershipType)
			}

			const twoDollarsInCents = 2 * 100
			const percentage = 0.018 * paymentAmount + 0.35 * 100 // 1.8% + 35 cents, converted to cents

			this.SURCHARGE = Math.max(twoDollarsInCents, percentage) / 100
			return
		}

		// 61c for fortnightly
		this.SURCHARGE = 0.61
	}

	addPriceToggleListener() {
		this.priceToggles.forEach((toggle) => {
			toggle.addEventListener('click', () => {
				this.calculateSurcharge()
				this.setPrice()
			})
		})

		document.querySelector('#stateSelect')?.addEventListener('change', () => {
			this.calculateSurcharge()
			this.setPrice()
		})
		document.querySelector('#gymSelect')?.addEventListener('change', () => {
			this.calculateSurcharge()
			this.setPrice()
		})
	}

	init() {
		this.setDefaultMembershipLevel()
	}
}

export default PriceUpdater
