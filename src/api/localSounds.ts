export function loadSoundsFromAssets() {
    console.log("LOADING LOCAL SOUNDS")
    const soundFiles = import.meta.glob('../assets/sounds/*.mp3', { eager: true });
    const sounds = Object.entries(soundFiles).map(([path, module]) => ({
        name: path.split('/').pop(),
        url: module.default
    }));
    return sounds;
}