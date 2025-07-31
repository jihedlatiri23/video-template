import ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';

interface TextOverlay {
  text: string;
  start: number;
  end: number;
}

interface TemplateConfig {
  intro: string;
  main_clip_duration: number;
  text_overlays: TextOverlay[];
  background_music?: string;
}

class VideoTemplateGenerator {
  private config: TemplateConfig;

  constructor(config: TemplateConfig) {
    this.config = config;
  }

  async generateVideoFromTemplate(userVideoPath: string): Promise<void> {
    console.log('Starting video generation...');
    
    // Ensure output directory exists
    const outputDir = 'output';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    try {
      // Step 1: Trim and scale user video to match main_clip_duration
      const trimmedVideoPath = await this.trimAndScaleVideo(userVideoPath);
      
      // Step 2: Concatenate intro + trimmed user clip
      const concatenatedPath = await this.concatenateVideos(trimmedVideoPath, "./assets/intro_gradient_recipe.mp4");
      
      // Step 3: Add text overlays
      const withTextPath = await this.addTextOverlays(concatenatedPath);
      
      // Step 4: Add background music
      const finalPath = await this.addBackgroundMusic(withTextPath);
      
      // Clean up temporary files
      this.cleanupTempFiles([trimmedVideoPath, concatenatedPath, withTextPath]);
      
      console.log('Video generation completed successfully!');
      console.log(`Output: ${finalPath}`);
      
    } catch (error) {
      console.error('Error generating video:', error);
      throw error;
    }
  }

  private async trimAndScaleVideo(userVideoPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const outputPath = 'output/temp_trimmed.mp4';
      
      ffmpeg(userVideoPath)
        .duration(this.config.main_clip_duration)
        .size('1080x1920') // YouTube Shorts aspect ratio (9:16)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions(['-preset', 'ultrafast'])
        .on('end', () => resolve(outputPath))
        .on('error', reject)
        .save(outputPath);
    });
  }

  private async concatenateVideos(trimmedVideoPath: string, introPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const outputPath = 'output/temp_concatenated.mp4';
      const concatFile = 'output/concat.txt';
      const introWithoutAudio = 'output/temp_intro_no_audio.mp4';
      
      // First, strip audio from intro video
      ffmpeg(introPath)
        .outputOptions(['-an']) // Remove audio
        .videoCodec('libx264')
        .outputOptions(['-preset', 'ultrafast'])
        .on('end', () => {
          // Create concat file with intro without audio
          const concatContent = `file '${path.resolve(introWithoutAudio)}'\nfile '${path.resolve(trimmedVideoPath)}'`;
          fs.writeFileSync(concatFile, concatContent);
          
          // Concatenate videos
          ffmpeg()
            .input(concatFile)
            .inputOptions(['-f', 'concat', '-safe', '0'])
            .videoCodec('libx264')
            .audioCodec('aac')
            .outputOptions(['-preset', 'ultrafast'])
            .on('end', () => {
              // Clean up temporary files
              fs.unlinkSync(concatFile);
              fs.unlinkSync(introWithoutAudio);
              resolve(outputPath);
            })
            .on('error', (err) => {
              // Clean up on error
              if (fs.existsSync(concatFile)) fs.unlinkSync(concatFile);
              if (fs.existsSync(introWithoutAudio)) fs.unlinkSync(introWithoutAudio);
              reject(err);
            })
            .save(outputPath);
        })
        .on('error', reject)
        .save(introWithoutAudio);
    });
  }

  private async addTextOverlays(videoPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const outputPath = 'output/temp_with_text.mp4';
      
      let filterComplex = '';
      
      // Get intro duration to offset text overlays
      const introDuration = 3; // intro_gradient.mp4 is 3 seconds
      

      
      // Add main video text overlays
      this.config.text_overlays.forEach((overlay, index) => {
        // Escape special characters in text
        const escapedText = overlay.text.replace(/'/g, "\\'").replace(/:/g, "\\:");
        // Position text higher up (y=100 instead of y=h-text_h-50)
        // Offset timing by intro duration so text appears during main video
        const adjustedStart = overlay.start + introDuration;
        const adjustedEnd = overlay.end + introDuration;
        const textFilter = `drawtext=text='${escapedText}':fontsize=60:fontcolor=white:x=(w-text_w)/2:y=100:enable='between(t,${adjustedStart},${adjustedEnd})'`;
        
        if (filterComplex === '') {
          filterComplex = textFilter;
        } else {
          filterComplex += `,${textFilter}`;
        }
      });
      
      console.log('Main video text overlays timing (adjusted for intro):');
      this.config.text_overlays.forEach((overlay, index) => {
        const adjustedStart = overlay.start + introDuration;
        const adjustedEnd = overlay.end + introDuration;
        console.log(`  ${index + 1}. "${overlay.text}" (${adjustedStart}s - ${adjustedEnd}s)`);
      });
      
      ffmpeg(videoPath)
        .videoFilters(filterComplex)
        .videoCodec('libx264')
        .audioCodec('aac')
        .outputOptions(['-preset', 'ultrafast'])
        .on('end', () => resolve(outputPath))
        .on('error', reject)
        .save(outputPath);
    });
  }

  private async addBackgroundMusic(videoPath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const outputPath = 'output/final.mp4';
      
      if (!this.config.background_music || !fs.existsSync(this.config.background_music)) {
        // If no background music, just copy the video
        ffmpeg(videoPath)
          .output(outputPath)
          .on('end', () => resolve(outputPath))
          .on('error', reject)
          .run();
        return;
      }
      
      // Simple approach: just add background music without complex mixing
      ffmpeg()
        .input(videoPath)
        .input(this.config.background_music)
        .outputOptions([
          '-map', '0:v',
          '-map', '0:a?',
          '-map', '1:a',
          '-shortest'
        ])
        .videoCodec('copy')
        .audioCodec('aac')
        .on('end', () => resolve(outputPath))
        .on('error', reject)
        .save(outputPath);
    });
  }

  private cleanupTempFiles(filePaths: string[]): void {
    filePaths.forEach(filePath => {
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (error) {
          console.warn(`Could not delete temporary file ${filePath}:`, error);
        }
      }
    });
  }
}

// Main function to load config and generate video
async function main(): Promise<void> {
  try {
    // Load template configuration
    const configPath = 'template.json';
    if (!fs.existsSync(configPath)) {
      throw new Error(`Template configuration file not found: ${configPath}`);
    }
    
    const configData = fs.readFileSync(configPath, 'utf8');
    const config: TemplateConfig = JSON.parse(configData);
    

    
    // Check if user video path is provided
    let userVideoPath = process.argv[2];
    if (!userVideoPath) {
      console.error('Usage: npm run dev <path-to-user-video>');
      console.error('Example: npm run dev ./assets/recipe-chicken-pasta.mp4');
      process.exit(1);
    }
    
    // If the path doesn't start with ./ or /, assume it's in the assets folder
    if (!userVideoPath.startsWith('./') && !userVideoPath.startsWith('/')) {
      userVideoPath = `./assets/${userVideoPath}`;
    }
    
    if (!fs.existsSync(userVideoPath)) {
      throw new Error(`User video file not found: ${userVideoPath}`);
    }
    
    // Create generator and generate video
    const generator = new VideoTemplateGenerator(config);
    await generator.generateVideoFromTemplate(userVideoPath);
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

// Export for use as module
export { VideoTemplateGenerator, TemplateConfig, TextOverlay };

// Run if this is the main module
if (require.main === module) {
  main();
} 