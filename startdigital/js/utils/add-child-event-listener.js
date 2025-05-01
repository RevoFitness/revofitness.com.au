/**
 * Creates a delegated event listener.
 *
 * Listens for the specified event on elements that match the given selector,
 * even if they are added to the document after the event listener is established.
 * This is useful when you have dynamically added elements and you want to attach
 * event listeners to them without having to reattach the listeners every time
 * a new element is added.
 *
 * @param {string} selector - The CSS selector to match against the event target
 * @param {function} handler - The event handler function to invoke when the event occurs
 * @returns {function} - A function that can be used as an event handler in addEventListener
 */
export default function addListenerToChildElements(
	parentSelector,
	childSelector,
	handler
) {
	if (typeof handler !== 'function') {
		console.error('Handler must be a function')
		return
	}

	const parent = document.querySelector(parentSelector)
	if (!parent) {
		console.error('Parent element not found')
		return
	}

	parent.addEventListener('click', function (event) {
		let element = event.target

		while (element && element !== parent) {
			if (element.matches(childSelector)) {
				handler.call(element, event)
				return
			}
			element = element.parentElement
		}
	})
}
