<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1">
      {{ label }}
    </label>

    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="[
        'w-full px-3 py-2 border rounded-lg text-sm focus:outline-none transition',
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
        disabled && 'bg-gray-100 cursor-not-allowed',
      ]"
    />

    <p v-if="error" class="mt-1 text-xs text-red-500 min-h-[1rem]">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  error: String,
  disabled: Boolean,
})
defineEmits(['update:modelValue'])
</script>
