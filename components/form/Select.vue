<template>
  <Field v-slot="{ errors }" :name="name" v-model="selected">
    <Dropdown
      v-model="selected"
      :options="options"
      optionLabel="name"
      optionValue="code"
      :placeholder="label || placeholder"
      checkmark
      :highlightOnSelect="true"
      class="w-full md:w-14rem"
      :invalid="errors[0] ? true : false"
    ></Dropdown>
  </Field>
</template>

<script setup lang="ts">
import { Field, useField } from "vee-validate/";
import { ref } from "vue";
import type { TOptions } from "~/types";

const props = defineProps<{
  label: string;
  name: string;
  placeholder?: string;
  options?: TOptions;
}>();

const { value: fieldValue } = useField(props.name);
const selected = ref();

onMounted(() => {
  selected.value = fieldValue.value;
});
</script>
