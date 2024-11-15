<template>
  <Field v-slot="{ errors }" :name="name" v-model="number">
    <InputNumber
      v-model="number"
      :placeholder="placeholder || label"
      class="w-full"
      :invalid="errors[0] ? true : false"
    />
  </Field>
</template>

<script setup lang="ts">
import { Field, useField } from "vee-validate";
const props = defineProps<{
  label: string;
  name: string;
  placeholder?: string;
}>();

const { value: fieldValue } = useField(props.name);
const number = ref();

onMounted(() => {
  if (fieldValue) {
    number.value = fieldValue.value;
  }
});
</script>
