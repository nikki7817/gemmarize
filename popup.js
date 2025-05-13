// Event listener for the "summarize" button.
document.getElementById("summarize").addEventListener("click", () => {
	const result = document.getElementById("result"); // Element to display the summary or errors.
	const summaryType = document.getElementById("summary-type").value; // Get the selected summary type (brief, detailed, bullets).

	// Display a loader while fetching the summary.
	result.innerHTML = '<div class="loader"></div>';

	// Get the Gemini API key from storage.
	chrome.storage.sync.get(["geminiApiKey"], ({ geminiApiKey }) => {
		// If the API key is not set, display an error and return.
		if (!geminiApiKey) {
			result.textContent = "Please set your Gemini API key.";
			return;
		}

		// Query for the active tab in the current window.
		chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
			// Send a message to the content script in the active tab to get the article text.
			chrome.tabs.sendMessage(
				tab.id,
				{ type: "GET_ARTICLE_TEXT" },
				async ({ text }) => {
					// Callback function that receives the article text.
					// If no text was extracted, display an error.
					if (!text) {
						result.textContent = "Couldn't extract any article text.";
						return;
					}

					// Try to get the summary from the Gemini API.
					try {
						const summary = await getGeminiSummary(
							text,
							summaryType,
							geminiApiKey
						);
						result.textContent = summary; // Display the summary.
					} catch (error) {
						console.error("Error fetching summary:", error);
						result.textContent = "Error fetching summary. Please try again.";
					}
				}
			);
		});
	});
});

// Asynchronously fetches a summary from the Gemini API.
async function getGeminiSummary(rawText, type, apiKey) {
	const max = 20000; // Maximum character length for the text to be summarized.
	// Truncate the text if it exceeds the maximum length.
	const text = rawText.length > max ? rawText.slice(0, max) + "..." : rawText;

	// Define prompts for different summary types.
	const promptMap = {
		brief: `Summarize the following text in 3 sentences:\n\n${text}`,
		detailed: `Summarize the following text in 15 sentences:\n\n${text}`,
		bullets: `Summarize the following text in 5 bullet points:\n\n${text}`,
	};

	// Select the appropriate prompt based on the summary type, defaulting to 'brief'.
	const prompt = promptMap[type] || promptMap.brief;

	// Make a POST request to the Gemini API.
	const res = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				contents: [{ parts: [{ text: prompt }] }],
				generationConfig: { temperature: 0.2 }, // Controls the randomness of the output.
			}),
		}
	);

	// If the API request was not successful, throw an error.
	if (!res.ok) {
		const { error } = await res.json();
		console.error("Error from Gemini API:", error);
		throw new Error("Failed to fetch summary");
	}

	// Parse the JSON response from the API.
	const data = await res.json();
	// Extract and return the summary text, or a default message if not found.
	return data.candidates?.[0]?.content?.parts?.[0]?.text ?? "No summary found";
}

// Event listener for the "copy-btn" button.
document.getElementById("copy-btn").addEventListener("click", () => {
	const resultEl = document.getElementById("result"); // Element containing the text to copy.
	const copyBtn = document.getElementById("copy-btn"); // The copy button itself.

	const text = resultEl.innerText; // Get the text content from the result element.
	if (!text) return; // If there's no text, do nothing.

	// Use the Clipboard API to write the text to the clipboard.
	navigator.clipboard
		.writeText(text)
		.then(() => {
			// On successful copy, update the button text and revert after 2 seconds.
			copyBtn.textContent = "Copied!";
			setTimeout(() => {
				copyBtn.textContent = "Copy";
			}, 2000);
		})
		.catch((err) => {
			// On error, log the error and update the button text, then revert.
			console.error("Clipboard copy failed:", err);
			copyBtn.textContent = "Error";
			setTimeout(() => {
				copyBtn.textContent = "Copy";
			}, 2000);
		});
});
