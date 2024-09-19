<template>
  <div class="sm:grid grid-cols-6 gap-x-3">
    <div
      v-if="useModal.form.mode === 'Edit' && !open"
      class="col-span-full flex flex-col justify-center gap-3 mb-3"
    >
      <img :src="image" class="w-60 md:w-64 m-auto" />
      <Button
        @click="openImageUploader"
        icon="pi pi-upload"
        label="Upload New Photo"
        severity="info"
        size="small"
        class="m-auto"
      />
    </div>
    <FormGroup
      v-if="open || useModal.form.mode === 'Create'"
      label="Image"
      type="image"
      name="image"
      span="col-span-full"
    />
    <FormGroup label="What" type="text" name="what" span="col-span-3" />
    <FormGroup label="Where" type="text" name="where" span="col-span-3" />
    <FormGroup label="Who" type="text" name="who" span="col-span-3" />
    <FormGroup label="When" type="date" name="when" span="col-span-3" />
    <FormGroup
      label="Details"
      type="textarea"
      name="details"
      span="col-span-full"
    />
  </div>
</template>

<script setup lang="ts">
import { useModalStore } from "~/stores/modal";
const useModal = useModalStore();

const { value: fieldValue } = useField("image");
const config = useRuntimeConfig();
const baseURL = config.public.backendURL;

const open = ref(false);
const image = ref();

onMounted(() => {
  if (fieldValue.value) {
    image.value = baseURL + fieldValue.value;
  }
});

const openImageUploader = () => {
  open.value = !open.value;
};
</script>
