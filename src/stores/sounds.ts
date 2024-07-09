import { defineStore } from 'pinia';

export const useSoundsStore = defineStore('sounds', {
    state: () => ({
        sounds: [],
        searchQuery: ''
    }),
    getters: {
        filteredSounds(state) {
            if (!state.searchQuery.trim()) {
                return state.sounds;
            }
            const searchLower = state.searchQuery.toLowerCase();
            return state.sounds.filter(sound =>
                sound.name.toLowerCase().includes(searchLower)
            );
        }
    },
    actions: {
        loadSounds() {
            const soundFiles = import.meta.glob('../assets/sounds/*.mp3', { eager: true });
            this.sounds = Object.entries(soundFiles).map(([path, module]) => ({
                name: path.split('/').pop(),
                url: module.default
            }));
        },
        setSearchQuery(query) {
            this.searchQuery = query;
        }
    }
});
