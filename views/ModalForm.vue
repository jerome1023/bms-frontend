<template>
  <Modal :alert="alert">
    <Form @submit="submit" v-slot="{ isSubmitting }">
      <h1 class="text-xl md:text-2xl font-semibold mb-5">{{ form.title }}</h1>
      <hr class="mb-5 text-base-green" />
      <KeepAlive>
        <component :is="form.component" />
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

const useModal = useModalStore();

defineProps<{
  form: TForm;
}>();

const alert = ref<TAlert>({
  type: "info",
  title: "",
});

const submit = async (values: any, actions: any) => {
  await useFormSubmit("official/create", values).then((response) => {
    alert.value = {
      type: response.alert.type,
      title: response.alert.title,
    };
    if (response.status) {
      setInterval(() => {
        closeModal();
      }, 2000);
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
      alert.value = {
        type: "info",
        title: "",
      };
    }
  }
);
</script>
