<template>
  <input type="text" :value="modelValue" @input="updateValue" @change="onChange"
    class="text-gray-700 p-2 border rounded w-full pl-3 pr-10">
</template>

<script setup>
const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const updateValue = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>