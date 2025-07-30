# 🎬 Video Template Generator

**Transform any video into stunning social media content with automatic intro, text overlays, and background music!**

A powerful video processing tool that automatically converts your videos into vertical format (9:16 ratio) perfect for YouTube Shorts, TikTok, Instagram Reels, and other social media platforms.

## ✨ Features

### 🎯 **Automatic Video Processing**
- **Vertical Format**: Automatically resizes videos to 9:16 ratio (1080x1920)
- **Intro Videos**: Add custom intro videos with embedded text
- **Text Overlays**: Dynamic text overlays with perfect timing
- **Background Music**: Add lofi study calm background music
- **Silent Intro**: Intro videos are automatically muted for clean audio

### 🎨 **Beautiful Visuals**
- **Gradient Backgrounds**: Beautiful purple gradient intro backgrounds
- **Professional Text**: Clean, centered text overlays
- **High Quality**: 1080p output with optimized encoding

### 🎵 **Audio Features**
- **Lofi Background Music**: Calm, study-friendly background music
- **Audio Mixing**: Professional audio mixing with main video
- **Silent Intros**: Clean intro without audio interference

## 🚀 Quick Start

### Prerequisites

1. **Node.js** (v16 or higher)
   ```bash
   node --version
   ```

2. **FFmpeg** (required for video processing)
   ```bash
   # macOS
   brew install ffmpeg
   
   # Ubuntu/Debian
   sudo apt install ffmpeg
   
   # Windows: Download from https://ffmpeg.org/
   ```

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd video-template-generator
   npm install
   ```

2. **Download Node modules (required)**
   ```bash
   # Install all required dependencies
   npm install
   ```

3. **Add your video file**
   ```bash
   # Place your video in the project root
   # Example: Download a video from YouTube and save it as recipe-chicken-pasta.mp4
   # You can use any video you want, for example from: https://www.youtube.com/shorts/ZwBgS-Ej6j4
   cp your-video.mp4 ./recipe-chicken-pasta.mp4
   ```

4. **Generate video**
   ```bash
   npm run dev recipe-chicken-pasta.mp4
   ```

## 📖 Usage

### Getting Your Media Files

**Note**: Large media files are not included in the repository to keep it lightweight. You'll need to add your own files:

1. **Download a video** from any source (YouTube, your phone, etc.)
2. **Save it** in the project root directory
3. **Rename it** to `recipe-chicken-pasta.mp4` or use your own filename
4. **Example video**: You can use any video, for example from [this YouTube Shorts video](https://www.youtube.com/shorts/ZwBgS-Ej6j4)

**Required Media Files** (you need to add these):
- `assets/audio/your-music.mp3` - Background music
- `assets/intro_gradient_recipe.mp4` - Intro video (generate using command below)

**How to get the required files**:
- **Background music**: Download royalty-free lofi music from [YouTube Audio Library](https://www.youtube.com/audiolibrary) or [Pixabay](https://pixabay.com/music/)
- **Intro video**: Generate using the command below or create your own

### Basic Usage

```bash
# Generate video with default settings
npm run dev your-video.mp4

# Generate video with custom duration
npm run dev your-video.mp4 --duration 15
```

### Dynamic Text Generation

```bash
# Generate dynamic text based on video filename
npm run dynamic-text recipe-video.mp4 10

# Available video types (detected by filename):
# - recipe/cook/food → Recipe texts
# - tutorial/how/guide → Tutorial texts  
# - product/review/demo → Product texts
# - life/tip/hack → Lifestyle texts
```

### Configuration

Edit `template.json` to customize your video:

```json
{
  "intro": "assets/intro_gradient_recipe.mp4",
  "main_clip_duration": 10,
  "text_overlays": [
    {
      "text": "Quick Recipe",
      "start": 0,
      "end": 2
    },
    {
      "text": "Step 1: Prep ingredients", 
      "start": 2,
      "end": 4
    }
  ],
  "background_music": "assets/audio/lofi-study-calm-peaceful-chill-hop-112191.mp3"
}
```

## 🎬 Video Types & Templates

### Recipe Videos
- **Intro Text**: "Quick Recipe Start"
- **Background**: Purple gradient
- **Text Overlays**: Step-by-step cooking instructions
- **Music**: Lofi study calm

### Tutorial Videos  
- **Intro Text**: "Quick Tutorial Start"
- **Background**: Purple gradient
- **Text Overlays**: How-to instructions
- **Music**: Lofi study calm

### Product Videos
- **Intro Text**: "Quick Product Start" 
- **Background**: Purple gradient
- **Text Overlays**: Product features and benefits
- **Music**: Lofi study calm

### Lifestyle Videos
- **Intro Text**: "Quick Life Start"
- **Background**: Purple gradient  
- **Text Overlays**: Life tips and hacks
- **Music**: Lofi study calm

## �� Project Structure

```
video-template-generator/
├── src/
│   ├── index.ts              # Main video processing logic
│   ├── dynamic-text.ts       # Dynamic text generation
│   ├── dynamic-text-generator.ts  # CLI for dynamic text
│   └── music-selector.ts     # Music selection utilities
├── assets/
│   ├── intro_gradient_recipe.mp4  # Custom intro video
│   └── audio/
│       └── lofi-study-calm-peaceful-chill-hop-112191.mp3
├── output/                   # Generated videos
├── template.json             # Video configuration
└── package.json
```

## ⚙️ Configuration Options

### Template Configuration (`template.json`)

| Option | Type | Description |
|--------|------|-------------|
| `intro` | string | Path to intro video file |
| `main_clip_duration` | number | Duration of main video in seconds |
| `text_overlays` | array | Array of text overlay objects |
| `background_music` | string | Path to background music file |

### Text Overlay Object

```json
{
  "text": "Your text here",
  "start": 0,    // Start time in seconds
  "end": 2       // End time in seconds
}
```

## 🎯 Output Specifications

- **Resolution**: 1080x1920 (9:16 ratio)
- **Format**: MP4 (H.264)
- **Frame Rate**: 30 fps
- **Audio**: AAC codec
- **Quality**: High quality with optimized file size

## 🔧 Development

### Available Scripts

```bash
# Development mode
npm run dev <video-path>

