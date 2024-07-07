<template>
  <ul class="grid grid-cols-3 md:grid-cols-6 gap-4 p-2">
    <li class="flex flex-col items-center h-32 max-w-36 bg-gray-300 text-white font-bold p-2 rounded"
      v-for="sound in sounds" :key="sound.name">
      <button @click="playSound(sound)"
        class="w-12 h-12 flex items-center justify-center bg-blue-500 rounded-full shadow-lg hover:cursor-pointer hover:drop-shadow-xl hover:bg-blue-600 hover:scale-105">
        <svg v-if="currentPlaying === sound.name" id="play-button" stroke="currentColor" fill="currentColor"
          stroke-width="0" viewBox="0 0 448 512" class="text-slate-200 hover:scale-125" height="1em" width="1em">
          <path
            d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z">
          </path>
        </svg>
        <svg v-else id="pause-button" stroke="currentColor" fill="currentColor" viewBox="0 0 32 32"
          enable-background="new 0 0 32 32">
          <g>
            <path fill="currentColor"
              d="M19.609,14.802L14.316,10.8c-0.263-0.197-0.567-0.302-0.88-0.302C12.631,10.498,12,11.158,12,12v8 c0,0.842,0.635,1.502,1.445,1.502c0.313,0,0.619-0.104,0.885-0.304l5.258-3.998c0.382-0.287,0.611-0.742,0.611-1.218 C20.198,15.512,19.983,15.081,19.609,14.802z M18.985,16.401l-5.258,3.998C13.434,20.622,13,20.453,13,20v-8 c0-0.326,0.225-0.502,0.437-0.502c0.096,0,0.19,0.034,0.279,0.101l5.293,4.002c0.165,0.123,0.19,0.292,0.19,0.382 C19.198,16.147,19.122,16.3,18.985,16.401z">
            </path>
          </g>
        </svg>
      </button>
      <p class="p-2 text-wrap text-xs">
        {{ sound.name }}
      </p>
    </li>
  </ul>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useSoundsStore } from "@/stores/sounds"
import { storeToRefs } from "pinia";

const soundsStore = useSoundsStore()
const { sounds } = storeToRefs(soundsStore)

const currentPlaying = ref(null);
const audio = ref(new Audio());

audio.value.onended = () => {
  currentPlaying.value = null;
};

watch(currentPlaying, (newSound, oldSound) => {
  if (newSound) {
    audio.value.src = sounds.value.find(sound => sound.name === newSound).url;
    audio.value.play();
  } else if (audio.value) {
    audio.value.pause();
  }
});

function playSound(sound) {
  if (currentPlaying.value === sound.name) {
    currentPlaying.value = null;
  } else {
    currentPlaying.value = sound.name;
  }
}

</script>
