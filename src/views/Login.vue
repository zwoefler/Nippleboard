<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="loginUserLoadSounds(email, password)">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { loginUserLoadSounds } from '@/middleware/authentication';

const email = ref('');
const password = ref('');
</script>
