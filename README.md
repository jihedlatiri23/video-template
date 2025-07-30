# Video Template Generator

A minimal but working video template generator for creating YouTube Shorts-style videos using TypeScript and FFmpeg.

## Features

- **Video Processing**: Trim, scale, and concatenate videos
- **Text Overlays**: Add timed text overlays at specific timestamps
- **Background Music**: Mix background music with video audio
- **Template System**: Configure video structure via JSON
- **YouTube Shorts Ready**: Optimized for 9:16 aspect ratio (1080x1920)

## Prerequisites

1. **Node.js** (v16 or higher)
2. **FFmpeg** installed on your system
   - macOS: `brew install ffmpeg`
   - Ubuntu: `sudo apt install ffmpeg`
   - Windows: Download from https://ffmpeg.org/

## Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

## Project Structure

```
├── src/
│   └── index.ts          # Main TypeScript entry point
├── assets/               # Template assets (intro.mp4, music.mp3)
├── output/               # Generated videos
├── template.json         # Template configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## Template Configuration

The `template.json` file defines the video structure:

```json
{
  "intro": "assets/intro.mp4",
  "main_clip_duration": 10,
  "text_overlays": [
    {
      "text": "Quick Recipe",
      "start": 0,
      "end": 3
    }
  ],
  "background_music": "assets/music.mp3"
}
```

## Usage

### Development Mode
```bash
npm run dev <path-to-your-video>
```

### Production Mode
```bash
npm run build
npm start <path-to-your-video>
```

### Example
```bash
npm run dev ./my-video.mp4
```

## How It Works

1. **Input**: User provides a video file
2. **Processing Steps**:
   - Trim and scale user video to match `main_clip_duration`
   - Concatenate with intro video
   - Add text overlays at specified timestamps
   - Mix with background music
3. **Output**: Final video saved to `output/final.mp4`

## API Usage

```typescript
import { VideoTemplateGenerator, TemplateConfig } from './src/index';

const config: TemplateConfig = {
  intro: "assets/intro.mp4",
  main_clip_duration: 10,
  text_overlays: [
    { text: "Hello World", start: 0, end: 3 }
  ],
  background_music: "assets/music.mp3"
};

const generator = new VideoTemplateGenerator(config);
await generator.generateVideoFromTemplate("./user-video.mp4");
```

## Customization

### Text Overlays
- Position: Centered horizontally, 50px from bottom
- Font size: 60px
- Color: White
- Timing: Controlled by `start` and `end` properties

### Video Settings
- Resolution: 1080x1920 (YouTube Shorts)
- Codec: H.264 video, AAC audio
- Preset: Fast encoding

### Audio Mixing
- Background music volume: 30% of original
- Video audio: 100% volume
- Duration: Matches video length

## Troubleshooting

### Common Issues

1. **FFmpeg not found**: Install FFmpeg and ensure it's in your PATH
2. **Missing assets**: Place required files in the `assets/` directory
3. **Permission errors**: Ensure write permissions for the `output/` directory

### Debug Mode
Add more verbose logging by modifying the console.log statements in `src/index.ts`.

## License

MIT License - feel free to use and modify as needed. 