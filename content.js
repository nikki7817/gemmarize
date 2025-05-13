function getArticleText() {
	const article = document.querySelector("article");
	if (article) {
		const paragraphs = Array.from(article.querySelectorAll("p"));
		return paragraphs.map((p) => p.innerText).join("\n");
	}

	// Fallback if no <article> exists
	const paragraphs = Array.from(document.querySelectorAll("p"));
	return paragraphs.map((p) => p.innerText).join("\n");
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	if (request.type === "GET_ARTICLE_TEXT") {
		const text = getArticleText();
		sendResponse({ text });
		return true; // Allows asynchronous sendResponse
	}
});
