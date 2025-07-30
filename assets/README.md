# Assets Directory

This directory contains the template assets for the video generator.

## Required Files

### intro.mp4
- A short intro video (2-5 seconds recommended)
- Should be in 9:16 aspect ratio (1080x1920) for YouTube Shorts
- MP4 format with H.264 codec

### music.mp3 (optional)
- Background music for the video
- MP3 format recommended
- Should be royalty-free or properly licensed

## Example Structure
```
assets/
├── intro.mp4          # Template intro video
├── music.mp3          # Background music
└── README.md          # This file
```

## Getting Sample Assets

For testing purposes, you can:

1. **Create a simple intro video** using any video editor
2. **Download royalty-free music** from sites like:
   - https://pixabay.com/music/
   - https://freemusicarchive.org/
   - https://incompetech.com/

## Notes

- The intro video will be concatenated with the user's video
- Background music will be mixed at 30% volume with the video audio
- All assets should be properly licensed for your use case 