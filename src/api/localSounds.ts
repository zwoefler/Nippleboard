type SoundModule = {
    default: string;
};

interface Sound {
    name: string;
    url: string;
}

export function loadSoundsFromAssets(): Sound[] {
    console.log("LOADING LOCAL SOUNDS")
    const soundFiles = import.meta.glob<{ [Key: string]: SoundModule }>('../assets/sounds/*.mp3', { eager: true });
    const sounds = Object.entries(soundFiles).map(([path, module]) => ({
        name: path.split('/').pop(),
        url: module.default
    }));
    return sounds;
}