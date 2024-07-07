<template>
  <div>
    <ul>
      <li v-for="sound in sounds" :key="sound.name">
        <button @click="playSound(sound.url)">{{ sound.name }}</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const sounds = ref([]);

onMounted(async () => {
  const soundFiles = import.meta.glob('../assets/sounds/*.mp3', { eager: true });
  sounds.value = Object.entries(soundFiles).map(([path, module]) => ({
    name: path.split('/').pop(),
    url: module.default
  }));
});

function playSound(url) {
  const audio = new Audio(url);
  audio.play();
}
</script>
