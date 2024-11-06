<template>
  <div class="sm:grid grid-cols-6 gap-x-3">
    <FormGroup
      label="Fullname"
      type="text"
      name="fullname"
      placeholder="e.g., Doe, John A."
      span="col-span-full"
      required
    />
    <FormGroup
      label="Document"
      type="select"
      :options="documentOptions"
      name="document"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Purpose"
      type="select"
      :options="purposeOptions"
      name="purpose"
      span="col-span-3"
      required
    />
  </div>
</template>

<script setup lang="ts">
import type { TOptions } from "~/types";

const documentOptions = ref<TOptions>();
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

onMounted(() => {
  useFetchOption("document/list").then((response) => {
    documentOptions.value = response;
  });
});
</script>
