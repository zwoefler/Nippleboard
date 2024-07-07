<template>
  <div class="container mx-auto p-4" v-if="sound">
    <h1>{{ sound.name }}</h1>
    <p>URL: {{ sound.url }}</p>
    <button @click="playSound"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Play</button>
    <a :href="sound.url" download
      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Download</a>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from "pinia";
import { useSoundsStore } from '@/stores/sounds';

const route = useRoute();
const soundsStore = useSoundsStore()
const { sounds } = storeToRefs(soundsStore)
const sound = ref(null);

onMounted(() => {
  sound.value = sounds.value.find(s => s.name === route.params.id);
});

function playSound() {
  if (!sound.value) return;
  const audio = new Audio(sound.value.url);
  audio.play();
}
</script>