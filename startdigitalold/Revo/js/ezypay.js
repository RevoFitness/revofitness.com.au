import PriceUpdater from './PriceUpdater'

document.addEventListener('DOMContentLoaded', () => {
	if (!document.querySelector('#sign-up-form')) {
		return
	}

	if (document.querySelector('#gymSelect')) {
		loadHostedPage()
	}

	if (!isCompleted()) {
		disableSubmit()
	}

	document.querySelectorAll('#sign-up-form [required]').forEach((input) => {
		document
			.querySelector('#gymSelect')
			.addEventListener('change', async () => {
				const completed = await isCompleted()
				completed ? enableSubmit() : disableSubmit()
			})

		input.addEventListener('change', async () => {
			const completed = await isCompleted()
			completed ? enableSubmit() : disableSubmit()
		})

		input.addEventListener('blur', async () => {
			const completed = await isCompleted()
			completed ? enableSubmit() : disableSubmit()
		})
	})

	document.getElementById('PostPaymentMethod').addEventListener('click', () => {
		showLoading()
		if (document.querySelector('[data-payment-type="bank"].isActive')) {
			submit()
		} else {
			sendPayment()
		}
	})

	handlePaymentType()
})

/**
 * Handles various actions based on the payment type
 */
function handlePaymentType() {
	const paymentTypes = document.querySelectorAll('[data-payment-type]')
	const bankForm = document.querySelector('[data-bank-form]')

	paymentTypes.forEach((type) => {
		type.addEventListener('click', () => {
			toggleActiveButton(paymentTypes, type)
			toggleCardSurchargeNotice(type)
			updateSurchargeAmount()

			if (document.querySelector('#gymSelect').value === 'select-a-gym') {
				return
			}

			if (
				type.getAttribute('data-payment-type') === 'bank' &&
				type.classList.contains('isActive')
			) {
				document
					.querySelector('[data-ezypay-frame]')
					?.classList.remove('isActive')
				bankForm.classList.remove('hidden')
				bankForm.querySelectorAll('input').forEach((input) => {
					input.setAttribute('required', true)
				})
			} else {
				document.querySelector('[data-ezypay-frame]')?.classList.add('isActive')
				bankForm.classList.add('hidden')
				bankForm.querySelectorAll('input').forEach((input) => {
					input.removeAttribute('required')
				})
			}
		})
	})
}

function toggleActiveButton(paymentTypes, activeType) {
	paymentTypes.forEach((type) => type.classList.remove('isActive'))
	activeType.classList.add('isActive')
}

function toggleCardSurchargeNotice(type) {
	const notice = document.querySelector('[data-surcharge-wrapper] > div')

	if (type.getAttribute('data-payment-type') === 'bank') {
		notice.classList.add('hidden')
	} else {
		notice.classList.remove('hidden')
	}
}

function updateSurchargeAmount() {
	const priceUpdater = new PriceUpdater()
	//priceUpdater.setDefaultMembershipLevel()
	priceUpdater.calculateSurcharge()
	priceUpdater.setPrice()
}

function sendPayment() {
	if (!document.querySelector('[data-payment-type="card"].isActive')) {
		return
	}

	const env = checkEnvironment(window.location.href)
	const prefix = env == 'production' ? 'vault' : 'vault-sandbox'

	const hostedpage = `https://${prefix}.ezypay.com`
	const receiver = document.querySelector(
		`[data-ezypay-frame="card"]`
	).contentWindow

	receiver.postMessage({ actionType: 'create' }, hostedpage)

	paymentToken()
}

function checkEnvironment(url) {
	let env

	if (url.includes('revofitness.test') || url.includes('localhost')) {
		env = 'production'
	} else if (url.includes('staging.revofitness.com.au')) {
		env = 'production'
	} else {
		env = 'production'
	}

	return env
}

function paymentToken() {
	window.addEventListener('message', function (e) {
		const response = typeof e.data === 'string' ? JSON.parse(e.data) : e.data

		if (response.error) {
			hideLoading()
			throw new Error(`Error: ${response.error.message}`)
		}

		if (response.data.status === 'invalid') {
			hideLoading()
		}

		// Still pending, just wait it out
		if (!response.data || !response.data.type) {
			return
		}

		setInputValues(response.data)
	})
}

function setInputValues(data) {
	const { paymentMethodToken, card } = data

	document.querySelector('#paymentMethodToken').value = paymentMethodToken
	document.querySelector('#accountHolderName').value =
		card !== null ? card.accountHolderName : null
	document.querySelector('#firstSix').value = card !== null ? card.first6 : null
	document.querySelector('#lastFour').value = card !== null ? card.last4 : null
	document.querySelector('#cardExpiry').value =
		card !== null ? `20${card.expiryYear}-${card.expiryMonth}` : null
	document.querySelector('#cardType').value = card !== null ? card.type : null

	submit()
}

