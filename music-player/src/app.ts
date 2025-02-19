// This file is the entry point of the application. It initializes the music player and handles user input to select a singer's folder.

import { MusicPlayer } from './player';

const musicPlayer = new MusicPlayer();

function selectSingerFolder(singer: string) {
    const folderPath = `./${singer}`;
    // Logic to list songs in the selected folder and play a song
    console.log(`Selected folder: ${folderPath}`);
    // Example: musicPlayer.playSong(folderPath, 'song1.mp3');
}

// Example usage
selectSingerFolder('singer1'); // Replace with user input to select different singers