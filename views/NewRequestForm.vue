<template>
  <div class="sm:grid grid-cols-6 gap-x-3">
    <FormGroup
      label="Fullname"
      type="text"
      name="fullname"
      placeholder="e.g., Doe, John A."
      span="col-span-3"
    />
    <FormGroup label="Age" type="text" name="age" span="col-span-3" />
    <FormGroup
      label="Sitio"
      type="select"
      :options="sitioOptions"
      name="sitio"
      span="col-span-3"
    />
    <FormGroup
      label="Document"
      type="select"
      :options="documentOptions"
      name="document"
      span="col-span-3"
    />
    <FormGroup
      label="Purpose"
      type="select"
      :options="purposeOptions"
      name="purpose"
      span="col-span-3"
    />
    <FormGroup v-if="purposeValue == 'Business'" label="Income" type="text" name="income" span="col-span-3" />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate/";
const { value: purposeValue } = useField('purpose');

const documentOptions = ref();
const sitioOptions = ref();
const purposeOptions = [
  {
    code: "Work",
    name: "Work",
  },
  {
    code: "School Requirement",
    name: "School Requirement",
  },
  {
    code: "Business",
    name: "Business",
  },
  {
    code: "Others",
    name: "Others",
  },
];

onMounted(async () => {
  await useGetData("document/list").then((response) => {
    documentOptions.value = response.map((item: any) => ({
      code: item.id,
      name: item.name,
    }));
  });
  await useGetData("sitio/list").then((response) => {
    sitioOptions.value = response.map((item: any) => ({
      code: item.id,
      name: item.name,
    }));
  });
});
</script>
