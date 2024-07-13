<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
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
import { signInWithEmail } from '@/api/authentication';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');

async function handleLogin() {
  try {
    console.log('Logging in with:', email.value, password.value);
    const { user, error } = await signInWithEmail(email.value, password.value)
    console.log("USER", user)
    if (user) {
      router.push({ name: "Home" })
    } else {
      alert('Login failed! Check Credentials')
    }
  } catch (error) {
    console.error("Unexpected login error: ", error)
    alert("Login failed due to unexpected error")
  }
}
</script>
