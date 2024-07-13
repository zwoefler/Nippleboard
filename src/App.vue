<script setup lang="ts">
import { useRouter, RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { signInWithEmail } from '@/api/authentication';

onMounted(async () => {
  await signInWithEmail()
});

const router = useRouter();
function goToHomepage() {
  router.push({ name: 'Home' });
}
</script>

<template>
  <div class="bg-almostWhite">
    <nav
      class="flex flex-col justify-center fixed items-center top-0 left-0 right-0 z-10 bg-almostBlack text-white h-20">
      <h1 @click="goToHomepage" class="font-bold">BITES</h1>
    </nav>

    <main class="flex-grow p-4 pt-20 min-h-screen">
      <RouterView class="flex-grow" />
    </main>

    <footer class="bg-footerBlack text-white p-4 text-center">
      NIPPLEBOARD
    </footer>
  </div>
</template>
