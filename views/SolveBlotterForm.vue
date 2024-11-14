<template>
  <div class="sm:grid grid-cols-6 gap-x-3">
    <FormGroup
      v-if="isNotViewMode"
      label="Namagitan"
      type="select"
      name="namagitan"
      :options="officialOPtions"
      span="col-span-full"
    />
    <FormGroup
      v-else
      label="Namagitan"
      type="readonly"
      name="namagitan_name"
      span="col-span-full"
    />
    <FormGroup
      label="Agreement"
      :type="isNotViewMode ? 'textarea' : 'readonly'"
      name="agreement"
      span="col-span-full"
    />
    <FormGroup
      label="Witness"
      :type="isNotViewMode ? 'textarea' : 'readonly'"
      name="witness"
      span="col-span-full"
    />
  </div>
</template>

<script setup lang="ts">
import type { TOptions } from "~/types";

const officialOPtions = ref<TOptions>();
const useModal = useModalStore();

const isNotViewMode = useModal.form.mode != "View";

onMounted(() => {
  if (isNotViewMode)
    useFetchOption("barangay-official/list").then((response) => {
      officialOPtions.value = response;
    });
});
</script>
