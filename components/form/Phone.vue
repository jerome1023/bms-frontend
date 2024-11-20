<template>
  <Field v-slot="{ field, errors }" :name="name" v-model="phone">
    <InputMask
      v-model="phone"
      mask="0999-999-9999"
      :placeholder="placeholder ?? label"
      :invalid="errors[0] ? true : false"
      class="w-full"
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
const phone = ref();

onMounted(() => {
  if (fieldValue) {
    phone.value = fieldValue.value;
  }
});
</script>
