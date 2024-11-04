<template>
  <Field v-slot="{ field }" :name="name">
    <input
      v-bind="field"
      type="month"
      class="px-1 text-xs border border-base-gray rounded-sm text-base-gray w-[8.5rem]"
    />
  </Field>
</template>
<script setup lang="ts">
defineProps<{
    name: string
}>()
</script>
