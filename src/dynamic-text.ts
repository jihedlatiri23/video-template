import * as fs from 'fs';

interface DynamicTextConfig {
  videoType: 'recipe' | 'tutorial' | 'product' | 'lifestyle' | 'custom';
  duration: number;
  customTexts?: string[];
  autoGenerate?: boolean;
}

interface TextOverlay {
  text: string;
  start: number;
  end: number;
}

class DynamicTextGenerator {
  private static readonly RECIPE_TEXTS = [
    "Quick Recipe",
    "Step 1: Prep ingredients",
    "Step 2: Cook time",
    "Step 3: Plate & serve",
    "Ready to enjoy!"
  ];

  private static readonly TUTORIAL_TEXTS = [
    "How to...",
    "Step 1: Get started",
    "Step 2: Follow along",
    "Step 3: Practice",
    "You got this!"
  ];

  private static readonly PRODUCT_TEXTS = [
    "Amazing Product",
    "Key Feature 1",
    "Key Feature 2", 
    "Why choose this?",
    "Get yours now!"
  ];

  private static readonly LIFESTYLE_TEXTS = [
    "Life Hack",
    "Pro Tip",
    "Try This",
    "Game Changer",
    "Share if helpful!"
  ];

  static generateTextOverlays(config: DynamicTextConfig): TextOverlay[] {
    const { videoType, duration, customTexts, autoGenerate } = config;
    
    let texts: string[] = [];

    // Use custom texts if provided
    if (customTexts && customTexts.length > 0) {
      texts = customTexts;
    } else {
      // Auto-generate based on video type
      switch (videoType) {
        case 'recipe':
          texts = this.RECIPE_TEXTS;
          break;
        case 'tutorial':
          texts = this.TUTORIAL_TEXTS;
          break;
        case 'product':
          texts = this.PRODUCT_TEXTS;
          break;
        case 'lifestyle':
          texts = this.LIFESTYLE_TEXTS;
          break;
        case 'custom':
          texts = ['Custom Text 1', 'Custom Text 2', 'Custom Text 3'];
          break;
      }
    }

    // Calculate timing based on duration
    const segmentDuration = duration / texts.length;
    const overlays: TextOverlay[] = [];

    texts.forEach((text, index) => {
      const start = index * segmentDuration;
      const end = (index + 1) * segmentDuration;
      
      overlays.push({
        text,
        start: Math.round(start * 10) / 10, // Round to 1 decimal
        end: Math.round(end * 10) / 10
      });
    });

    return overlays;
  }

  // Generate text based on video filename or content type
  static generateFromVideoPath(videoPath: string, duration: number): TextOverlay[] {
    const filename = videoPath.toLowerCase();
    
    let videoType: 'recipe' | 'tutorial' | 'product' | 'lifestyle' | 'custom' = 'custom';
    
    if (filename.includes('recipe') || filename.includes('cook') || filename.includes('food')) {
      videoType = 'recipe';
    } else if (filename.includes('tutorial') || filename.includes('how') || filename.includes('guide')) {
      videoType = 'tutorial';
    } else if (filename.includes('product') || filename.includes('review') || filename.includes('demo')) {
      videoType = 'product';
    } else if (filename.includes('life') || filename.includes('tip') || filename.includes('hack')) {
      videoType = 'lifestyle';
    }

    return this.generateTextOverlays({ videoType, duration });
  }

  // Save dynamic config to template.json
  static updateTemplateWithDynamicText(videoPath: string, duration: number): void {
    const overlays = this.generateFromVideoPath(videoPath, duration);
    
    const templatePath = 'template.json';
    const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
    
    template.text_overlays = overlays;
    template.main_clip_duration = duration;
    
    fs.writeFileSync(templatePath, JSON.stringify(template, null, 2));
    
    console.log('✅ Template updated with dynamic text overlays!');
    console.log(`📝 Generated ${overlays.length} text overlays for ${duration}s video`);
  }
}

export { DynamicTextGenerator, DynamicTextConfig, TextOverlay }; 