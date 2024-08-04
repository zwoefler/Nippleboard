<template>
  <div class="container mx-auto p-4" v-if="sound">
    <h1>{{ sound.name }}</h1>
    <p>URL: {{ sound.url }}</p>
    <button @click="playSound"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play</button>
    <button @click="downloadSound(sound.name)"
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Download</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from "pinia";
import { useSoundsStore } from '@/stores/sounds';
import { downloadSoundFromSupabase } from '@/api/storage';

interface Sound {
  name: string;
  url: string;
  description: string;
  source_url: string;
}

const route = useRoute();
const soundsStore = useSoundsStore()
const { sounds } = storeToRefs(soundsStore)
const sound = ref<Sound | null>(null);

onMounted(() => {
  sound.value = sounds.value.find(s => s.name === route.params.id) || null;
});

function playSound() {
  if (!sound.value) return;
  const audio = new Audio(sound.value.url);
  audio.play();
}

function downloadFile(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

// FUnction takes name
// Looks up bucketItem in Database
// return bucket item
// download bucket items
async function downloadSound(soundName: string) {
  if (!sound.value) return;
  if (sound.value.url.startsWith('http')) {
    const soundBlob = await downloadSoundFromSupabase(soundName);
    if (soundBlob) {
      const url = URL.createObjectURL(soundBlob);
      downloadFile(url, soundName)
      URL.revokeObjectURL(url);
    }
  } else if (sound.value.url.startsWith('/')) {
    downloadFile(sound.value.url, soundName)
  }
}
</script>