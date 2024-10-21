<template>
  <Field v-slot="{ field, errors }" :name="name">
    <Password
      v-bind="field"
      v-model="field.value"
      :placeholder="placeholder"
      :feedback="false"
      toggleMask
      inputClass="w-full"
      style="width: 100%"
      :invalid="errors[0] ? true : false"
    />
  </Field>
</template>

<script setup lang="ts">
import Password from "primevue/password";
import { Field } from "vee-validate/";

defineProps<{
  name: string;
  placeholder?: string;
}>();
</script>

<style>
input[type="password"]::-ms-reveal,
input[type="password"]::-ms-clear {
  display: none;
}
</style>
