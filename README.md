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
   git clone https://github.com/jihedlatiri23/video-template
   cd video-template-generator
   npm install
   ```

### Complete Workflow

1. **Download your video and place it in the assets folder**
   ```bash
   # Download a video from any source (YouTube, your phone, etc.)
   # Place it in the assets folder
   # Example: Download a video from YouTube and save it as recipe-chicken-pasta.mp4
   # You can use any video you want, for example from: https://www.youtube.com/shorts/ZwBgS-Ej6j4
   cp your-video.mp4 ./assets/recipe-chicken-pasta.mp4
   ```

2. **Generate an intro video** (choose one of the commands below)
   ```bash
   # Recipe intro (recommended for recipe videos)
   ffmpeg -f lavfi -i "color=size=1080x1920:duration=3:rate=30:color=0xDAA520" \
   -vf "drawtext=text='Quick':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,0,1)',\
   drawtext=text='Recipe':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,1,2)',\
   drawtext=text='Start':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,2,3)'" \
   -c:v libx264 -preset ultrafast assets/intro_gradient_recipe.mp4

   # Tutorial intro (for tutorial videos)
   ffmpeg -f lavfi -i "color=size=1080x1920:duration=3:rate=30:color=0xDAA520" \
   -vf "drawtext=text='Quick':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,0,1)',\
   drawtext=text='Tutorial':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,1,2)',\
   drawtext=text='Start':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,2,3)'" \
   -c:v libx264 -preset ultrafast assets/intro_gradient_tutorial.mp4

   # Product intro (for product videos)
   ffmpeg -f lavfi -i "color=size=1080x1920:duration=3:rate=30:color=0xDAA520" \
   -vf "drawtext=text='Quick':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,0,1)',\
   drawtext=text='Product':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,1,2)',\
   drawtext=text='Start':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,2,3)'" \
   -c:v libx264 -preset ultrafast assets/intro_gradient_product.mp4
   ```

3. **Download background music and place it in the audio folder**
   ```bash
   # Download royalty-free lofi music from:
   # - YouTube Audio Library: https://www.youtube.com/audiolibrary
   # - Pixabay: https://pixabay.com/music/search/lofi/
   # - Free Music Archive: https://freemusicarchive.org/
   
   # Place the downloaded music file in the audio folder
   cp your-music.mp3 ./assets/audio/lofi-background.mp3
   ```

4. **Update the template.json file** to configure your video
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
     "background_music": "assets/audio/lofi-background.mp3"
   }
   ```

5. **Generate your video**
   ```bash
   npm run dev ./assets/recipe-chicken-pasta.mp4
   ```

## 📖 Usage

### File Structure Setup

The project uses the following folder structure:
```
assets/
├── .gitkeep                    # Keeps folder tracked by git
├── recipe-chicken-pasta.mp4    # Your video file (you add this)
├── intro_gradient_recipe.mp4   # Intro video (you generate this)
└── audio/
    ├── .gitkeep                # Keeps folder tracked by git
    └── lofi-background.mp3     # Background music (you add this)
```

### Required Files

You need to add these files to the assets folder:

1. **Your video file** - Place in `assets/` folder
   - Example: `assets/recipe-chicken-pasta.mp4`
   - Can be any video format (MP4, MOV, AVI, etc.)

2. **Intro video** - Generate using one of the commands in the Quick Start section
   - Example: `assets/intro_gradient_recipe.mp4`

3. **Background music** - Download and place in `assets/audio/` folder
   - Example: `assets/audio/lofi-background.mp3`
   - Download from: YouTube Audio Library, Pixabay, or Free Music Archive

### Basic Usage

```bash
# Generate video with your file in assets folder
npm run dev ./assets/recipe-chicken-pasta.mp4

# You can also use just the filename if it's in assets folder
npm run dev recipe-chicken-pasta.mp4
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
│   ├── .gitkeep              # Keeps folder tracked by git
│   ├── recipe-chicken-pasta.mp4    # Your video file (you add this)
│   ├── intro_gradient_recipe.mp4   # Intro video (you generate this)
│   └── audio/
│       ├── .gitkeep          # Keeps folder tracked by git
│       └── lofi-background.mp3     # Background music (you add this)
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

# Generate recipe intro with "Quick Recipe Start" text (Dark Yellow Background)
ffmpeg -f lavfi -i "color=size=1080x1920:duration=3:rate=30:color=0xDAA520" \
-vf "drawtext=text='Quick':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,0,1)',\
drawtext=text='Recipe':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,1,2)',\
drawtext=text='Start':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,2,3)'" \
-c:v libx264 -preset ultrafast assets/intro_gradient_recipe.mp4
```

