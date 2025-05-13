# Gemmarize

![Gemmarize Logo](icon.png)

## Overview

Gemmarize is a Chrome extension that leverages Google's Gemini API to provide quick and customizable summaries of web articles. With just a click, you can distill lengthy content into concise, easy-to-digest formats.

## Features

- **Instant Summaries**: Summarize any article on the current webpage with a single click
- **Multiple Summary Formats**:
  - Brief (3 sentences)
  - Detailed (15 sentences)
  - Bullet Points (5 key points)
- **Copy to Clipboard**: Easily copy the generated summary with one click
- **Modern UI**: Clean, responsive interface with visual feedback
- **Secure**: Your API key is stored locally in your browser

## Installation

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" (toggle in the top-right corner)
4. Click "Load unpacked" and select the directory containing the extension files
5. The Gemmarize icon should now appear in your browser toolbar

## Setup

1. After installation, the extension will automatically open the options page
2. Obtain a Gemini API key from [Google AI Studio](https://makersuite.ai/gemini)
3. Enter your API key in the options page and click "Save Settings"

## Usage

1. Navigate to any article or content-rich webpage
2. Click the Gemmarize icon in your browser toolbar
3. Select your preferred summary format from the dropdown (Brief, Detailed, or Bullet Points)
4. Click "Summarize" to generate the summary
5. Use the "Copy" button to copy the summary to your clipboard

## How It Works

Gemmarize extracts the main content from webpages by targeting article elements and paragraphs. It then sends this text to the Gemini API with specific prompts based on your selected summary type. The API returns a concise summary which is displayed in the extension popup.

## Files and Structure

- `manifest.json`: Extension configuration and permissions
- `background.js`: Handles extension installation and API key verification
- `content.js`: Extracts article text from the current webpage
- `popup.html` & `popup.js`: User interface and main functionality
- `options.html` & `options.js`: API key management interface

## Requirements

- Google Chrome browser (or Chromium-based browsers)
- Gemini API key (get one at [Google AI Studio](https://makersuite.ai/gemini))

## Privacy

Gemmarize only extracts text from the current webpage when you click the "Summarize" button. Your API key is stored locally in Chrome's secure storage system and is only used to authenticate API requests to Google's Gemini service.

## Troubleshooting

- **"Please set your Gemini API key"**: Navigate to the options page by right-clicking the extension icon and selecting "Options"
- **"Couldn't extract any article text"**: The extension may have difficulty identifying the main content on some webpages
- **"Error fetching summary"**: Verify your API key and internet connection
