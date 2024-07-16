<template>
  <input type="text" placeholder="Search sounds..." class="mb-4 p-2 border rounded w-full" @input="updateSearch" />
  <div class="bg-gray-700 container text-white mx-auto p-4 flex flex-col items-center justify-center">
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
    <p v-if="selectedFile" class="mt-2">Selected file: {{ selectedFile.name }}</p>
  </div>
  <div class="flex p-2 items-center justify-center space-x-2 bg-gray-700 text-white">
    <button class="bg-blue-500 p-2  rounded" @click="toggleSource">Toggle Source</button>
    <p>Using Supabase: {{ useSupabase }}</p>
  </div>
  <ul class="grid grid-cols-3 md:grid-cols-6 gap-4 p-2">
    <li class="flex flex-col items-center h-32 max-w-36 bg-gray-700 text-white font-bold p-2 rounded"
      v-for="sound in filteredSounds" :key="sound.name">
      <button @click="playSound(sound)"
        class="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full shadow-lg hover:cursor-pointer hover:drop-shadow-xl hover:bg-blue-600 hover:scale-105">
        <PlayButton id="play-button" v-if="currentPlaying === sound.name">
        </PlayButton>
        <svg v-else id="pause-button" stroke="currentColor" fill="currentColor" viewBox="0 0 32 32"
          enable-background="new 0 0 32 32">
          <g>
            <path fill="currentColor"
              d="M19.609,14.802L14.316,10.8c-0.263-0.197-0.567-0.302-0.88-0.302C12.631,10.498,12,11.158,12,12v8 c0,0.842,0.635,1.502,1.445,1.502c0.313,0,0.619-0.104,0.885-0.304l5.258-3.998c0.382-0.287,0.611-0.742,0.611-1.218 C20.198,15.512,19.983,15.081,19.609,14.802z M18.985,16.401l-5.258,3.998C13.434,20.622,13,20.453,13,20v-8 c0-0.326,0.225-0.502,0.437-0.502c0.096,0,0.19,0.034,0.279,0.101l5.293,4.002c0.165,0.123,0.19,0.292,0.19,0.382 C19.198,16.147,19.122,16.3,18.985,16.401z">
            </path>
          </g>
        </svg>
      </button>
      <div @click="goToSoundDetail(sound.name)">
        <p class="p-2 text-wrap text-xs">
          {{ sound.name }}
        </p>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useSoundsStore } from "@/stores/sounds"
import { storeToRefs } from "pinia";
import PlayButton from '@/components/PlayButton.vue'

interface Sound {
  name: string;
  url: string;
}

// UPLOADING SOUNDS
const fileInput = ref<HTMLInputElement | null>(null);
const selectedFile = ref<File | null>(null);

function triggerFileInput() {
  fileInput.value?.click();
}

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  selectedFile.value = target.files ? target.files[0] : null;
}

function uploadFile() {
  if (!selectedFile.value) {
    alert('No file selected!');
    return;
  }
  console.log('Uploading', selectedFile.value.name);
  uploadFileToStorage(selectedFile.value, selectedFile.value.name)
  selectedFile.value = null
}


const { toggleSource, loadSounds } = useSoundsStore();
onMounted(async () => {
  await loadSounds()
});

const soundsStore = useSoundsStore()
const { filteredSounds, useSupabase } = storeToRefs(soundsStore)

function updateSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  soundsStore.setSearchQuery(target.value);
}

const currentPlaying = ref<string | null>(null);
const audio = ref(new Audio());

audio.value.onended = () => {
  currentPlaying.value = null;
};

const router = useRouter();
function goToSoundDetail(soundName: string) {
  router.push({ name: 'SoundDetail', params: { id: soundName } });
}

watch(currentPlaying, (newSound) => {
  if (newSound) {
    const sound = soundsStore.sounds.find(sound => sound.name === newSound);
    if (sound) {
      audio.value.src = sound.url;
      audio.value.play();
    } else {
      audio.value.pause();
    }
  }
});

function playSound(sound: Sound) {
  if (currentPlaying.value === sound.name) {
    currentPlaying.value = null;
  } else {
    currentPlaying.value = sound.name;
  }
}

</script>
