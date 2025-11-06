<template>
  <button
    v-bind="$attrs"
    class="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 active:scale-95 transition disabled:opacity-60 disabled:cursor-not-allowed"
  >
    <slot />
  </button>
</template>

<script setup>
// No props required — it automatically passes all attributes.
</script>
