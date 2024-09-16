'use scrict';
const query = document.getElementById('searchQuery');
const videoFrame = document.getElementById('videoFrame');
const videoPlayer = document.getElementById('videoPlayer');
const linkContainer = document.getElementById('link-container');
const linkPlaceholder = document.getElementById('linkPlaceholder');
const errorContainer = document.getElementById('error-container');
const errorPlaceholder = document.getElementById('errorPlaceholder');
const notifications = document.querySelector(".notifications");
const copyBtn = document.getElementById("copyBtn");
const videoTitle = document.getElementById("videoTitle");

window.addEventListener("load", () => {
    createToast();
});
query.addEventListener('keyup', () => {
    query.setAttribute('value', query.value);
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(linkPlaceholder.innerText);
});

const searchVideo = () => {
    let aspenID = query.value;
    const apiUrl = `https://searchsvc-spiider-api.k8s.staging.webmd.com/search/2/api/video_api?id=${aspenID}`;

    fetch(apiUrl)
        .then(response => response.text())
        .then(xmlData => {
            resetMedia();
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlData, 'text/xml');
            let wbmdLocUrlXML = xmlDoc.querySelector('wbmd_c_loc_url');
            let title = xmlDoc.querySelector('title');

            if (!wbmdLocUrlXML) {
                errorContainer.style.display = 'block';
                errorPlaceholder.innerText = 'Aspen ID not found!';
                return;
            }

            let wbmdLocUrl = xmlDoc.querySelector('wbmd_c_loc_url').textContent;

            wbmdLocUrl = replaceQueryParams(wbmdLocUrl);
            const isValid = validatePath(wbmdLocUrl);
            if (!isValid) {
                errorContainer.style.display = 'block';
                errorPlaceholder.innerText = 'The media path does not seem to be valid!';
                return;
            }
            const url = `https://webmd-a.akamaihd.net/delivery/${wbmdLocUrl}`;
            videoTitle.textContent = title && title.textContent;
            videoPlayer.src = url;
            videoFrame.style.display = 'block';
            linkContainer.style.display = 'flex';
            linkPlaceholder.textContent = url;
            linkPlaceholder.setAttribute('href', url);

        })
        .catch(error => console.error('Error:', error));
}

const replaceQueryParams = (url) => {
    const pattern = /,4500k,2500k,1000k,750k,400k,/;
    const newUrl = url.replace(pattern, '1000k');
    return newUrl;
}

const resetSearch = () => {
    query.setAttribute('value', "");
    query.value = '';
    resetMedia();
}

const resetMedia = () => {
    videoPlayer.src = '';
    videoFrame.style.display = 'none';
    linkContainer.style.display = 'none';
    linkPlaceholder.innerText = '';
    errorContainer.style.display = 'none';
    errorPlaceholder.innerText = '';
}

const validatePath = (path) => {
    return /^[a-zA-Z0-9\/,_-]+\.mp4$/.test(path);
}

// TODO: Toast notification to connect the VPN when the page loads.
const toastDetails = {
    timer: 5000,
    info: {
        icon: 'fa-circle-info',
        text: 'Note: Kindly connect to the VPN for it to work',
    }
}
const removeToast = (toast) => {
    toast.classList.add("hide");
    if (toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 500);
}
const createToast = () => {
    const { icon, text } = toastDetails['info'];
    const toast = document.createElement("li");
    toast.className = `toast ${'info'}`;

    toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${icon}"></i>
                         <span>${text}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    notifications.appendChild(toast);
    toast.timeoutId = setTimeout(() => removeToast(toast), toastDetails.timer);
}

