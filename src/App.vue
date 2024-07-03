<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-almostWhite">
    <!-- Navbar -->
    <nav class="bg-almostBlack text-white h-20 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10">
      <h1 class="font-bold">NIPPLEBOARD</h1>
      <input
        class="flex-1 ml-4 p-2 bg-white text-almostBlack rounded focus:outline-none focus:ring-2 focus:ring-accentOrange"
        placeholder="Search sounds...">
    </nav>

    <main class="flex-grow p-4 pt-20 min-h-screen">
      <RouterView class="flex-grow" />
    </main>

    <!-- Footer -->
    <footer class="bg-footerBlack text-white p-4 text-center">
      NIPPLEBOARD
    </footer>
  </div>
</template>
