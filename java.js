let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

let music_list = {
    singer1: [
        { name: "Chasing Paradise", artist: "OneRepublic", music: "music-player/OneRepublic/Chasing Paradise.mp3", img: "image/music.png" },
        { name: "I Ain't Worried", artist: "One republic", music: "music-player/OneRepublic/I Ain't Worried.mp3", img: "image/music.png" },
        
        // Add more songs for singer1
        ],
        singer2: [
        { name: "Idhar Chala Main", music: "music-player/Bollywood/Idhar Chala Main.mp3", img: "image/music.png"},
        { name: "Lamborghini", music: "music-player/Bollywood/Lamborghini.mp3", img: "image/music.png"},
        { name: "Naina Da Kya Kasoor", music: "music-player/Bollywood/Naina Da Kya Kasoor.mp3", img: "image/music.png"},
        { name: "Palki Mein Hoke Sawaar", music: "music-player/Bollywood/Palki Mein Hoke Sawaar.mp3", img: "image/music.png"},
        { name: "Ranjha", music: "music-player/Bollywood/Ranjha.mp3", img: "image/music.png"},
        { name: "Sanam Teri Kasam", music: "music-player/Bollywood/Sanam Teri Kasam.mp3", img: "image/music.png"},
        // Add more songs for singer2
        ],
        singer3: [
            { name: "7 Years", music: "music-player/pop/7 Years.mp3", img: "image/music.png"},
            { name: "Aa Tenu Moj Karawa", music: "music-player/pop/Aa Tenu Moj Karawa.mp3", img: "image/music.png"},
            { name: "We Dont", music: "music-player/pop/We Dont.mp3", img: "image/music.png"},
        ],
        singer4: [
            { name: "kehte hai", music: "music-player/hindi/kehte hai.mp3", img: "image/music.png"},
            { name: "tere naal", music: "music-player/hindi/tere naal.mp3", img: "image/music.png"},
            
            
        ],
        singer5: [
            { name: "demon slayer", music: "music-player/anime/demon slayer.mp3", img: "image/music.png"},
            { name: "nanda", music: "music-player/anime/nanda.mp3", img: "image/music.png"},
            { name: "suzume", music: "music-player/anime/suzume.mp3", img: "image/music.png"},
        ],
        singer6: [
            { name: "aa ja", music: "music-player/punjabi/aa ja.mp3", img: "image/music.png"},
            { name: "le ja", music: "music-player/punjabi/le ja.mp3", img: "image/music.png"},
            { name: "yarri", music: "music-player/punjabi/yarri.mp3", img: "image/music.png"},
    ],
    // Add more singers and their songs
};

let currentSinger = 'singer1';

document.addEventListener('DOMContentLoaded', () => {
    generatePlaylist();
});

function selectSinger(singer) {
    currentSinger = singer;
    generatePlaylist();
}

function generatePlaylist() {
    const playlist = document.getElementById('playlist');
    playlist.innerHTML = '';
    music_list[currentSinger].forEach((track, index) => {
        const li = document.createElement('li');
        li.textContent = `${track.name} - ${track.artist}`;
        li.addEventListener('click', () => {
            loadTrack(index);
            playTrack();
        });
        playlist.appendChild(li);
    });
}

loadTrack(track_index);

function loadTrack(track_index) {
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[currentSinger][track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[currentSinger][track_index].img + ")";
    track_name.textContent = music_list[currentSinger][track_index].name;
    track_artist.textContent = music_list[currentSinger][track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list[currentSinger].length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color() {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}

function reset() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom() {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (track_index < music_list[currentSinger].length - 1 && isRandom === false) {
        track_index += 1;
    } else if (track_index < music_list[currentSinger].length - 1 && isRandom === true) {
        let random_index = Number.parseInt(Math.random() * music_list[currentSinger].length);
        track_index = random_index;
    } else {
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0) {
        track_index -= 1;
    } else {
        track_index = music_list[currentSinger].length - 1;
    }
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function setUpdate() {
    let seekPosition = 0;
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}