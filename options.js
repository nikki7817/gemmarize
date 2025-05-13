document.addEventListener("DOMContentLoaded", () => {
	chrome.storage.sync.get(["geminiApiKey"], ({ geminiApiKey }) => {
		if (geminiApiKey) {
			document.getElementById("api-Key").value = geminiApiKey;
		}
	});

	document.getElementById("save-button").addEventListener("click", () => {
		const apiKey = document.getElementById("api-Key").value.trim();

		if (!apiKey) {
			alert("Please enter a valid API key.");
			return;
		}

		chrome.storage.sync.set({ geminiApiKey: apiKey }, () => {
			const msg = document.getElementById("success-message");
			msg.classList.add("visible");

			setTimeout(() => {
				msg.classList.remove("visible");
				window.close();
			}, 2000);
		});
	});
});
