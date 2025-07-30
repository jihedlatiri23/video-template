import { VideoTemplateGenerator, TemplateConfig } from './index';

async function runExample() {
  // Example configuration
  const config: TemplateConfig = {
    intro: "assets/intro.mp4",
    main_clip_duration: 8,
    text_overlays: [
      {
        text: "Welcome!",
        start: 0,
        end: 2
      },
      {
        text: "Let's get started",
        start: 2,
        end: 4
      },
      {
        text: "Almost done...",
        start: 4,
        end: 6
      },
      {
        text: "Thanks for watching!",
        start: 6,
        end: 8
      }
    ],
    background_music: "assets/music.mp3"
  };

  try {
    console.log('Creating video template generator...');
    const generator = new VideoTemplateGenerator(config);
    
    // Replace with your actual video file path
    const userVideoPath = './sample-video.mp4';
    
    console.log(`Generating video from template using: ${userVideoPath}`);
    await generator.generateVideoFromTemplate(userVideoPath);
    
    console.log('Example completed successfully!');
  } catch (error) {
    console.error('Example failed:', error);
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  runExample();
} 