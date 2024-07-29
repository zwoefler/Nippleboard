import { defineStore } from 'pinia';
import { fetchSoundsFromSupabase } from '@/api/storage';
import { loadSoundsFromAssets } from '@/api/localSounds';
import { getLoggedInUser } from '@/api/authentication';
import { readSoundsMetaData } from '@/api/database';

interface Sound {
    name: string;
    url: string;
}


export const useSoundsStore = defineStore('sounds', {
    state: () => ({
        sounds: [] as Sound[],
        soundsMetaData: [{}] || null,
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
                this.sounds = await fetchSoundsFromSupabase()
                this.soundsMetaData = readSoundsMetaData()
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
