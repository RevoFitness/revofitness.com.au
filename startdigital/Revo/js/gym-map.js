import { Loader } from '@googlemaps/js-api-loader'
import addListenerToChildElements from '../../js/utils/add-child-event-listener'

async function initializeMap() {
	const loader = new Loader({
		apiKey: 'AIzaSyD_d1JOhjTigBNWCsSCuhjyqmDeyBEinoU',
		version: 'weekly',
		libraries: ['places'],
	})

	try {
		await loader.importLibrary('core')
		const { Map } = await google.maps.importLibrary('maps')
		const { Autocomplete } = await google.maps.importLibrary('places')

		// Initialize the map
		window.map = new Map(document.getElementById('gymMap'), getMapOptions())
		// Only if the user is on the All state then we zoom out
		document.querySelector('[data-state-buttons] [data-state="All"].isActive')
			? window.map.setZoom(4)
			: null
		window.geocoder = new google.maps.Geocoder()

		// Create the autocomplete input field
		const input = document.querySelector('#addressAutocomplete')
		const options = {
			types: ['postal_code', 'locality'],
			componentRestrictions: { country: 'AU' },
			fields: ['address_components', 'formatted_address'],
		}
		window.autocomplete = new Autocomplete(input, options)

		return window.map
	} catch (error) {
		console.error(error)
		throw error // Re-throw the error to be caught by the caller
	}
}

export function initializeGymMap() {
	if (!document.querySelector('#gymMap')) {
		return
	}

	initializeMap()
		.then(async () => {
			const { latitude, longitude } = await getLocationFromIP()
			const { gyms, markers } = await addGymsToMap()
			const infoWindow = new google.maps.InfoWindow({
				content: '',
				arialLabel: '',
			})

			window.infoWindow = infoWindow
			window.markers = markers
			window.map.setCenter({ lat: latitude, lng: longitude })
			setupInfoWindows(infoWindow, markers)
			setupCardToMarkerAssociation()
			setupToggleState()
			setupAutocomplete()
			setupClearInput()
		})
		.catch((error) => {
			console.error('Failed to initialize map:', error)
		})
}

/**
 * Set the center of the map based on the users IP
 */
