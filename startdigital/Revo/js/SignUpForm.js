import datepicker from 'js-datepicker'
import Analytics from './analytics'
import { effect, signal } from '@preact/signals'
import PriceUpdater from './PriceUpdater'
import SignaturePad from 'signature_pad'

class SignUpForm {
	constructor() {
		this.dateOfBirth = datepicker('#dateOfBirth', {
			maxDate: this.minDateToBeAdult(),
			startDate: this.minDateToBeAdult(),
			formatter: (input, date) => {
				const value = date.toLocaleDateString()
				input.value = value
			},
			onSelect: (instance, date) => {
				const isUnder18 = this.isUnder18(date)

				this.handleUnderageSubmissionUI(isUnder18)
			},
		})
		this.form = document.querySelector('#sign-up-form')

		this.validatePromoCode()
		this.togglePaymentTypes()
		this.updateStartDate()
		this.handleLevelThreeMembership()
		this.handlePaymentFrequency()
		this.handleGymSelect()
		this.handleOrientationModal()
		this.updateCardSurchargeTerms()

		// Set default state
		const gymSelect = document.querySelector('#gymSelect')
		document.querySelector('#state').value =
			gymSelect.options[gymSelect.selectedIndex].dataset.state

		if (document.querySelector('#signature')) {
			this.signaturePad = new SignaturePad(
				document.querySelector('#signature'),
				{
					minWidth: 1,
					maxWidth: 1,
					penColor: '#CB333B',
				}
			)

			this.signaturePad.addEventListener('endStroke', () => {
				const signed = document.querySelector('[name="signed"]')
				const signedPart2 = document.querySelector('[name="signedPart2"]') // Second input field
				const base64Data = this.signaturePad.toDataURL()

				// Split the Base64 string into two parts
				const splitIndex = Math.floor(base64Data.length / 2)
				const firstPart = base64Data.substring(0, splitIndex)
				const secondPart = base64Data.substring(splitIndex)

				// Assign each part to an input
				signed.value = firstPart
				signedPart2.value = secondPart

				// Dispatch change events
				signed.dispatchEvent(new Event('change'))
				signedPart2.dispatchEvent(new Event('change'))
			})

			document
				.querySelector('[data-action=clear]')
				.addEventListener('click', () => this.signaturePad.clear())

			window.addEventListener('resize', () =>
				this.resizeCanvas(this.signaturePad)
			)
			this.resizeCanvas(this.signaturePad)
		}

		const price = new PriceUpdater()
		price.init()
		new Analytics()

		this.handleLevelTwoCampaign()

		this.prefillPromoCodeForPresaleGyms()

		// this.setupTestSubmissionDetails()
	}

	/**
	 * Prefill the promo code for presale gyms if it's not already filled.
	 *
	 * This usually occurs if the user navigates back to the form after being redirected to a presale page
	 * and the presale gym is still selected.
	 */
	async prefillPromoCodeForPresaleGyms() {
		await this.wait(100)

		const discountInput = document.querySelector('#discountCode')
		const gymSelect = document.querySelector('#gymSelect')
		const selectedGym = gymSelect.selectedOptions[0]
		const checkDiscountButton = document.querySelector('[data-check-discount]')
		const isPresale = selectedGym?.classList.contains('is-presale')

		if (!discountInput || !selectedGym || !isPresale) {
			return
		}

		const code = selectedGym.dataset.presaleCode

		if (code && !discountInput.value) {
			if (checkDiscountButton) {
				checkDiscountButton.style.display = 'none'
				discountInput.classList.remove(['!border-r-0', '!rounded-r-none'])
			}

			discountInput.value = code
			discountInput.setAttribute('readonly', 'readonly')
		}
	}

