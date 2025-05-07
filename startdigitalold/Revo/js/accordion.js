import addListenerToChildElements from '../../js/utils/add-child-event-listener'

export default function setupAccordions() {
	const parentSelector = '[data-accordion-container]'
	if (!document.querySelector(parentSelector)) {
		return
	}

	const accordionHeaders = document.querySelectorAll('.accordion-header')
	accordionHeaders.forEach((header) => {
		const isActive = header.classList.contains('active')

		const accordionContent = header.nextElementSibling
		accordionContent.style.maxHeight = isActive
			? accordionContent.scrollHeight + 'px'
			: 0

		// Add event listener directly to existing accordion headers
		header.addEventListener('click', toggleAccordion)
	})

	// Add delegated event listener for future accordion headers
	addListenerToChildElements(
		parentSelector,
		'.accordion-header',
		toggleAccordion
	)
}

function toggleAccordion(e) {
	const header = this // 'this' refers to the element on which the event was fired
	const content = header.nextElementSibling
	header.classList.toggle('active')
	if (header.classList.contains('active')) {
		content.style.maxHeight = content.scrollHeight + 'px'
	} else {
		content.style.maxHeight = 0
	}
}
