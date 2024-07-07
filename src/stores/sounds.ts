import { defineStore } from 'pinia';

export const useSoundsStore = defineStore('sounds', {
    state: () => ({
        sounds: [],
    }),
    actions: {
        loadSounds() {
            const soundFiles = import.meta.glob('../assets/sounds/*.mp3', { eager: true });
            this.sounds = Object.entries(soundFiles).map(([path, module]) => ({
                name: path.split('/').pop(),
                url: module.default
            }));
        },
    }
});
