<template>

  <div class="container mx-auto p-4 flex flex-col justify-center space-y-2 text-xl">
    <h1 class="text-3xl font-bold">Login</h1>
    <form class="space-y-2" @submit.prevent="loginUserLoadSounds(email, password)">
      <div class="flex flex-col">
        <label class="font-bold" for="email">Email:</label>
        <input type="email" id="email" placeholder="E-Mail address" v-model="email" required>
      </div>
      <div class="flex flex-col">
        <label class="font-bold" for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <Button class="w-full" type="submit">Login</Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { loginUserLoadSounds } from '@/middleware/authentication';
import Button from "@/components/Button.vue"

const email = ref('');
const password = ref('');
</script>
