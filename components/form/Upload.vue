<template>
  <Field v-slot="{ value, handleChange }" :name="name">
    <div
      class="relative p-4 border border-dashed border-base-gray-300 flex flex-col justify-center items-center"
    >
      <span v-if="base64" class="flex flex-col items-center">
        <img
          :src="base64"
          alt="Selected Image"
          class="max-w-md max-h-40 object-scale-down mb-3"
        />
        <p class="mt-2">{{ value.name }}</p>
        <i
          @click="removeFile(handleChange)"
          class="pi pi-times-circle absolute right-2 top-2 text-error-400"
          v-tooltip.top="'Remove File'"
        />
      </span>
      <span v-else class="flex flex-col gap-3 justify-center text-center">
        <p>Select File Here</p>
        <p class="text-sm text-base-gray font-light">
          Files Supported: jpg, jpeg or png
        </p>
        <Button
          icon="pi pi-upload"
          @click="openFileInput"
          label="Choose File"
          severity="info"
          size="small"
          class="m-auto"
        />
      </span>
      <input
        ref="fileInput"
        class="hidden"
        type="file"
        accept=".jpg,.jpeg,.png,.gif"
        @change="(e: Event) => createBase64(handleChange, e)"
      />
    </div>
  </Field>
  <Field :name="base64name" v-model:model-value="base64">
    <input type="text" class="hidden" :name="base64name" />
  </Field>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  name: string;
}>();

const fileInput = ref<HTMLInputElement | null>(null);

const openFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const base64name = computed(() => `${props.name}_base64`);
const base64 = ref();

function createBase64(handleChange: Function, e: Event) {
  let files = (e.target as HTMLInputElement).files;

  if (files) {
    const reader = new FileReader();
    reader.onload = (event) => {
      base64.value = event.target?.result as string;
    };
    reader.readAsDataURL(files[0]);
  } else {
    base64.value = "";
  }
  handleChange(e);
}

function removeFile(handleChange: Function) {
  if (fileInput.value) {
    fileInput.value.value = "";
  }
  base64.value = null;
  handleChange(null);
}
</script>