async function getLocationFromIP() {
	const storageKey = 'userLocation'
	let location = localStorage.getItem(storageKey)

	// Check if the stored data doesn't have a storedDate
	if (location) {
		location = JSON.parse(location)

		if (!location.storedDate) {
			localStorage.removeItem(storageKey)
			location = null
		}
	}

	if (location) {
		return location
	}

	const response = await fetch(ajax.ajax_url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			action: 'get_user_location',
		}),
	})

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	const { data } = await response.json()
	let { state, latitude, longitude } = data
	latitude = Number(latitude)
	longitude = Number(longitude)

	const today = new Date()
	const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(
		today.getMonth() + 1
	)
		.toString()
		.padStart(2, '0')}/${today.getFullYear()}`

	const locationData = {
		state,
		latitude,
		longitude,
		storedDate: formattedDate, // Store the current date in Australian format
	}

	localStorage.setItem(storageKey, JSON.stringify(locationData))

	return locationData
}

/**
 * Add markers for the Gyms to the map
 */
async function addGymsToMap() {
	const response = await fetch(ajax.ajax_url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			action: 'get_gyms',
		}),
	})

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	const { data: gyms } = await response.json()

	const markers = []
	gyms.forEach((gym) => {
		let { latitude, longitude } = gym.fields

		// Override lat/lng for Modbury
		if (gym.post_title.toLowerCase().includes('modbury')) {
			latitude = -34.82960547422781
			longitude = 138.69172072516687
		}

		// Skip if no coordinates
		if (!latitude || !longitude) return

		const marker = new google.maps.Marker({
			position: {
				lat: parseFloat(latitude),
				lng: parseFloat(longitude),
			},
			map: window.map,
			title: gym.post_title,
			icon: {
				anchor: new google.maps.Point(14, 36),
				url: 'data:image/svg+xml;utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="27.67" height="36.893" viewBox="0 0 27.67 36.893"><g><path fill="%23cb333b" d="M13.835 0A13.853 13.853 0 0 0 0 13.835c0 9.932 12.89 22.372 13.437 22.9a.571.571 0 0 0 .8 0c.548-.525 13.437-12.964 13.437-22.9A13.853 13.853 0 0 0 13.835 0Z" data-name="Path 5042"/><path fill="%23fff" d="M19.281 18.447h-3.913l-2.392-3.571h-1.27v3.572H8.391v-2.312l3.142-4.289h2.23c.923 0 1.452-.419 1.452-1.149v-.032c0-.688-.384-1.063-1.176-1.148l-.742-.079 2.1-2.863.288.084a3.806 3.806 0 0 1 2.877 3.88v.036a3.856 3.856 0 0 1-2.171 3.642Z" data-name="Path 5043"/></g></svg>',
			},
		})

		markers.push(marker)
	})

	return { gyms, markers }
}


/**
 * Setup all the infoWindows
 */
function setupInfoWindows(infoWindow, markers) {
	markers.forEach((marker) =>
		google.maps.event.addListener(marker, 'click', () =>
			openInfoWindow(infoWindow, marker)
		)
	)
}

function openInfoWindow(infoWindow, marker) {
	const content = document.querySelector(
		`[data-info-window="${marker.title}"]`
	).outerHTML // The associated info window for the marker
	infoWindow.setContent(content)
	infoWindow.open({
		anchor: marker,
		map: window.map,
	})
}

/**
 * Setup the active state listeners (with delegation for AJAX updated HTML elements)
 *
 * @param {InfoWindow} infoWindow
 * @param {Marker} markers
 * @param {Map} map
 */
function setupCardToMarkerAssociation() {
	const gymCards = document.querySelectorAll('[data-gym-cards] [data-gym]')

	gymCards.forEach((card) => {
		const mapToggleButton = card.querySelector('[data-map-toggle-button]')

		mapToggleButton.addEventListener('click', (e) =>
			toggleMarkerActiveState(e, window.infoWindow, window.markers)
		)
	})
}

/**
 * Toggles the active state
 *
 * @param {Event} e event
 * @returns void
 */
function toggleMarkerActiveState(e, infoWindow, markers) {
	const gym = e.target.closest('[data-gym') ?? e.target
	const gymCards = document.querySelectorAll('[data-gym]')
	const gymMarker = markers.filter(
		(m) => m.title === gym.getAttribute('data-gym')
	)?.[0]

	// All Gyms inactive except this one
	gymCards.forEach((gym) => gym.classList.remove('isActive'))
	gym.classList.add('isActive')

	// No marker for this gym
	if (!gymMarker.position.lat() || !gymMarker.position.lng()) {
		return
	}

	openInfoWindow(infoWindow, gymMarker)
}

/**
 * Setup event listener to handle state switching
 */
function setupToggleState() {
	const stateButtons = document.querySelectorAll(
		'[data-state-buttons] [data-state]'
	)

	// DESKTOP CONTROLS
	const controlsContainer = document.querySelector('[data-controls]')

	// MOBILE CONTROLS
	const cardsContainer = document.querySelector('[data-gym-cards]')

	stateButtons.forEach((button) => {
		button.addEventListener('click', (e) => {
			const state = e.target.dataset.state
			// Already active
			if (e.target.classList.contains('isActive')) {
				return
			}

			updateGymsWhereState(state)

			stateButtons.forEach((state) => state.classList.remove('isActive'))
			e.target.classList.add('isActive')

			if (controlsContainer) {
				controlsContainer.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
			}

			if (cardsContainer) {
				cardsContainer.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
			}
		})
	})
}

/**
 * Get Gyms by state
 */
function updateGymsWhereState(activeState, setCenter = true) {
	// DESKTOP CONTROLS
	const controlsContainer = document.querySelector('[data-controls]')

	// MOBILE CONTROLS
	const cardsContainer = document.querySelector('[data-gym-cards]')

	cardsContainer.querySelectorAll('[data-gym]').forEach((gym) => {
		const state = gym.getAttribute('data-state')

		state === activeState || activeState === 'All'
			? gym.classList.remove('!hidden')
			: gym.classList.add('!hidden')
	})

	// Update the map
	const center = getLocationByState(activeState)
	const { latitude, longitude } = center

	// Only do this sometimes :)
	if (setCenter) {
		window.map.setCenter({ lat: latitude, lng: longitude })
	}

	if (activeState === 'All') {
		window.map.setZoom(4)
		return
	}

	window.map.setZoom(10)

	if (controlsContainer) {
		controlsContainer.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}

	if (cardsContainer) {
		cardsContainer.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}
}

/**
 * Order gyms by those that are closest to the user first and then add to the DOM
 */
async function updateGymsByClosestToUser(state, latitude, longitude) {
	// DESKTOP CONTROLS
	const controlsContainer = document.querySelector('[data-controls]')

	// MOBILE CONTROLS
	const cardsContainer = document.querySelector('[data-gym-cards]')

	const response = await fetch(ajax.ajax_url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			action: 'get_gyms_by_closest',
			state: state,
			latitude: latitude,
			longitude: longitude,
		}),
	})

	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`)
	}

	const {
		data: { html, closest },
	} = await response.json()

	cardsContainer.innerHTML = html

	setupCardToMarkerAssociation()

	// Update the map
	window.markers.forEach((marker) => {
		if (marker.title === closest.post_title) {
			window.map.setCenter(marker.position)
			window.map.setZoom(11)
			openInfoWindow(window.infoWindow, marker)
		}
	})

	if (controlsContainer) {
		controlsContainer.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}

	if (cardsContainer) {
		cardsContainer.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
	}
}