**Customize Your Intro Video:**

You can easily change the **background color** and **text content** by modifying the command:

**Change Background Color:**
- `0xDAA520` - Dark Yellow (Goldenrod) - *Current*
- `0x7B68EE` - Purple (Original)
- `0x4A90E2` - Blue
- `0x50C878` - Green
- `0xFF6B6B` - Red
- `0x8B4513` - Brown
- `0xFF8C00` - Orange

**Change Text Content:**
Replace the text values in the command:
- `'Quick'` → Your first word
- `'Recipe'` → Your second word  
- `'Start'` → Your third word

**Example - Custom Tutorial Intro:**
```bash
ffmpeg -f lavfi -i "color=size=1080x1920:duration=3:rate=30:color=0x4A90E2" \
-vf "drawtext=text='Quick':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,0,1)',\
drawtext=text='Tutorial':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,1,2)',\
drawtext=text='Guide':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,2,3)'" \
-c:v libx264 -preset ultrafast assets/intro_gradient_tutorial.mp4
```

**Tutorial Intro** (for tutorial videos):
```bash
ffmpeg -f lavfi -i "color=size=1080x1920:duration=3:rate=30:color=0xDAA520" \
-vf "drawtext=text='Quick':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,0,1)',\
drawtext=text='Tutorial':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,1,2)',\
drawtext=text='Start':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,2,3)'" \
-c:v libx264 -preset ultrafast assets/intro_gradient_tutorial.mp4
```

**Product Intro** (for product videos):
```bash
ffmpeg -f lavfi -i "color=size=1080x1920:duration=3:rate=30:color=0xDAA520" \
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
ffmpeg -f lavfi -i "color=size=1080x1920:duration=3:rate=30:color=0xDAA520" \
-vf "drawtext=text='Your':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,0,1)',\
drawtext=text='Text':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,1,2)',\
drawtext=text='Here':fontsize=80:fontcolor=white:x=(w-text_w)/2:y=(h-text_h)/2:enable='between(t,2,3)'" \
-c:v libx264 -preset ultrafast assets/your-intro.mp4
```

### Getting Background Music

**Download royalty-free lofi music**:

```bash
# Create audio directory
mkdir -p assets/audio
```

**Direct Download Links** (Free for commercial use):

**🎵 Lofi Study/Chill Music:**
- [Lofi Study Calm](https://pixabay.com/music/beautiful-plays-lofi-study-calm-peaceful-chill-hop-112191/) - Perfect for recipe videos
- [Lofi Hip Hop](https://pixabay.com/music/beautiful-plays-lofi-hip-hop-112192/) - Relaxing background music
- [Chill Lofi](https://pixabay.com/music/beautiful-plays-chill-lofi-112193/) - Calm and peaceful

**🎵 Alternative Sources:**
- [YouTube Audio Library](https://www.youtube.com/audiolibrary) - Free music library
- [Pixabay Music](https://pixabay.com/music/search/lofi/) - Search for "lofi" music
- [Free Music Archive](https://freemusicarchive.org/) - Independent artists

**📥 How to Download:**
1. Click any link above
2. Click "Download" button
3. Save as `assets/audio/lofi-background.mp3`
4. Update `template.json` with the file path

**Example template.json:**
```json
{
  "background_music": "assets/audio/lofi-background.mp3"
}
```

**🎯 Recommended Music Settings:**
- **Duration**: 10-15 seconds (will loop automatically)
- **Format**: MP3 or WAV
- **Volume**: Normal levels (the tool will adjust automatically)
- **Style**: Lofi, chill, instrumental (no vocals for better mixing)

### Changing Background Color

Modify the color value in the FFmpeg command:
- `0xDAA520` - Dark Yellow (Goldenrod) - *Current Default*
- `0x7B68EE` - Purple (Original)
- `0x4A90E2` - Blue
- `0x50C878` - Green
- `0xFF6B6B` - Red
- `0x8B4513` - Brown
- `0xFF8C00` - Orange

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