<template>
  <Field v-slot="{ errors }" :name="name" v-model="number">
    <InputNumber
      v-model="number"
      :placeholder="placeholder || label"
      class="w-full"
      :invalid="errors[0] ? true : false"
      :min="min"
      :max="max"
      :useGrouping="enableLimits ? false : true"
    />
  </Field>
</template>

<script setup lang="ts">
import { Field, useField } from "vee-validate";
const props = defineProps<{
  label: string;
  name: string;
  placeholder?: string;
  enableLimits?: {
    min: number;
    max: number;
  };
}>();

const { value: fieldValue } = useField(props.name);
const number = ref();
const min = props.enableLimits?.min ? props.enableLimits?.min : 0;
const max = props.enableLimits?.max ? props.enableLimits?.max : 10000000;

onMounted(() => {
  if (fieldValue) {
    number.value = fieldValue.value;
  }
});
</script>
