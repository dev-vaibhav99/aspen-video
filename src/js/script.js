'use strict';

const videoFrame = document.getElementById('videoFrame');
const videoPlayer = document.getElementById('videoPlayer');
const linkContainer = document.getElementById('link-container');
const linkPlaceholder = document.getElementById('linkPlaceholder');
const errorContainer = document.getElementById('error-container');
const errorPlaceholder = document.getElementById('errorPlaceholder');
function searchVideo() {
	let query = document.getElementById('searchQuery').value;
	resetSearch();
	if (query) {
		const isValidURL = validatePath(query);
		if (!isValidURL) {
			errorContainer.style.display = 'block';
			errorPlaceholder.innerText = 'Invalid URL. Please enter a valid media path';
			return;
		}
		query = replaceQueryParams(query);
		const url = `https://webmd-a.akamaihd.net/delivery/${query}`;

		videoPlayer.src = url;
		videoFrame.style.display = 'block';
		linkContainer.style.display = 'block';
		linkPlaceholder.innerText = url;
	}
}

function replaceQueryParams(url) {
	const pattern = /,4500k,2500k,1000k,750k,400k,/;
	const newUrl = url.replace(pattern, '1000k');
	return newUrl;
}

function resetSearch() {
	document.getElementById('searchQuery').value = '';

	videoPlayer.src = '';
	videoFrame.style.display = 'none';
	linkContainer.style.display = 'none';
	linkPlaceholder.innerText = '';
	errorContainer.style.display = 'none';
	errorPlaceholder.innerText = '';
}

function validatePath(path) {
	return /^[a-zA-Z0-9\/,_-]+\.mp4$/.test(path);
}