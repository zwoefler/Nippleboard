import { defineStore } from 'pinia';
import { supabase } from '@/api/supabase';
import { fetchSounds } from '@/api/storage';

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
            console.log("LOADING LOCAL SOUNDS")
            const soundFiles = import.meta.glob('../assets/sounds/*.mp3', { eager: true });
            this.sounds = Object.entries(soundFiles).map(([path, module]) => ({
                name: path.split('/').pop(),
                url: module.default
            }));
        },
        async loadSoundsFromSupabase() {
            console.log("LOADING SOUNDS FROM SUPABASE")
            try {
                const data = await fetchSounds();
                console.log("FETCHDATA", data)
                const paths = data.map(file => "sounds/" + file.name);
                console.log("PATHS", paths)
                const { data: signedData, error: signedError } = await supabase.storage.from('sounds')
                    .createSignedUrls(paths, 3600);

                console.log("signedDATA", signedData)
                if (signedError) throw signedError;

                this.sounds = signedData.map(({ path, signedUrl }) => ({
                    name: path.split('/').pop(),
                    url: signedUrl
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
            console.log("SWITCH TOGGLE SOURCE FROM", this.useSupabase)
            this.useSupabase = !this.useSupabase;
            this.loadSounds();
        }
    }
});
