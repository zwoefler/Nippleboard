<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue';
import { useSoundsStore } from '@/stores/sounds';

const soundsStore = useSoundsStore();

onMounted(() => {
  soundsStore.loadSounds();
});
</script>

<template>
  <div class="bg-almostWhite">
    <nav
      class="flex flex-col justify-center fixed items-center top-0 left-0 right-0 z-10 bg-almostBlack text-white h-20">
      <h1 class="font-bold">BITES</h1>
      <input class="h-10 w-full p-2 bg-white rounded focus:outline-none focus:ring-2 focus:ring-accentOrange"
        placeholder="Search sounds...">
    </nav>

    <main class="flex-grow p-4 pt-20 min-h-screen">
      <RouterView class="flex-grow" />
    </main>

    <footer class="bg-footerBlack text-white p-4 text-center">
      NIPPLEBOARD
    </footer>
  </div>
</template>
