<template>
  <Field v-slot="{ value, handleChange }" :name="name">
    <div
      class="relative p-4 border border-dashed border-base-gray-300 flex flex-col justify-center items-center"
    >
      <!-- <span v-if="value" class="">{{ value.name }}</span> -->
      <span v-if="value" class="flex flex-col items-center">
        <img
          :src="base64"
          alt="Selected Image"
          class="w-32 h-32 object-cover mb-3"
        />
        <p class="mt-2">{{ value.name }}</p>
        <FontAwesomeIcon
        :icon="faXmark"
        @click="removeImage(handleChange)"
        class="absolute right-1 top-1 h-5 w-5"
      />
      </span>
      <span v-else class="flex flex-col gap-3 justify-center text-center">
        <p>Select File Here</p>
        <p class="text-sm text-base-gray font-light">
          Files Supported: jpg, jpeg or png
        </p>
        <Button @click="openFileInput" label="Choose File" severity="info" />
      </span>
      <input
        ref="fileInput"
        class="hidden"
        type="file"
        accept="image/*"
        @change="(e: Event) => createBase64(handleChange, e)"
      />
    </div>
  </Field>
  <Field :name="base64name" v-model:model-value="base64">
    <input type="text" class="hidden" :name="base64name" />
  </Field>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
const props = defineProps<{
  name: string;
}>();

import { ref } from "vue";
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

function removeImage(handleChange: Function) {
  // Reset the file input and base64 values
  if (fileInput.value) {
    fileInput.value.value = ""; // Clears the file input field
  }
  base64.value = null; // Clears the base64 data
//   handleChange({ target: { files: null } });
  handleChange(null);
   // Reset the form field value
}
</script>
