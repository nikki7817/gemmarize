// Fires when the extension is installed or updated.
chrome.runtime.onInstalled.addListener(() => {
	console.log("Extension installed or updated.");

	// Check if 'geminiApiKey' is stored in chrome.storage.sync.
	chrome.storage.sync.get(["geminiApiKey"], (result) => {
		// If 'geminiApiKey' is not found, open the options page.
		if (!result.geminiApiKey) {
			console.log("Gemini API key not found. Opening options page.");
			// This page allows the user to set their API key.
			chrome.tabs.create({ url: "options.html" });
		} else {
			// API key is already set.
			console.log("Gemini API key is already set.");
		}
	});
});