# Build for production
npm run build

# Start production server
npm start <video-path>

# Dynamic text generation
npm run dynamic-text <video-path> <duration>
```

### Adding Custom Intros

1. Create your intro video (1080x1920, 3 seconds)
2. Place it in `assets/` directory
3. Update `template.json` intro path
4. Update intro duration in `src/index.ts` if needed

### Adding Custom Music

1. Add your music file to `assets/audio/`
2. Update `template.json` background_music path
3. Ensure music is royalty-free for commercial use

## 🎨 Customization

### Generating Intro Videos

**Quick Recipe Intro** (recommended for recipe videos):
```bash
# Create assets directory
mkdir -p assets

# Generate recipe intro with "Quick Recipe Start" text
ffmpeg -f lavfi -i "color=size=1080x1920:duration=3:rate=30:color=0x7B68EE" \
-vf "drawtext=text='Quick':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,0,1)',\
drawtext=text='Recipe':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,1,2)',\
drawtext=text='Start':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,2,3)'" \
-c:v libx264 -preset ultrafast assets/intro_gradient_recipe.mp4
```

**Tutorial Intro** (for tutorial videos):
```bash
ffmpeg -f lavfi -i "color=size=1080x1920:duration=3:rate=30:color=0x7B68EE" \
-vf "drawtext=text='Quick':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,0,1)',\
drawtext=text='Tutorial':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,1,2)',\
drawtext=text='Start':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,2,3)'" \
-c:v libx264 -preset ultrafast assets/intro_gradient_tutorial.mp4
```

**Product Intro** (for product videos):
```bash
ffmpeg -f lavfi -i "color=size=1080x1920:duration=3:rate=30:color=0x7B68EE" \
-vf "drawtext=text='Quick':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,0,1)',\
drawtext=text='Product':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,1,2)',\
drawtext=text='Start':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,2,3)'" \
-c:v libx264 -preset ultrafast assets/intro_gradient_product.mp4
```

### Customizing Intro Text

The intro video contains embedded text that changes each second:
- **0-1s**: "Quick"
- **1-2s**: "Recipe" (or your custom word)
- **2-3s**: "Start"

To create a new intro with different text:

```bash
ffmpeg -f lavfi -i "color=size=1080x1920:duration=3:rate=30:color=0x7B68EE" \
-vf "drawtext=text='Your':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,0,1)',\
drawtext=text='Text':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,1,2)',\
drawtext=text='Here':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,2,3)'" \
-c:v libx264 -preset ultrafast assets/your-intro.mp4
```

### Getting Background Music

**Download royalty-free music**:
```bash
# Create audio directory
mkdir -p assets/audio

# Download from these sources:
# 1. YouTube Audio Library: https://www.youtube.com/audiolibrary
# 2. Pixabay Music: https://pixabay.com/music/
# 3. Free Music Archive: https://freemusicarchive.org/

# Example: Download a lofi track and save as:
# assets/audio/lofi-study-calm.mp3
```

### Changing Background Color

Modify the color value in the FFmpeg command:
- `0x7B68EE` - Purple (current)
- `0x4A90E2` - Blue
- `0x50C878` - Green
- `0xFF6B6B` - Red

## 🚀 Production Deployment

### Requirements
- Node.js 16+
- FFmpeg
- 2GB+ RAM
- 10GB+ storage for video processing

### Environment Variables
```bash
# Optional: Set custom paths
INTRO_PATH=assets/custom-intro.mp4
MUSIC_PATH=assets/audio/custom-music.mp3
OUTPUT_DIR=custom-output/
```

## 📝 License

MIT License - Feel free to use for personal and commercial projects!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

**FFmpeg not found**
```bash
# Install FFmpeg
brew install ffmpeg  # macOS
sudo apt install ffmpeg  # Ubuntu
```

**Video processing fails**
- Ensure input video is valid MP4/MOV/AVI
- Check available disk space
- Verify FFmpeg installation

**Text overlays not appearing**
- Check timing values in template.json
- Ensure text doesn't contain special characters
- Verify intro duration is correct

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review the configuration options
- Ensure all prerequisites are installed

---

**Made with ❤️ for content creators who want to make amazing social media videos!** 