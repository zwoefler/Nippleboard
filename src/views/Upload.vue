<template>
  <div class="container mx-auto p-4 flex flex-col items-center justify-center">
    <h1 class="text-2xl font-bold mb-4">Upload New Sound</h1>
    <input type="file" ref="fileInput" class="hidden" @change="handleFileChange" accept="audio/*" />
    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      @click="triggerFileInput">
      Select File
    </button>
    <button v-if="selectedFile"
      class="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      @click="uploadFile">
      Upload File
    </button>
    <p v-if="selectedFile" class="mt-2 text-gray-700">Selected file: {{ selectedFile.name }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { uploadFileToStorage } from '@/api/storage';

const fileInput = ref(null);
const selectedFile = ref(null);

function triggerFileInput() {
  fileInput.value.click();
}

function handleFileChange(event) {
  selectedFile.value = event.target.files[0];
}

function uploadFile() {
  if (!selectedFile.value) {
    alert('No file selected!');
    return;
  }
  console.log('Uploading', selectedFile.value.name);
  uploadFileToStorage(selectedFile.value, selectedFile.value.name)
}
</script>
