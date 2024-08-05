<template>
  <div class="container mx-auto p-4 space-y-2">
    <h1 class="text-3xl font-bold">Upload Sounds</h1>
    <form class="space-y-1" @submit.prevent="handleUpload">
      <Input v-model="soundName" placeholder="Sound Name..." />
      <Input v-model="soundDescription" placeholder="Description..." />
      <Input v-model="soundSource" placeholder="Source URL..." />
      <Input type="file" @change="handleFileChange" />
      <Button type="submit">
        Upload Sound
      </Button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from "@/components/Button.vue"
import Input from "@/components/Input.vue"
import { uploadSound } from '@/middleware/uploadSounds';
import { useSoundsStore } from "@/stores/sounds"

const soundName = ref('');
const soundDescription = ref('');
const soundSource = ref('');
const selectedFile = ref<File | null>(null);
const { loadSounds } = useSoundsStore();

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  selectedFile.value = target.files ? target.files[0] : null;
}

async function handleUpload() {
  if (!selectedFile.value) {
    alert("Please select a file to upload");
    return;
  }
  if (!soundName.value || !soundDescription.value || !soundSource.value) {
    alert("Please fill in all fields");
    return;
  }
  await uploadSound(selectedFile.value, soundName.value, soundDescription.value, soundSource.value);
  soundName.value = "";
  soundDescription.value = "";
  soundSource.value = "";
  selectedFile.value = null;
  await loadSounds()
}


</script>