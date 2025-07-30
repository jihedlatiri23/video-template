import { DynamicTextGenerator } from './dynamic-text';

async function testDynamicText() {
  console.log('🎬 Testing Dynamic Text Generation...\n');

  // Test different video types
  const testCases = [
    { path: 'recipe-chicken-pasta.mp4', duration: 10 },
    { path: 'tutorial-how-to-code.mp4', duration: 8 },
    { path: 'product-review-phone.mp4', duration: 12 },
    { path: 'lifestyle-tip-organization.mp4', duration: 6 },
    { path: 'random-video.mp4', duration: 15 }
  ];

  testCases.forEach(({ path, duration }) => {
    console.log(`📹 Video: ${path} (${duration}s)`);
    const overlays = DynamicTextGenerator.generateFromVideoPath(path, duration);
    
    overlays.forEach((overlay, index) => {
      console.log(`  ${index + 1}. "${overlay.text}" (${overlay.start}s - ${overlay.end}s)`);
    });
    console.log('');
  });

  // Test custom text generation
  console.log('🎯 Testing Custom Text Generation:');
  const customConfig = {
    videoType: 'custom' as const,
    duration: 10,
    customTexts: ['Welcome!', 'This is amazing', 'Check this out', 'Thanks for watching!']
  };

  const customOverlays = DynamicTextGenerator.generateTextOverlays(customConfig);
  customOverlays.forEach((overlay, index) => {
    console.log(`  ${index + 1}. "${overlay.text}" (${overlay.start}s - ${overlay.end}s)`);
  });

  console.log('\n✅ Dynamic text generation test completed!');
  console.log('\nTo use dynamic text:');
  console.log('  npm run dynamic-text <video-path> <duration>');
}

if (require.main === module) {
  testDynamicText();
} 