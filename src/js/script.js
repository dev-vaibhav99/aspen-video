'use strict';
function searchVideo() {
    let query = document.getElementById('searchQuery').value;
    if (query) {
        query = replaceQueryParams(query);
        const url = `https://webmd-a.akamaihd.net/delivery/${query}`;
        const videoFrame = document.getElementById('videoFrame');
        const videoPlayer = document.getElementById('videoPlayer');
        const linkContainer = document.getElementById('link-container');
        const linkPlaceholder = document.getElementById('linkPlaceholder');
        videoPlayer.src = url;
        videoFrame.style.display = 'block';
        linkContainer.style.display = 'block';
        linkPlaceholder.innerText = url;
    }
}

function replaceQueryParams(url) {
    // Regular expression to match the pattern ',4500k,2500k,1000k,750k,400k,'
    const pattern = /,4500k,2500k,1000k,750k,400k,/;

    // Replace the matched pattern with ',1000k,'
    const newUrl = url.replace(pattern, '1000k');

    return newUrl;
}

function resetSearch() {
    document.getElementById('searchQuery').value = '';
    const videoFrame = document.getElementById('videoFrame');
    const videoPlayer = document.getElementById('videoPlayer');
    const linkContainer = document.getElementById('link-container');
    const linkPlaceholder = document.getElementById('linkPlaceholder');
    videoPlayer.src = '';
    videoFrame.style.display = 'none';
    linkContainer.style.display = 'none';
    linkPlaceholder.innerText = '';
}