async function isCompleted() {
	const requiredFields = document.querySelectorAll('#sign-up-form [required]')

	if (document.querySelector('#gymSelect').value === 'select-a-gym') {
		return false
	}

	await wait(200)

	for (const field of requiredFields) {
		if (field.closest('[data-bank-form]')?.classList.contains('hidden')) {
			continue
		}

		if (field.type === 'checkbox' && !field.checked) {
			return false
		} else if (field.type !== 'checkbox' && !field.value.trim()) {
			return false
		}
	}

	return true
}

function disableSubmit() {
	document.getElementById('PostPaymentMethod').setAttribute('disabled', true)
}

function enableSubmit() {
	document.getElementById('PostPaymentMethod').removeAttribute('disabled')
}

function submit() {
	document.getElementById('sign-up-form').submit()
}

function showLoading() {
	const loader = document.querySelector('[data-loader]')
	loader.style.display = 'flex'
}

function hideLoading() {
	const loader = document.querySelector('[data-loader]')
	loader.style.display = 'none'
}

/**
 * Load the correct hosted page depending on what gym the user selected
 */
async function loadHostedPage() {
	await wait(100)
	const gymSelect = document.querySelector('#gymSelect')
	const stateSelect = document.querySelector('#stateSelect')
	let currentGym = gymSelect.value

	checkIfGymAcceptsCardPayment(gymSelect)
	fetchAuthToken(currentGym)

	gymSelect.addEventListener('change', () => {
		currentGym = gymSelect.value
		checkIfGymAcceptsCardPayment(gymSelect)
		fetchAuthToken(currentGym)
	})

	stateSelect?.addEventListener('change', async () => {
		await wait(100)
		currentGym = gymSelect.options[gymSelect.selectedIndex].value
		checkIfGymAcceptsCardPayment(gymSelect)
		fetchAuthToken(currentGym)
	})
}

function checkIfGymAcceptsCardPayment(gymSelect) {
	const selected = gymSelect.options[gymSelect.selectedIndex]
	const acceptsCardPayment = selected.hasAttribute('data-accepts-card-payment')
	const cardButton = document.querySelector('[data-payment-type="card"]')

	// Show the card payment option if the gym accepts card payments
	if (acceptsCardPayment) {
		cardButton?.classList.contains('hidden')
			? cardButton?.classList.remove('hidden')
			: null
		document.querySelector('.bank-fee-svg').classList.remove('hidden')
		return
	}

	// Otherwise disable the card payment option by updating UI
	document.querySelector('[data-payment-type="card"]')?.classList.add('hidden')
	document
		.querySelector('[data-payment-type="bank"]')
		?.classList.add('isActive')
	document.querySelector('[data-bank-form]')?.classList.remove('hidden')
}

function fetchAuthToken(gym) {
    console.log("fetchAuthToken called with gym:", gym);
    const container = document.querySelector("[data-hosted-page-container]");
    const loader = document.querySelector("[data-ezypay-loader]");

    if (!loader) {
        return;
    }

    if (gym === "select-a-gym") {
        console.log("Invalid gym selected. Aborting fetchAuthToken.");
        return;
    }

    loader.style.display = "flex";

    jQuery.ajax({
        type: "GET",
        dataType: "json",
        url: "/wp-admin/admin-ajax.php",
        data: {
            action: "get_auth_token",
            security: ajax.nonce,
            gym,
        },
        success: ({ data }) => {
            console.log("AJAX Success:", data);
            loader.style.display = "none";
            container.innerHTML = "";
            container.insertAdjacentHTML("beforeend", ezypayFrame(data));
        },
        error: (error) => {
            console.error("AJAX Error:", error);
            loader.style.display = "none";
            alert("Failed to fetch auth token. Please try again.");
        },
    });
}

/**
 * Returns the iFrame to be loaded
 */
function ezypayFrame(authToken) {
	const env = checkEnvironment(window.location.href)
	const prefix = env == 'production' ? 'vault' : 'vault-sandbox'
	const isActive = document.querySelector('[data-payment-type="card"].isActive')

	return `<iframe data-ezypay-frame="card" class="${
		isActive ? 'isActive' : ''
	}" style="border: 0; width: 100%; height:100%;min-height:570px" src="https://${prefix}.ezypay.com/paymentmethod/embed?token=${authToken}&countryCode=AU&paymentMethods=VISA,MASTERCARD"></iframe>`
}

/**
 * Wait the specified amount of time before continuing
 *
 * @param {Number} amount
 * @returns {Promise}
 */
function wait(amount = 0) {
	return new Promise((resolve, reject) => {
		this.timerId = setTimeout(resolve, amount)
		this.cancelPromise = reject
	})
}
