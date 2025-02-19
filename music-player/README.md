# Music Player

This project is a simple music player that allows users to select a singer's folder and play specific songs. Each singer has their own folder containing three songs.

## Project Structure

```
music-player
├── singer1
│   ├── song1.mp3
│   ├── song2.mp3
│   └── song3.mp3
├── singer2
│   ├── song1.mp3
│   ├── song2.mp3
│   └── song3.mp3
├── singer3
│   ├── song1.mp3
│   ├── song2.mp3
│   └── song3.mp3
├── singer4
│   ├── song1.mp3
│   ├── song2.mp3
│   └── song3.mp3
├── singer5
│   ├── song1.mp3
│   ├── song2.mp3
│   └── song3.mp3
├── singer6
│   ├── song1.mp3
│   ├── song2.mp3
│   └── song3.mp3
├── src
│   ├── app.ts
│   └── player.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd music-player
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage Guidelines

- Run the application:
  ```
  npm start
  ```
- Follow the prompts to select a singer's folder and choose a song to play.

## Features

- Play songs from different singers.
- Simple user interface for selecting songs.
- Ability to stop the currently playing song.

## License

This project is licensed under the MIT License.