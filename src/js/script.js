'use strict';
function searchVideo() {
    const query = document.getElementById('searchQuery').value;
    if (query) {
        const url = `https://webmd-a.akamaihd.net/delivery/${encodeURIComponent(query)}`;
        const videoFrame = document.getElementById('videoFrame');
        const videoPlayer = document.getElementById('videoPlayer');
        videoPlayer.src = url;
        videoFrame.style.display = 'block';
    }
}

function resetSearch() {
    document.getElementById('searchQuery').value = '';
    const videoFrame = document.getElementById('videoFrame');
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = '';
    videoFrame.style.display = 'none';
}