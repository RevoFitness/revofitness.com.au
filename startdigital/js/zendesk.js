document.addEventListener('DOMContentLoaded', () => {
	if (!document.querySelector('[data-zendesk]')) {
		return
	}

	document
		.querySelector('[data-search-articles]')
		.addEventListener('submit', (e) => searchArticles(e))

	document
		.querySelector('input[type="reset"]')
		.addEventListener('click', (e) => resetSearchForm(e))

	// Filter by 'getting started' as a default
	filterCategories(360004873491)
	document
		.querySelector('[data-categories]')
		.addEventListener('change', (e) => filterCategories(e.target.value))

	prefillSearchQuery()
})

/**
 * If a search query exists in the URL, show the results for that query
 */
function prefillSearchQuery() {
	const params = new URL(document.location).searchParams
	const query = params.get('search')
	const form = document.querySelector('[data-search-articles]')
	const search = form.querySelector("input[name='search']")

	if (!query) {
		return
	}

	search.value = query
	searchArticles({ preventDefault: () => {}, target: form })
}

function searchArticles(e) {
	e.preventDefault()
	const value = e.target.querySelector('input').value
	const articles = document.querySelectorAll('[data-zendesk-article]')

	articles.forEach((article) => {
		const title = article.querySelector('[data-article-title]')
		const body = article.querySelector('[data-article-body]')
		const containsSearch =
			title.textContent.includes(value) || body.textContent.includes(value)

		containsSearch
			? article.classList.remove('hidden')
			: article.classList.add('hidden')
	})
}

async function getArticles(e) {
	e.preventDefault()
	const container = document.querySelector('[data-articles-container]')

	const response = await fetch(`/wp-json/revo/v1/zendesk/articles`)
	const data = await response.json()

	if (data.html) {
		container.innerHTML = data.html
	} else {
		container.innerHTML = 'Sorry, nothing matched that your search term.'
	}
}

function resetSearchForm(e) {
	const form = e.target.closest('form')
	const params = new URLSearchParams(window.location.search)
	const query = params.get('search')

	if (query) {
		params.delete('search')
	}

	// Create a new URL without the "search" parameter
	const newUrl = `${window.location.pathname}${window.location.hash}`

	// Update the URL without refreshing the page
	window.history.replaceState({}, '', newUrl)

	getArticles({ preventDefault: () => {}, target: form })
}

/**
 * Filters the articles by category.
 *
 * @param {number} category - The category ID to filter by.
 * @returns {void}
 */
async function filterCategories(category) {
	const articles = document.querySelectorAll('[data-zendesk-article]')

	articles.forEach((article) => {
		const categoryId = article.dataset.categoryid

		categoryId == category
			? article.classList.remove('hidden')
			: article.classList.add('hidden')
	})
}
