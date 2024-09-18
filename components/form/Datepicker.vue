<template>
  <Field v-slot="{ field }" :name="name">
    <Calendar
      v-bind="field"
      v-model="field.value"
      class="w-full"
      :placeholder="label || placeholder"
      showIcon
      iconDisplay="input"
      :inputId="name"
      dateFormat="yy-mm-dd"
      :showTime="name==='when' ? true : false"
      hourFormat="12"
    />
  </Field>
</template>
<script setup lang="ts">
import { Field } from "vee-validate/";

defineProps<{
  label: string;
  name: string;
  placeholder?: string;
}>();

</script>
