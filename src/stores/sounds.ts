import { defineStore } from 'pinia';

export const useSoundsStore = defineStore('sounds', {
  state: () => ({
    sounds: [] as Array<{ title: string, file: string }>,
  }),
  actions: {
    addSound(sound: { title: string, file: string }) {
      this.sounds.push(sound);
    }
  }
});
