<template>
  <router-link to="/login">
    <Button>
      Login
    </Button>
  </router-link>

  <div class="container text-white mx-auto p-4 flex flex-col items-center justify-center">
    <div class="relative w-full mb-4">
      <Input v-model="searchQuery" placeholder="Search sounds..." @input="updateSearch" />
      <button v-if="searchQuery" @click="clearSearch"
        class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
        <svg class="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fill-rule="evenodd"
            d="M10 9.293l6.293-6.293a1 1 0 010 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 011.414-1.414L10 8.586l5.293-5.293a1 1 0 011.414 0z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div class="container mx-auto p-4">
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
  </div>

  <div class=" flex p-2 items-center justify-center space-x-2 bg-gray-700 text-white">
    <Button @click="toggleSource">Toggle Source</Button>
    <p>Using Supabase: {{ useSupabase }}</p>
  </div>
  <div class="bg-yellow-500 text-black" v-if="loadingSounds">
    Loading Sounds...
  </div>

  <ul class="grid grid-cols-3 md:grid-cols-6 gap-4 p-2">
    <li class="flex flex-col items-center h-32 max-w-36 bg-gray-700 text-white font-bold p-2 rounded"
      v-for="sound in filteredSounds" :key="sound.name">
      <button @click="playSound(sound)"
        class="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full shadow-lg hover:cursor-pointer hover:drop-shadow-xl hover:bg-blue-600 hover:scale-105">
        <PlayButton id="play-button" v-if="currentPlaying === sound.name">
        </PlayButton>
        <PauseButton v-else id="pause-button">
        </PauseButton>
      </button>
      <router-link :to="{ name: 'SoundDetail', params: { name: sound.name } }">
        <p class=" p-2 text-wrap text-xs">
          {{ sound.name }}
        </p>
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useSoundsStore } from "@/stores/sounds"
import { storeToRefs } from "pinia";
import { uploadSound } from '@/middleware/uploadSounds';
import PlayButton from '@/components/PlayButton.vue'
import PauseButton from '@/components/PauseButton.vue'
import Button from '@/components/Button.vue'
import Input from '@/components/Input.vue'

interface Sound {
  name: string;
  url: string;
  description: string;
  source_url: string;
}

const soundName = ref('');
const soundDescription = ref('');
const soundSource = ref('');
const selectedFile = ref<File | null>(null);

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  selectedFile.value = target.files ? target.files[0] : null;
}



const { toggleSource, loadSounds } = useSoundsStore();
const soundsStore = useSoundsStore()
const { filteredSounds, useSupabase, loadingSounds } = storeToRefs(soundsStore)
console.log("FILETERD", filteredSounds.value)
var searchQuery = ref("")

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


function updateSearch() {
  soundsStore.setSearchQuery(searchQuery.value);
}

function clearSearch() {
  searchQuery.value = ""
  soundsStore.setSearchQuery(searchQuery.value);
}

const currentPlaying = ref<string | null>(null);
const audio = ref(new Audio());

audio.value.onended = () => {
  currentPlaying.value = null;
};

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
