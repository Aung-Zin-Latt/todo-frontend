<template>
  <button
    v-bind="$attrs"
    :disabled="disabled"
    class="px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition focus:outline-none focus:ring-2 disabled:opacity-60 disabled:cursor-not-allowed bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: Boolean,
})
</script>
