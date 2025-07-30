import * as ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';

async function testSetup() {
  console.log('Testing Video Template Generator Setup...\n');

  // Test 1: Check if FFmpeg is available
  console.log('1. Testing FFmpeg installation...');
  try {
    // Try to get FFmpeg version to test if it's available
    const { execSync } = require('child_process');
    const ffmpegVersion = execSync('ffmpeg -version', { encoding: 'utf8' });
    console.log('✓ FFmpeg is available');
    console.log(`  Version: ${ffmpegVersion.split('\n')[0]}`);
  } catch (error) {
    console.error('✗ FFmpeg not found. Please install FFmpeg first.');
    console.error('  macOS: brew install ffmpeg');
    console.error('  Ubuntu: sudo apt install ffmpeg');
    return;
  }

  // Test 2: Check if required directories exist
  console.log('\n2. Testing directory structure...');
  const requiredDirs = ['assets', 'output'];
  for (const dir of requiredDirs) {
    if (fs.existsSync(dir)) {
      console.log(`✓ Directory exists: ${dir}/`);
    } else {
      console.log(`⚠ Directory missing: ${dir}/ (will be created when needed)`);
    }
  }

  // Test 3: Check if template.json exists
  console.log('\n3. Testing template configuration...');
  if (fs.existsSync('template.json')) {
    console.log('✓ template.json found');
    try {
      const config = JSON.parse(fs.readFileSync('template.json', 'utf8'));
      console.log(`✓ Template config is valid JSON`);
      console.log(`  - Intro: ${config.intro}`);
      console.log(`  - Main clip duration: ${config.main_clip_duration}s`);
      console.log(`  - Text overlays: ${config.text_overlays.length}`);
      if (config.background_music) {
        console.log(`  - Background music: ${config.background_music}`);
      }
    } catch (error) {
      console.error('✗ Invalid JSON in template.json');
    }
  } else {
    console.error('✗ template.json not found');
  }

  // Test 4: Check if assets exist
  console.log('\n4. Testing assets...');
  const config = JSON.parse(fs.readFileSync('template.json', 'utf8'));
  
  if (fs.existsSync(config.intro)) {
    console.log(`✓ Intro video: ${config.intro}`);
  } else {
    console.log(`⚠ Missing intro video: ${config.intro}`);
  }

  if (config.background_music && fs.existsSync(config.background_music)) {
    console.log(`✓ Background music: ${config.background_music}`);
  } else if (config.background_music) {
    console.log(`⚠ Missing background music: ${config.background_music}`);
  }

  console.log('\n5. Setup test completed!');
  console.log('\nTo test with a real video:');
  console.log('  npm run dev <path-to-your-video>');
  console.log('\nExample:');
  console.log('  npm run dev ./sample-video.mp4');
}

if (require.main === module) {
  testSetup();
} 