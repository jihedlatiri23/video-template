interface MusicConfig {
  videoType: 'recipe' | 'tutorial' | 'product' | 'lifestyle' | 'workout' | 'custom';
  mood: 'calm' | 'energetic' | 'epic' | 'funky' | 'study';
}

class MusicSelector {
  private static readonly MUSIC_MAPPING = {
    recipe: {
      calm: 'assets/audio/backgrounds/background_chill_lofi.mp3',
      energetic: 'assets/music_upbeat.mp3',
      epic: 'assets/audio/inspiring-epic-dubstep_distant-horizons-12219.mp3'
    },
    tutorial: {
      calm: 'assets/music_ambient.mp3',
      energetic: 'assets/music_upbeat.mp3',
      study: 'assets/audio/backgrounds/background_chill_lofi.mp3'
    },
    product: {
      epic: 'assets/audio/inspiring-epic-dubstep_distant-horizons-12219.mp3',
      energetic: 'assets/music_upbeat.mp3',
      calm: 'assets/music_ambient.mp3'
    },
    lifestyle: {
      funky: 'assets/music_upbeat.mp3',
      calm: 'assets/audio/backgrounds/background_chill_lofi.mp3',
      energetic: 'assets/music_upbeat.mp3'
    },
    workout: {
      energetic: 'assets/music_upbeat.mp3',
      epic: 'assets/audio/inspiring-epic-dubstep_distant-horizons-12219.mp3'
    },
    custom: {
      calm: 'assets/audio/backgrounds/background_chill_lofi.mp3',
      energetic: 'assets/music_upbeat.mp3',
      epic: 'assets/audio/inspiring-epic-dubstep_distant-horizons-12219.mp3'
    }
  };

  static selectMusic(videoPath: string, mood: string = 'calm'): string {
    const filename = videoPath.toLowerCase();
    let videoType: keyof typeof this.MUSIC_MAPPING = 'custom';
    
    // Detect video type from filename
    if (filename.includes('recipe') || filename.includes('cook') || filename.includes('food')) {
      videoType = 'recipe';
    } else if (filename.includes('tutorial') || filename.includes('how') || filename.includes('guide')) {
      videoType = 'tutorial';
    } else if (filename.includes('product') || filename.includes('review') || filename.includes('demo')) {
      videoType = 'product';
    } else if (filename.includes('life') || filename.includes('tip') || filename.includes('hack')) {
      videoType = 'lifestyle';
    } else if (filename.includes('workout') || filename.includes('exercise') || filename.includes('fitness')) {
      videoType = 'workout';
    }

    const availableMoods = Object.keys(this.MUSIC_MAPPING[videoType]);
    const selectedMood = availableMoods.includes(mood) ? mood : availableMoods[0];
    
    return this.MUSIC_MAPPING[videoType][selectedMood as keyof typeof this.MUSIC_MAPPING[typeof videoType]];
  }

  static getMusicRecommendations(videoPath: string): { type: string; recommendations: string[] } {
    const filename = videoPath.toLowerCase();
    let videoType = 'custom';
    
    if (filename.includes('recipe') || filename.includes('cook') || filename.includes('food')) {
      videoType = 'recipe';
    } else if (filename.includes('tutorial') || filename.includes('how') || filename.includes('guide')) {
      videoType = 'tutorial';
    } else if (filename.includes('product') || filename.includes('review') || filename.includes('demo')) {
      videoType = 'product';
    } else if (filename.includes('life') || filename.includes('tip') || filename.includes('hack')) {
      videoType = 'lifestyle';
    } else if (filename.includes('workout') || filename.includes('exercise') || filename.includes('fitness')) {
      videoType = 'workout';
    }

    const availableMoods = Object.keys(this.MUSIC_MAPPING[videoType as keyof typeof this.MUSIC_MAPPING]);
    
    return {
      type: videoType,
      recommendations: availableMoods
    };
  }
}

export { MusicSelector, MusicConfig }; 