// python -m http.server 
// const floating_btn = document.querySelector('.floating-btn');
// const close_btn = document.querySelector('.close-btn');
// const social_panel_container = document.querySelector('.social-panel-container');

// floating_btn.addEventListener('click', () => {
// 	social_panel_container.classList.toggle('visible')
// });

// close_btn.addEventListener('click', () => {
// 	social_panel_container.classList.remove('visible')
// });
const categories = ['general', 'business', 'sports', 'health', 'entertainment', 'science', 'technology']
window.addEventListener('load', (event)=>{

	initializePage()
	topNews()
})


const API_URL = "http://newsapi.org/v2/top-headlines?"
const topNews= async (category='general', country='in')=>{
	let request = new Request(API_URL+ new URLSearchParams({
		apiKey:API_KEY,
		sortBy:'popularity',
		country: country,
		category: category,
	}))
	response = await (await fetch(request)).json()
	renderNews(response)
}

const renderNews = (response)=>{
	const news_container = document.getElementById('news-container')
	news_container.innerHTML = ``
	response.articles.forEach((article) => {
		let date = new Date(article.publishedAt)
		let div_content = `<div class="news">`
		let image_content =``
		if(article.urlToImage) image_content = `<img class="news-img" src="${article.urlToImage}" />`
		div_content += `<div class="news-preview">
			${image_content}
		</div>
		<div class="news-info">
			<h6>Source: ${article.source.name}</h6>
			<h6>${date.toDateString()}</h6>
			<h2>${article.title}</h2>
			<a href="${article.url}" target="_blank"><button class="btn news-btn">View</button></a>
		</div>
	</div>`
	news_container.innerHTML += div_content

	});
}

const initializePage = ()=>{
	let category_buttons = document.querySelectorAll('button.category-btn')
	Array.from(category_buttons).forEach((button, idx)=>{
		button.addEventListener('click',(e)=>{
			console.log('here')
			topNews(categories[idx])
		}, false)
	})
}