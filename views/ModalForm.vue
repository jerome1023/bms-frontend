<template>
  <Modal :alert="alert">
    <Form @submit="submit" :initial-values="useModal.form.data" v-slot="{ isSubmitting }">
      <h1 class="text-xl md:text-2xl font-semibold mb-5">
        {{ useModal.form.title }}
      </h1>
      <hr class="mb-5 text-base-green" />
      <KeepAlive>
        <component :is="useModal.form.component" />
      </KeepAlive>
      <hr class="mt-5 text-base-green" />
      <Alert
        v-if="alert.title"
        :type="alert.type"
        :title="alert.title"
        parent-class="col-span-full mt-5"
      />
      <div class="mt-5 flex gap-3 justify-end">
        <button @click="closeModal()" type="button" class="btn btn-gray">
          Cancel
        </button>
        <button
          :disabled="isSubmitting"
          :class="['btn', { 'opacity-90': isSubmitting }]"
        >
          <p v-if="isSubmitting">Saving...</p>
          <p v-else>Save</p>
        </button>
      </div>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import type { TAlert, TForm } from "~/types";
import { useModalStore } from "~/stores/modal";
import { useRoute } from "vue-router";

const route = useRoute();
let currentUrl = route.fullPath;
currentUrl = currentUrl.startsWith("/") ? currentUrl.slice(1) : currentUrl;

const useModal = useModalStore();

const endpoint = ref();
const method = ref()

const checkFormMode = () => {
  if (useModal.open) {
    const mode = useModal.form.mode.toLowerCase();
    if (mode === 'create') {
      endpoint.value = currentUrl + '/create';
    }
    else if(mode === 'edit'){
      const id = useModal.form.data.id;
      method.value = 'PUT'
      endpoint.value = `${currentUrl}/update/${id}`;
    }
  }
};

const alert = ref<TAlert>({
  type: "info",
  title: "",
});

const submit = async (values: any, actions: any) => {
  checkFormMode();
  await useFormSubmit(endpoint.value, values, method.value).then((response) => {
    alert.value = {
      type: response.alert.type,
      title: response.alert.title,
    };
    if (response.status) {
      method.value = null
      setTimeout(() => {
        closeModal();
      }, 1000);
    } else {
      actions.setErrors(response.errors);
    }
  });
};

const closeModal = () => {
  useModal.toggleModal(false);
};

watch(
  () => useModal.open,
  (newValue) => {
    if (!newValue) {
      setTimeout(() => {
        useModal.resetFormData();
        alert.value = {
          type: "info",
          title: "",
        };
      }, 200);
    }
  }
);
</script>
