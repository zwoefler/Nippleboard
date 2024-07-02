<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div v-for="sound in sounds" :key="sound.title" @click="playSound(sound.file)"
      class="p-4 shadow rounded bg-white cursor-pointer">
      {{ sound.title }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const sounds = ref([
  { title: 'Sound 1', file: '/sounds/terminator.mp3' },

]);

function playSound(file) {
  const audio = new Audio(file);
  audio.play();
}
</script>