/**
 * Get the location by state
 *
 * @param {string} state
 * @returns {JSON} Location object
 */
function getLocationByState(state) {
	const data = getLocationObject(state)

	let { city, latitude, longitude } = data
	latitude = Number(latitude)
	longitude = Number(longitude)

	return { city, latitude, longitude }
}

/**
 * Setup our event listeners
 */
function setupAutocomplete() {
	// You can add an event listener to handle the place_changed event
	// This event is fired when a user selects a place from the autocomplete predictions
	google.maps.event.addListener(window.autocomplete, 'place_changed', () =>
		updateMapWithAutocomplete(autocomplete)
	)
}

/**
 * Handle updating the map based on the autocomplete
 */
function updateMapWithAutocomplete(autocomplete) {
	const place = autocomplete.getPlace()
	const container = document.querySelector('[data-gym-cards]')

	// Do nothing, not a valid query
	if (!place.formatted_address) {
		return
	}

	const address = document.querySelector('#addressAutocomplete').value
	geocoder.geocode({ address: address }, (results, status) => {
		if (status !== 'OK') {
			return
		}

		// Remove old marker so we can set the new one
		if (this.marker) {
			this.marker.setMap(null)
		}

		const result = results[0]
		const state = result.address_components.filter((address) =>
			address.types.includes('administrative_area_level_1')
		)[0].short_name
		const latitude = result.geometry.location.lat()
		const longitude = result.geometry.location.lng()
		const stateButtons = document.querySelectorAll(
			'[data-state-buttons] [data-state]'
		)

		updateGymsByClosestToUser(state, latitude, longitude)
		stateButtons.forEach((button) =>
			button.textContent === state
				? button.classList.add('isActive')
				: button.classList.remove('isActive')
		)
		map.setCenter(result.geometry.location)
		this.marker = new google.maps.Marker({
			map: window.map,
			position: result.geometry.location,
		})
	})
}

/**
 * Get the location details by state
 *
 * @param {string} state The state name or abbreviation
 * @return {Object} An object containing the city, latitude, and longitude
 */
function getLocationObject(state) {
	const city = getCapitalCityByState(convertStateName(state))
	const latLng = getLatLongByCity(city)

	return {
		city: city,
		latitude: latLng[0],
		longitude: latLng[1],
	}
}

/**
 * Map the state shortname / long name
 */
function convertStateName(name) {
	const states = {
		All: 'All',
		NSW: 'New South Wales',
		VIC: 'Victoria',
		// QLD: 'Queensland',
		SA: 'South Australia',
		WA: 'Western Australia',
		// TAS: 'Tasmania',
		// NT: 'Northern Territory',
	}

	if (states[name]) {
		return states[name] // Convert short name to long name
	} else {
		const reversedStates = Object.keys(states).reduce((obj, key) => {
			obj[states[key]] = key
			return obj
		}, {})
		return reversedStates[name] // Convert long name to short name
	}
}

