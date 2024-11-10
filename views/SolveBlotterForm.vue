<template>
  <div class="sm:grid grid-cols-6 gap-x-3">
    <FormGroup
      label="Namagitan"
      type="select"
      name="namagitan"
      :options="officialOPtions"
      span="col-span-full"
    />
    <FormGroup
      label="Agreement"
      type="textarea"
      name="agreement"
      span="col-span-full"
    />
    <FormGroup
      label="Witness"
      type="textarea"
      name="witness"
      span="col-span-full"
    />
  </div>
</template>

<script setup lang="ts">
import type { TOptions } from "~/types";

const officialOPtions = ref<TOptions>();

onMounted(() => {
  useFetchOption("barangay-official/list").then((response) => {
    officialOPtions.value = response;
  });
});
</script>
