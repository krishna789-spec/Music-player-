let player;
let currentVideoId = '';

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '0',
        width: '0',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}
// Add your JavaScript code here

function redirectToYouTube() {
    var query = document.getElementById('search-input').value;
    var url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    window.location.href = url;
}

function onPlayerReady(event) {
    // Player is ready
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        // Video ended, play next video or handle accordingly
    }
}

function searchMusic() {
    const query = document.getElementById('search-input').value;
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=YOUR_API_KEY`)
        .then(response => response.json())
        .then(data => {
            const musicList = document.getElementById('music-list');
            musicList.innerHTML = '';
            data.items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item.snippet.title;
                li.addEventListener('click', () => playMusic(item.id.videoId));
                musicList.appendChild(li);
            });
        })
        .catch(error => console.error('Error fetching music:', error));
}

function playMusic(videoId) {
    if (currentVideoId !== videoId) {
        currentVideoId = videoId;
        player.loadVideoById(videoId);
    } else {
        player.playVideo();
    }
}