/**
 * Get the capital city by state
 *
 * @param {string} state The state the user is in
 * @return {string} The capital city of the state
 */
function getCapitalCityByState(state) {
	const australianStatesCapitals = {
		All: 'All',
		'New South Wales': 'Sydney',
		Victoria: 'Melbourne',
		// Queensland: 'Brisbane',
		'South Australia': 'Adelaide',
		'Western Australia': 'Perth',
		// Tasmania: 'Hobart',
		// 'Northern Territory': 'Darwin',
	}

	return australianStatesCapitals[state] || 'All'
}

/**
 * Get the latitude and longitude by city
 *
 * @param {string} city The city name
 * @return {Array} The latitude and longitude of the city
 */
function getLatLongByCity(city) {
	const citiesLatLong = {
		All: ['-25.274400', '133.775100'],
		Perth: ['-31.953512', '115.857048'],
		Sydney: ['-33.868820', '151.209290'],
		Melbourne: ['-37.813610', '144.963100'],
		// Brisbane: ['-27.469770', '153.025131'],
		Adelaide: ['-34.928490', '138.600740'],
		// Hobart: ['-42.882140', '147.327200'],
		// Canberra: ['-35.280937', '149.130009'],
		// Darwin: ['-12.463440', '130.845642'],
	}

	return citiesLatLong[city] || citiesLatLong['All']
}

/**
 * Reset the autocomplete input and put gyms back in their original order
 */
function setupClearInput() {
	const autocomplete = document.getElementById('addressAutocomplete')
	const reset = document.getElementById('resetAddressAutocomplete')

	// DESKTOP CONTROLS
	const controlsContainer = document.querySelector('[data-controls]')

	// MOBILE CONTROLS
	const cardsContainer = document.querySelector('[data-gym-cards]')

	reset.addEventListener('click', async () => {
		if (autocomplete.value === '') {
			return
		}

		const state =
			document
				.querySelector('[data-state-buttons] [data-state].isActive')
				?.getAttribute('data-state') ?? 'All'
		window.infoWindow.close()
		autocomplete.value = ''
		updateGymsWhereState(state)

		// Alphabetically order the gyms
		const gyms = document.querySelectorAll('[data-gym-cards] [data-gym]')
		const sortedGyms = Array.from(gyms).sort((a, b) => {
			const nameA = a.getAttribute('data-gym').toLowerCase()
			const nameB = b.getAttribute('data-gym').toLowerCase()
			return nameA.localeCompare(nameB)
		})

		sortedGyms.forEach((item, index) => {
			item.style.order = index
		})

		if (controlsContainer) {
			controlsContainer.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
		}

		if (cardsContainer) {
			cardsContainer.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
		}
	})
}

/**
 * Get the map options
 */
function getMapOptions() {
	return {
		zoom: 10,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: false,
		styles: [
			{
				stylers: [
					{
						visibility: 'on',
					},
				],
			},
			{
				featureType: 'landscape.man_made',
				stylers: [
					{
						color: '#eae7e1',
					},
				],
			},
			{
				featureType: 'landscape.man_made',
				elementType: 'labels.icon',
				stylers: [
					{
						color: '#fcf9f1',
					},
				],
			},
			{
				featureType: 'poi.park',
				stylers: [
					{
						lightness: 20,
					},
				],
			},
			{
				featureType: 'poi.park',
				elementType: 'geometry.fill',
				stylers: [
					{
						color: '#71ca82',
					},
				],
			},
			{
				featureType: 'poi.park',
				elementType: 'labels.text.fill',
				stylers: [
					{
						color: '#357e58',
					},
				],
			},
			{
				featureType: 'poi.park',
				elementType: 'labels.text.stroke',
				stylers: [
					{
						color: '#ffffff',
					},
				],
			},
			{
				featureType: 'road.highway',
				elementType: 'geometry.fill',
				stylers: [
					{
						color: '#fed133',
					},
				],
			},
			{
				featureType: 'water',
				elementType: 'geometry.fill',
				stylers: [
					{
						color: '#6acff6',
					},
				],
			},
			{
				featureType: 'water',
				elementType: 'labels.text',
				stylers: [
					{
						color: '#0074bc',
					},
				],
			},
		],
	}
}
