import { defineStore } from 'pinia';
import { fetchSoundsFromSupabase } from '@/api/storage';
import { loadSoundsFromAssets } from '@/api/localSounds';
import { getLoggedInUser } from '@/api/authentication';


export const useSoundsStore = defineStore('sounds', {
    state: () => ({
        sounds: [],
        searchQuery: '',
        useSupabase: true,
        loadingSounds: false
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
            this.loadingSounds = true;
            const isLoggedIn = await getLoggedInUser()
            if (this.useSupabase && isLoggedIn) {
                this.sounds = await fetchSoundsFromSupabase()
            } else {
                this.useSupabase = false;
                this.sounds = loadSoundsFromAssets();
            }
            this.loadingSounds = false;
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
