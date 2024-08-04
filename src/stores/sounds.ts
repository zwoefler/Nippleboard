import { defineStore } from 'pinia';
import { fetchSoundsMetadata } from '@/middleware/sounds';
import { loadSoundsFromAssets } from '@/api/localSounds';
import { getLoggedInUser } from '@/api/authentication';

interface Sound {
    name: string;
    url: string;
    description: string;
    source_url: string;
    bucket_item: string;
}

export const useSoundsStore = defineStore('sounds', {
    state: () => ({
        sounds: [] as Sound[],
        searchQuery: '',
        useSupabase: true,
        loadingSounds: false
    }),
    getters: {
        filteredSounds(state): Sound[] {
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
                this.sounds = await fetchSoundsMetadata()
            } else {
                this.useSupabase = false;
                this.sounds = loadSoundsFromAssets();
            }
            this.loadingSounds = false;
        },
        setSearchQuery(query: string) {
            this.searchQuery = query;
        },
        toggleSource() {
            this.useSupabase = !this.useSupabase;
            this.loadSounds();
        }
    }
});
