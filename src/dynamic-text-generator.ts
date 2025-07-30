import { DynamicTextGenerator } from './dynamic-text';

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('🎬 Dynamic Text Generator');
    console.log('');
    console.log('Usage:');
    console.log('  npm run dynamic-text <video-path> <duration>');
    console.log('');
    console.log('Examples:');
    console.log('  npm run dynamic-text recipe-video.mp4 10');
    console.log('  npm run dynamic-text tutorial-guide.mp4 8');
    console.log('  npm run dynamic-text product-demo.mp4 12');
    console.log('');
    console.log('Video types detected by filename:');
    console.log('  - recipe/cook/food → Recipe texts');
    console.log('  - tutorial/how/guide → Tutorial texts');
    console.log('  - product/review/demo → Product texts');
    console.log('  - life/tip/hack → Lifestyle texts');
    console.log('  - others → Custom texts');
    process.exit(1);
  }

  const [videoPath, durationStr] = args;
  const duration = parseInt(durationStr);

  if (isNaN(duration) || duration <= 0) {
    console.error('❌ Invalid duration. Please provide a positive number.');
    process.exit(1);
  }

  try {
    console.log(`🎬 Generating dynamic text for: ${videoPath}`);
    console.log(`⏱️  Duration: ${duration} seconds`);
    console.log('');

    // Update template with dynamic text
    DynamicTextGenerator.updateTemplateWithDynamicText(videoPath, duration);

    console.log('');
    console.log('✅ Template updated successfully!');
    console.log('🚀 Now run: npm run dev <video-path>');
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
} 