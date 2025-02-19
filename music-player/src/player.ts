class MusicPlayer {
    private audio: HTMLAudioElement | null = null;

    playSong(folder: string, song: string): void {
        this.stopSong(); // Stop any currently playing song
        this.audio = new Audio(`../${folder}/${song}`);
        this.audio.play();
    }

    stopSong(): void {
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0; // Reset the song to the beginning
            this.audio = null;
        }
    }
}

export default MusicPlayer;