	/**
	 * Handle the UI when the user is underage
	 */
	handleUnderageSubmissionUI(isUnder18) {
		const emergencyContactContainer =
			document.querySelector('#emergency-details')

		if (!emergencyContactContainer) {
			return
		}

		const emergencyContactFields =
			emergencyContactContainer.querySelectorAll('input')

		if (isUnder18) {
			emergencyContactContainer.style.removeProperty('display')
			emergencyContactFields.forEach((field) => (field.required = true))
			return
		}

		emergencyContactFields.forEach((field) => {
			field.value = ''
			field.required = false
		})
		emergencyContactContainer.style.display = 'none'
	}

	/**
	 * Returns true is the user is under 18 years old
	 */
	isUnder18(date) {
		const eighteenYearsAgo = new Date()
		eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18)

		return date.getTime() > eighteenYearsAgo.getTime()
	}

	setupTestSubmissionDetails() {
		const requiredInputs = this.form.querySelectorAll('[required]')

		// Prefill for testing
		requiredInputs.forEach((input) => {
			if (input.name == 'termsConditions' || input.name == 'signed') {
				return
			}

			input.value = 'test'
			if (input.name == 'postCode') {
				input.value = '1234'
			}
			if (input.name == 'email') {
				let r = (Math.random() + 1).toString(36).substring(5)
				input.value = `contract@${r}.com.au`
			}
			if (input.name == 'phoneNumber') {
				input.value = '0412345678'
			}
			if (input.name == 'gender') {
				input.value = 'Male'
			}
			if (input.name == 'dateOfBirth') {
				input.value = '02/01/2006'
			}
		})
	}

	resizeCanvas(signaturePad) {
		const canvas = document.querySelector('#signature')
		const ratio = Math.max(window.devicePixelRatio || 1, 1)
		canvas.width = canvas.offsetWidth * ratio
		canvas.height = canvas.offsetHeight * ratio
		canvas.getContext('2d').scale(ratio, ratio)
		signaturePad.clear() // otherwise isEmpty() might return incorrect value
	}

	async handlePaymentFrequency() {
		await this.wait(500)
		const gymSelect = document.querySelector('#gymSelect')
		const stateSelect = document.querySelector('#stateSelect')
		let paymentFrequency = signal(
			document.querySelector(`option[value="${gymSelect.value}"]`)?.dataset
				.paymentFrequency
		)
		const paymentFrequencyInput = document.querySelector('#paymentFrequency')
		if (paymentFrequencyInput) {
			effect(
				() =>
					(paymentFrequencyInput.value = paymentFrequency.value ?? 'Monthly')
			)
		}

		gymSelect.addEventListener('change', (e) => {
			const selected = document.querySelector(
				`option[value="${e.target.value}"]`
			)

			paymentFrequency.value = selected.dataset.paymentFrequency
			document.querySelector('#state').value = selected.dataset.state

			// Apply Level Two Campaign logic if required
			this.handleLevelTwoCampaign(selected)
		})

		stateSelect?.addEventListener('change', async (e) => {
			await this.wait(100)
			const selected = gymSelect.options[gymSelect.selectedIndex]
			paymentFrequency.value = selected.dataset.paymentFrequency
		})
	}

	updateCardSurchargeTerms() {
		const gymSelect = document.querySelector('#gymSelect')
		const stateSelect = document.querySelector('#stateSelect')

		// Probably a HIITFIT or presale gym
		if (!gymSelect || !stateSelect) {
			return
		}

		const paymentFrequency = signal(
			document.querySelector(`option[value="${gymSelect.value}"]`)?.dataset
				.paymentFrequency
		)

		const toggleSurchargeText = () => {
			const gym = document.querySelector('#gymSelect').selectedOptions[0]
			const monthly = document.querySelectorAll('[data-monthly-surcharge]')
			const fortnightly = document.querySelectorAll(
				'[data-fortnightly-surcharge]'
			)
			const levelThree = document.querySelectorAll(
				'[data-level-three-surcharge]'
			)

			if (gym.dataset.hasLevelThree === 'true') {
				monthly.forEach((item) => item.classList.add('hidden'))
				fortnightly.forEach((item) => item.classList.add('hidden'))
				levelThree.forEach((item) => item.classList.remove('hidden'))
			} else if (paymentFrequency.value === 'monthly') {
				monthly.forEach((item) => item.classList.remove('hidden'))
				fortnightly.forEach((item) => item.classList.add('hidden'))
				levelThree.forEach((item) => item.classList.add('hidden'))
			} else {
				monthly.forEach((item) => item.classList.add('hidden'))
				fortnightly.forEach((item) => item.classList.remove('hidden'))
				levelThree.forEach((item) => item.classList.add('hidden'))
			}
		}

		gymSelect.addEventListener('change', (e) => {
			const selected = document.querySelector(
				`option[value="${e.target.value}"]`
			)
			paymentFrequency.value = selected.dataset.paymentFrequency
			toggleSurchargeText()

			this.addPresaleDiscount(selected)
			this.setPossibleSignUpDates(selected.dataset.postId)

			// REDIRECT TO GYM PAGE WHEN PRESALE GYM IS SELECTED AND IS JOIN NOW PAGE
			if (
				selected.classList.contains('is-presale') &&
				window.location.href.includes('join-now')
			) {
				const gymUrl = selected.getAttribute('data-url')
				const allowUnder18 = selected.getAttribute('data-allow-youths')

				if (allowUnder18) {
					return (window.location.href = `${gymUrl}?under-18=true`)
				}

				window.location.href = gymUrl
			}
		})

		stateSelect.addEventListener('change', (e) => {
			const selected = document.querySelector('#gymSelect > option')
			paymentFrequency.value = selected.dataset.paymentFrequency
			toggleSurchargeText()
		})
	}

	setPossibleSignUpDates(id) {
		jQuery.ajax({
			type: 'get',
			dataType: 'json',
			url: sd_ajax.ajax_url,
			data: {
				action: 'get_possible_start_dates',
				id: id,
			},
			success: (data) => {
				const select = document.querySelector('[data-start-date]')

				if (!select) {
					return
				}

				select.innerHTML = ''
				data.forEach((date) => {
					const option = document.createElement('option')
					option.value = date
					option.textContent = date
					select.appendChild(option)
				})
				select.selected = select.options[0]
				this.updateStartDate()
			},
		})
	}

	addPresaleDiscount(element) {
		const discountInput = document.querySelector('#discountCode')
		const checkDiscountButton = document.querySelector('[data-check-discount]')
		const code = element.dataset.presaleCode
		const isPresale = element.classList.contains('is-presale')
		const isFiveWeekMembership = document.querySelector(
			'[data-five-week-membership]'
		)
		const isSpecialCircumstances = document.querySelector(
			'[data-special-circumstances]'
		)
		const gymSelect = document.querySelector('#gymSelect').value
		const priceToggles = document.querySelectorAll('[data-price-toggle]')

		if (!discountInput) {
			return
		}

		if (!code || !isPresale || isFiveWeekMembership || isSpecialCircumstances) {
			discountInput.value = ''
			discountInput.removeAttribute('readonly')

			if (checkDiscountButton) {
				checkDiscountButton.style.display = 'block'
			}

			return
		}

		discountInput.value = code
		discountInput.setAttribute('readonly', 'readonly')

		// ON NON PRESALE GYM PAGES - REMOVE BEVERLEY LEVEL 1 DISCOUNT CODE
		if (
			!document.querySelector('.single-gyms') &&
			!document.querySelector('.page-join-now') &&
			gymSelect == 'Beverley'
		) {
			priceToggles.forEach((toggle) => {
				toggle.addEventListener('click', () => {
					if (toggle.querySelector('input').value == 'level-1') {
						discountInput.value = ''
						discountInput.removeAttribute('readonly')
						checkDiscountButton.style.display = 'block'
					} else {
						discountInput.value = code
						discountInput.setAttribute('readonly', 'readonly')
						checkDiscountButton.style.display = 'none'
					}
				})
			})
		}

		if (checkDiscountButton) {
			checkDiscountButton.style.display = 'none'
		}
	}

	/**
	 * @returns {Date} Min required date for the user to be 18 years old
	 */
	minDateToBeAdult() {
		const isAllowedToBeUnder18 =
			window.location.href.includes('in-club-registration-minor') ||
			window.location.href.includes('guest-sign-up') ||
			window.location.href.includes('?under-18=true')
		const today = new Date()
		const age = isAllowedToBeUnder18 ? 14 : 18
		const ageText = document.querySelector('[data-age]')

		ageText.textContent = age

		return new Date(
			today.getFullYear() - age,
			today.getMonth(),
			today.getDate()
		)
	}

	/**
	 * Toggle the payment type that is being displayed
	 */
	togglePaymentTypes() {
		const paymentTypes = document.querySelectorAll('[name="paymentType"]')
		const paymentFields = document.querySelectorAll('[data-payment-type]')

		paymentTypes.forEach((type) => {
			type.addEventListener('click', (e) => {
				const value = e.target.value

				// Show the form associated with the clicked radio button,
				// and hide the other one
				paymentFields.forEach((field) =>
					field.getAttribute('data-payment-type') === value
						? field.classList.remove('hidden')
						: field.classList.add('hidden')
				)

				// Hide the CC surcharge term if not paying by CC
				const surchargeTerm = document.querySelector('[for="cardSurcharge"]')
				value === 'direct-debit'
					? surchargeTerm.classList.add('hidden')
					: surchargeTerm.classList.remove('hidden')
			})
		})
	}

	/**
	 * Update the start date in the membership placeholder when the user changes their start date
	 */
	updateStartDate() {
		const placeholderStartDates = document.querySelectorAll(
			'[data-start-date-placeholder]'
		)
		const startDateSelect = document.querySelector('[data-start-date]')

		if (!startDateSelect) {
			return
		}

		const startDate = signal(startDateSelect.value)

		placeholderStartDates.forEach((placeholder) =>
			effect(() => (placeholder.textContent = startDate.value))
		)

		startDateSelect.addEventListener(
			'change',
			(e) => (startDate.value = e.target.value)
		)
	}

	/**
	 * Validate the user-entered promo code
	 */
	validatePromoCode() {
		const discountCode = document.querySelector('#discountCode')
		const validateButton = document.querySelector('[data-check-discount]')

		if (!discountCode) {
			return
		}

		if (discountCode.hasAttribute('readonly')) {
			return
		}

		if (discountCode.value !== '') {
			this.ajaxValidatePromoCode(discountCode)
		}

		validateButton?.addEventListener('click', () =>
			this.ajaxValidatePromoCode(discountCode)
		)
	}

	ajaxValidatePromoCode(discountCode) {
		const validateText = document.querySelector('[data-promo-validation]')

		if (!validateText) {
			return
		}

		const discountSummary = document.querySelector('[data-discount-summary]')
		const discountDetail = document.querySelector('[data-discount-detail]')
		const firstPayment = document.querySelector('[data-first-payment]')
		const firstPrice = document.querySelector('[data-first-price]')
		const validity = signal('')
		const discount = signal('')
		const first = signal('')
		const value = discountCode.value
		const gym =
			document.querySelector('#gymSelect')?.value ?? 'HIITFIT ON DEMAND'

		effect(() => (validateText.textContent = validity))
		effect(() => (discountDetail.textContent = discount))
		effect(() => (firstPrice.textContent = first))

		jQuery.ajax({
			type: 'GET',
			dataType: 'json',
			url: '/wp-admin/admin-ajax.php',
			data: {
				action: 'validate_discount',
				security: ajax.nonce,
				code: value,
				gym: gym,
			},
			success: ({ data }) => {
				const { voucher } = data

				if (data.voucher.free_level_two) {
					document.querySelector('[name="discountCodeType"]').value =
						'free_level_two'
					return this.setRevoCBADiscount(
						voucher,
						discountSummary,
						discount,
						validity,
						first
					)
				}

				discountSummary.style.display = null
				firstPayment.style.display = null
				firstPrice.parentElement.style.display = null
				discount.value = voucher.description
				validity.value = ''
				first.value = this.getFirstPaymentText(voucher)
			},
			error: (error) => {
				discountSummary.style.display = 'none'
				firstPayment.style.display = 'none'
				firstPrice.parentElement.style.display = 'none'
				validity.value = error.responseJSON.data
			},
		})
	}

	setRevoCBADiscount(voucher, discountSummary, discount, validity, first) {
		const price = document.querySelector('[data-price]')
		const membershipTypes = document.querySelectorAll(
			'[data-price-toggle] > input'
		)
		const gyms = document.querySelector('#gymSelect')
		const levelOnePrice =
			gyms?.options[gyms.selectedIndex].getAttribute('data-level-one')
		const levelTwo = Array.from(membershipTypes).find(
			(type) => type.value === 'level-2'
		)

		// Set level 2
		levelTwo.click()

		discountSummary.style.display = null
		discount.value = voucher.description
		validity.value = ''

		function setPrice() {
			const isCardPaymentSelected = document.querySelector(
				'[data-payment-type="card"].isActive'
			)
				? true
				: false
			first.value = Number(levelOnePrice).toFixed(2)
			price.textContent = Number(levelOnePrice).toFixed(2)

			if (isCardPaymentSelected) {
				first.value = (Number(levelOnePrice) + Number(2)).toFixed(2)
				price.textContent = (Number(levelOnePrice) + Number(2)).toFixed(2)
			}
		}
		setPrice()
		document
			.querySelectorAll('[data-payment-type]')
			.forEach((item) => item.addEventListener('click', setPrice))
	}

	/**
	 * Return the text to be displayed for the first payment
	 *
	 * @param {object} voucher
	 * @returns {string} The text to be displayed for the first payment
	 */
	getFirstPaymentText(voucher) {
		const price = Number(document.querySelector('[data-price]').textContent)
		const amount = voucher.amount
		const type = voucher.type

		if (type === 'percentage') {
			const discountedPrice = ((price * (100 - amount)) / 100).toFixed(2)
			return String(discountedPrice)
		}

		return price.toFixed(2)
	}

	/**
	 * Show the additional card if the gym supports level 3 memberships
	 */
	handleLevelThreeMembership() {
		const gymSelect = document.querySelector('#gymSelect')
		const stateSelect = document.querySelector('#stateSelect')

		if (
			(!gymSelect || !stateSelect) &&
			gymSelect.selectedOptions[0].dataset.hasLevelThree === 'false'
		) {
			return
		}

		this.toggleCardVisibility()
		gymSelect?.addEventListener('change', () => this.toggleCardVisibility())
		stateSelect?.addEventListener('change', () => this.toggleCardVisibility())
	}

	handleGymSelect() {
		const stateSelect = document.querySelector('#stateSelect')

		if (!stateSelect) {
			return
		}

		stateSelect.addEventListener('change', (e) => {
			const gymSelect = document.querySelector('#gymSelect')

			for (let index = 0; index < gymSelect.options.length; index++) {
				const gym = gymSelect.options[index]
				const activeState = e.target.value

				gym.getAttribute('data-state') === activeState || activeState === 'All'
					? gym.classList.remove('hidden')
					: gym.classList.add('hidden')
			}

			// Remove the selected gym
			gymSelect.querySelector(
				'option[disabled][value="select-a-gym"]'
			).selected = true

			document.querySelector('#state').value =
				gymSelect.options[gymSelect.selectedIndex].dataset.state
		})
	}

	async toggleCardVisibility() {
		// Wait so it grabs the correct value
		await this.wait(100)

		const gymSelect = document.querySelector('#gymSelect')
		const levelThreeCard = document.querySelector('#levelThreeMembership')

		this.glenelgLevelThreePreselect(gymSelect.selectedOptions[0].value)

		if (gymSelect.selectedOptions[0].dataset.hasLevelThree === 'true') {
			levelThreeCard?.classList.remove('hidden')
			return
		}

		// Pitt St temporarily becoming a level 2 only gym
		this.pittStLevelTwoOnly(gymSelect.selectedOptions[0].value)

		if (levelThreeCard) {
			levelThreeCard.classList.add('hidden')
		}
	}

	/**
	 * Preselect Level 3 membership for Glenelg and make the card appear first
	 */
	glenelgLevelThreePreselect(gym) {
		const levelThreeCard = document.querySelector('#levelThreeMembership')
		const levelThreeInput = levelThreeCard?.querySelector('input')
		const levelTwoInput = document.querySelector(
			'[name="membershipType"][value="level-2"]'
		)
		const mostPopularSticker = document.querySelector('#mostPopular')

		if (!levelThreeCard) {
			return
		}

		// Preselect Level 3 membership for Glenelg and reorder
		if (gym === 'Glenelg') {
			levelThreeCard.style.order = -1
			levelThreeCard.classList.remove('hidden')
			mostPopularSticker.classList.add('hidden')
			levelThreeInput?.click()
			return
		}

		// Back to defaults
		mostPopularSticker.classList.remove('hidden')
		levelThreeCard.style.removeProperty('order')
		levelTwoInput?.click()
	}

	/**
	 * Temporarily make Pitt St a level 2 only gym
	 *
	 * @param {string} gym Gym Name
	 * @returns {void}
	 */
	pittStLevelTwoOnly(gym) {
		const goLiveTime = new Date('2024-09-02T12:00:00Z')

		// Convert the target time to Australia/Perth timezone
		const perthTimeOptions = { timeZone: 'Australia/Perth', hour12: false }
		const perthTargetTime = new Intl.DateTimeFormat(
			'en-US',
			perthTimeOptions
		).format(goLiveTime)
		const perthTargetDateTime = new Date(`${perthTargetTime}`)

		// Get the current date and time in Australia/Perth timezone
		const currentDateTime = new Date()
		const perthCurrentTime = new Intl.DateTimeFormat(
			'en-US',
			perthTimeOptions
		).format(currentDateTime)
		const perthCurrentDateTime = new Date(`${perthCurrentTime}`)

		if (perthCurrentDateTime < perthTargetDateTime) {
			return
		}

		const levelOneCard = document
			.querySelector('[name="membershipType"][value="level-1"]')
			?.closest('[data-price-toggle]')
		const levelTwoInput = document.querySelector(
			'[name="membershipType"][value="level-2"]'
		)
		if (gym === 'Pitt St') {
			levelTwoInput?.click()
			levelOneCard?.classList.add('hidden')
		} else {
			levelOneCard?.classList.remove('hidden')
		}
	}

	handleOrientationModal() {
		if (!document.querySelector('[data-orientation-video-container]')) {
			return
		}

		const openTrigger = document.querySelector('[data-open-modal]')
		const container = document.querySelector(
			'[data-orientation-video-container]'
		)

		const closeModal = () => {
			container.classList.add('hidden')
			document.documentElement.classList.remove('overflow-y-hidden')

			const homeVideo = document.querySelector('[data-orientation-video]')

			homeVideo.pause()
			homeVideo.currentTime = 0
		}

		openTrigger.addEventListener('click', () => {
			container.classList.remove('hidden')
			document.documentElement.classList.add('overflow-y-hidden')
		})

		const closeTrigger = document.querySelector('[data-close-video]')
		closeTrigger.addEventListener('click', closeModal)
		document.addEventListener('keydown', (e) =>
			e.key === 'Escape' && !container.classList.contains('hidden')
				? closeModal()
				: null
		)
	}

	async handleLevelTwoCampaign(selectedGym = null) {
		const gymSelect = document.querySelector('#gymSelect')
		const selectedOption = selectedGym || gymSelect.selectedOptions[0]

		// If it's a presale gym, don't clear the discount code
		if (
			selectedOption &&
			selectedOption.classList.contains('is-presale') &&
			selectedOption.dataset.presaleCode
		) {
			return // Exit early for presale gyms
		}

		// Delay until price is check via JS
		await this.wait(100)

		const discountInput = document.querySelector('[data-level-two-campaign]')
		const levelTwoCampaign = discountInput?.dataset?.levelTwoCampaign
			? true
			: false
		const startDate = discountInput?.dataset?.levelTwoCampaignStart
			? discountInput?.dataset?.levelTwoCampaignStart
			: false
		const endDate = discountInput?.dataset?.levelTwoCampaignEnd
			? discountInput?.dataset?.levelTwoCampaignEnd
			: false
		const priceToggles = document.querySelectorAll('[data-price-toggle]')
		const checkDiscountButton = document.querySelector('[data-check-discount]')
		const firstPrice = document.querySelector('[data-first-price]')
		const firstPayment = document.querySelector('[data-first-payment]')
		const discountSummary = document.querySelector('[data-discount-summary]')
		const isLevelTwoCampaign = selectedGym?.hasAttribute(
			'data-is-active-level-two-campaign'
		)

		if (!discountInput) {
			return
		}

		if (
			!document.body.classList.contains('single-gyms') &&
			!isLevelTwoCampaign
		) {
			discountInput.value = ''
			discountInput.removeAttribute('readonly')

			if (checkDiscountButton) {
				checkDiscountButton.style.display = 'block'
			}

			if (discountSummary) {
				discountSummary.style.display = 'none'
			}

			return
		}

		if (!discountInput || !levelTwoCampaign) {
			return
		}

		setDiscountCode()

		priceToggles.forEach((toggle) => {
			toggle.addEventListener('click', () => setDiscountCode())
		})

		function setDiscountCode() {
			const gymSelect = document.querySelector('#gymSelect')
			const selectedGym = gymSelect.selectedOptions[0]
			const isLevelTwoCampaign = selectedGym?.hasAttribute(
				'data-is-active-level-two-campaign'
			)
			const activePrice = document.querySelector(
				'[name="membershipType"]:checked'
			)
			firstPrice.parentElement.style.display = 'none'
			firstPayment.style.display = 'none'

			// Level 1 is selected or it's a presale page
			if (
				activePrice.value === 'level-1' ||
				(!document.body.classList.contains('single-gyms') &&
					!isLevelTwoCampaign)
			) {
				discountInput.value = ''
				discountInput.removeAttribute('readonly')
				checkDiscountButton.style.display = 'block'
				discountSummary.style.display = 'none'

				return
			}

			const today = new Date().toISOString().slice(0, 10).replace(/-/g, '')
			// Level Two Campaign is active
			if (startDate > today || endDate < today || !startDate || !endDate) {
				// If it's a single gym page (presale) else grab it from the gym select dropdown
				if (discountInput.dataset.discountCode) {
					discountInput.value = discountInput.dataset.discountCode
				} else {
					discountInput.value = selectedGym.dataset.presaleCode
				}

				discountInput.setAttribute('readonly', true)
				checkDiscountButton.style.display = 'none'
				discountSummary.style.display = 'flex'

				return
			}

			discountInput.value = discountInput.dataset.discountCode
			discountInput.setAttribute('readonly', true)
			checkDiscountButton.style.display = 'none'
			discountSummary.style.display = 'flex'
			document.querySelector('[data-promo-validation]').textContent = ''
		}
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
}

export default SignUpForm
