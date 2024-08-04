<template>
  <div class="container mx-auto p-4 flex flex-col justify-center space-y-2 text-xl" v-if="sound">
    <h1 class="text-3xl font-bold">{{ sound.name }}</h1>
    <p>{{ sound.description }}</p>
    <a :href="sound.source_url" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:text-blue-700">{{
    sound.source_url }}</a>
    <div class="flex justify-between space-x-2">
      <Button @click="playSound" class="w-full">
        Play
      </Button>
      <Button @click="downloadSound" class="w-full">
        Download
      </Button>
    </div>
    <Button @click="deleteSound" class="bg-red-500 w-full">
      🗑️ Delete
    </Button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from "pinia";
import { useSoundsStore } from '@/stores/sounds';
import { downloadSoundFromSupabase } from '@/api/storage';
import Button from "@/components/Button.vue"
import { deleteSoundFromSupabase } from "@/middleware/uploadSounds";

interface Sound {
  name: string;
  url: string;
  description: string;
  source_url: string;
  bucket_item: string;
}

const route = useRoute();
const soundsStore = useSoundsStore()
const { sounds } = storeToRefs(soundsStore)
const sound = ref<Sound | null>(null);

onMounted(() => {
  sound.value = sounds.value.find(s => s.name === route.params.id) || null;
  console.log("SOUND", sound.value)
});

function playSound() {
  if (!sound.value) return;
  const audio = new Audio(sound.value.url);
  audio.play();
}

function downloadFile(url: string, filename: string) {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

async function downloadSound() {
  if (!sound.value) return;
  const soundName = sound.value.name
  const fileName: string = sound.value.bucket_item.split('/').pop() || '';
  if (sound.value.url.startsWith('http')) {
    const soundBlob = await downloadSoundFromSupabase(fileName);
    if (soundBlob) {
      const url = URL.createObjectURL(soundBlob);
      downloadFile(url, soundName)
      URL.revokeObjectURL(url);
    }
  } else if (sound.value.url.startsWith('/')) {
    downloadFile(sound.value.url, soundName)
  }
}

async function deleteSound() {
  if (!sound.value) {
    alert("Unable to load sound")
    return;
  }
  // Delete sound from database & storage
  // Call middleware for that!
  await deleteSoundFromSupabase(sound.value.name, sound.value.bucket_item)
  // Delete sound from soundsStore (To not call API again!)
  // Redirect after deletion to Homepage
}
</script>