import { defineStore } from 'pinia';
import { supabase } from '@/api/supabase';

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
                await this.loadSoundsFromSupabase();
            } else {
                this.loadSoundsFromAssets();
            }
        },
        loadSoundsFromAssets() {
            const soundFiles = import.meta.glob('../assets/sounds/*.mp3', { eager: true });
            this.sounds = Object.entries(soundFiles).map(([path, module]) => ({
                name: path.split('/').pop(),
                url: module.default
            }));
        },
        async loadSoundsFromSupabase() {
            try {
                const { data, error } = await supabase.storage.from('sounds').list();
                if (error) throw error;
                // Map over the data to fit your local sound objects structure
                this.sounds = data.map(file => ({
                    name: file.name,
                    url: "NONE"
                }));
            } catch (error) {
                console.error('Error fetching sounds from Supabase:', error);
                this.sounds = []; // Reset the sounds array on error
            }
        },
        setSearchQuery(query) {
            this.searchQuery = query;
        },
        toggleSource() {
            this.useSupabase = !this.useSupabase;
            this.loadSounds();
        }
    }
});
