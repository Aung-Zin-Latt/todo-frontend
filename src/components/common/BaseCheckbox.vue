<template>
  <label class="flex items-center space-x-2 cursor-pointer">
    <input type="checkbox" v-bind="$attrs" class="accent-blue-600 rounded focus:ring-blue-500" />
    <span class="text-gray-700 text-sm"><slot /></span>
  </label>
</template>

<script setup></script>
