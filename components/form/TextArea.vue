<template>
  <Field v-slot="{ field }" :name="name">
    <Textarea
      v-bind="field"
      v-model="field.value"
      :placeholder="label || placeholder"
      autoResize rows="3"
      class="w-full"
    />
  </Field>
</template>

<script setup lang="ts">
import { Field } from "vee-validate";
defineProps<{
  label: string;
  name: string;
  placeholder?: string;
}>();
</script>
