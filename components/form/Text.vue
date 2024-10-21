<template>
  <Field v-slot="{ field, errors }" :name="name">
    <InputText
      v-bind="field"
      v-model="field.value"
      :placeholder="placeholder || label"
      type="text"
      class="w-full"
      :invalid="errors[0] ? true : false"
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
