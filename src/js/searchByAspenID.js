'use scrict';
const query = document.getElementById('searchQuery');
const videoFrame = document.getElementById('videoFrame');
const videoPlayer = document.getElementById('videoPlayer');
const linkContainer = document.getElementById('link-container');
const linkPlaceholder = document.getElementById('linkPlaceholder');
const errorContainer = document.getElementById('error-container');
const errorPlaceholder = document.getElementById('errorPlaceholder');

const searchVideo = () => {
    let aspenID = query.value;
    const apiUrl = `https://searchsvc-spiider-api.k8s.staging.webmd.com/search/2/api/video_api?id=${aspenID}`;

    fetch(apiUrl)
        .then(response => response.text())
        .then(xmlData => {
            resetSearch();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
            let wbmdLocUrl = xmlDoc.querySelector('wbmd_c_loc_url').textContent;

            wbmdLocUrl = replaceQueryParams(wbmdLocUrl);
            const isValid = validatePath(wbmdLocUrl);
            if (!isValid) {
                errorContainer.style.display = 'block';
                errorPlaceholder.innerText = 'The media path does not seem to be valid!';
                return;
            }
            const url = `https://webmd-a.akamaihd.net/delivery/${wbmdLocUrl}`;
            videoPlayer.src = url;
            videoFrame.style.display = 'block';
            linkContainer.style.display = 'block';
            linkPlaceholder.innerText = url;
        })
        .catch(error => console.error('Error:', error));
}

function replaceQueryParams(url) {
    const pattern = /,4500k,2500k,1000k,750k,400k,/;
    const newUrl = url.replace(pattern, '1000k');
    return newUrl;
}

function resetSearch() {
    query.value = '';
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