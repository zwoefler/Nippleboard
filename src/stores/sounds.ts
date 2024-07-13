import { defineStore } from 'pinia';
import { fetchSoundsFromSupabase } from '@/api/storage';
import { loadSoundsFromAssets } from '@/api/localSounds';

export const useSoundsStore = defineStore('sounds', {
    state: () => ({
        sounds: [],
        searchQuery: '',
        useSupabase: true
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
        async loadSounds() {
            if (this.useSupabase) {
                this.sounds = await fetchSoundsFromSupabase()
            } else {
                this.sounds = loadSoundsFromAssets();
            }
        },
        setSearchQuery(query) {
            this.searchQuery = query;
        },
        toggleSource() {
            console.log("SWITCH TOGGLE SOURCE FROM", this.useSupabase)
            this.useSupabase = !this.useSupabase;
            this.loadSounds();
        }
    }
});
