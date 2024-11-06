<template>
  <div class="sm:grid grid-cols-6 gap-x-3">
    <div
      v-if="useModal.form.mode === 'Edit' && !open && image"
      class="col-span-full flex flex-col justify-center gap-3 mb-3"
    >
      <!-- <img
        :src="image"
        class="max-w-[18rem] max-h-60 md:max-w-lg md:max-h-64 m-auto object-scale-down"
      /> -->
      <div class="flex justify-center m-auto">
            <Image
              :src="image"
              imageClass="max-w-[18rem] max-h-60 md:max-w-lg md:max-h-64 object-scale-down"
              preview
            />
          </div>
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
      label="Upload Image"
      type="image"
      name="image"
      span="col-span-full"
      :class="[
        open || useModal.form.mode === 'Create' || !image ? 'block' : 'hidden',
      ]"
    />
    <FormGroup
      label="What"
      type="text"
      name="what"
      span="col-span-3"
      required
    />
    <FormGroup
      label="Where"
      type="text"
      name="where"
      span="col-span-3"
      required
    />
    <FormGroup label="Who" type="text" name="who" span="col-span-3" required />
    <FormGroup
      label="When"
      type="date"
      name="when"
      span="col-span-3"
      required
    />
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
  fieldValue.value = null;
  open.value = !open.value;
};
</script>
