interface Sound {
    name: string;
    url: string;
}

export function loadSoundsFromAssets(): Sound[] {
    console.log("LOADING LOCAL SOUNDS")
    const soundFiles = import.meta.glob<{ [Key: string]: string }>('../assets/sounds/*.mp3', { eager: true });
    const sounds: Sound[] = Object.entries(soundFiles).map(([path, module]) => ({
        name: path.split('/').pop() || "Unnamed Sound",
        url: module.default
    }));
    return sounds;
}