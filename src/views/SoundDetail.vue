<template>
  <div v-if="currentSound" class="container mx-auto p-4 flex flex-col justify-center space-y-2 text-xl">
    <h1 class="text-3xl font-bold">{{ currentSound.name }}</h1>
    <p>{{ currentSound.description }}</p>
    <a :href="currentSound.source_url" target="_blank" rel="noopener noreferrer"
      class="text-blue-500 hover:text-blue-700">{{
    currentSound.source_url }}</a>
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
  <div v-else>
    Loading sound details...
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useSoundsStore } from '@/stores/sounds';
import { downloadSoundFromSupabase } from '@/api/storage';
import { deleteSoundFromSupabase } from "@/middleware/uploadSounds";
import Button from "@/components/Button.vue"

interface Sound {
  name: string;
  url: string;
  description: string;
  source_url: string;
  bucket_item: string;
}

const route = useRoute();
const router = useRouter();
const soundsStore = useSoundsStore()
const currentSound = ref<Sound | null>(null);

watch(() => soundsStore.loadingSounds, (loading) => {
  if (!loading) {
    currentSound.value = soundsStore.sounds.find(s => s.name === route.params.name) || null;
  }
}, { immediate: true });

onMounted(() => {
  if (soundsStore.sounds.length === 0 && !soundsStore.loadingSounds) {
    soundsStore.loadSounds();
  }
});



function playSound() {
  if (!currentSound.value) return;
  const audio = new Audio(currentSound.value.url);
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
  if (!currentSound.value) return;
  const soundName = currentSound.value.name
  const fileName: string = currentSound.value.bucket_item.split('/').pop() || '';
  if (currentSound.value.url.startsWith('http')) {
    const soundBlob = await downloadSoundFromSupabase(fileName);
    if (soundBlob) {
      const url = URL.createObjectURL(soundBlob);
      downloadFile(url, soundName)
      URL.revokeObjectURL(url);
    }
  } else if (currentSound.value.url.startsWith('/')) {
    downloadFile(currentSound.value.url, soundName)
  }
}

async function deleteSound() {
  if (!currentSound.value) {
    alert("Unable to load currentSound")
    return;
  }
  await deleteSoundFromSupabase(currentSound.value.name, currentSound.value.bucket_item)
  // Delete sound from soundsStore (To not call API again!)
  router.push({ name: 'Home' });
}
</script>