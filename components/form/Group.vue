<template>
  <div :class="span">
    <label :for="name" class="sm:text-md font-medium flex gap-1">
      {{ label }} <p v-if="required" class="text-error-300">*</p>
    </label>
    <div class="mt-1 mb-2">
      <FormText
        v-if="type === 'text'"
        :label="label"
        :name="name"
        :placeholder="placeholder"
      />
      <FormPassword
        v-if="type === 'password'"
        :label="label"
        :name="name"
        :placeholder="placeholder"
      />
      <FormSelect
        v-if="type === 'select'"
        :label="label"
        :name="name"
        :options="options"
      />
      <FormDatepicker
        v-if="type === 'date'"
        :label="label"
        :name="name"
        :placeholder="placeholder"
      />
      <FormTextArea
        v-if="type === 'textarea'"
        :label="label"
        :name="name"
        :placeholder="placeholder"
      />
      <FormUpload
        v-if="type === 'image'"
        :name="name"
        :circle="circle"
      />

      <ErrorMessage v-slot="{ message }" :name="name">
        <span class="text-sm text-alert-danger-text">{{ message }}</span>
      </ErrorMessage>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TOptions } from "~/types";
import { ErrorMessage } from "vee-validate";

defineProps<{
  type: string;
  label: string;
  name: string;
  options?: TOptions;
  span: string;
  placeholder?: string;
  required?: boolean
  circle?: boolean
}>();
</script>
