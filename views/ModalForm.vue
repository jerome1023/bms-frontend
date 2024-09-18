<template>
  <Modal :alert="alert">
    <Form
      @submit="submit"
      :initial-values="useModal.form.data"
      v-slot="{ isSubmitting, values }"
    >
    <pre>{{ values }}</pre>
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
import type { TAlert } from "~/types";
import { useModalStore } from "~/stores/modal";
import { useDataTableStore } from "~/stores/datatable";
import { useRoute } from "vue-router";

const route = useRoute();
let currentUrl = route.fullPath;
currentUrl = currentUrl.startsWith("/") ? currentUrl.slice(1) : currentUrl;

const alert = ref<TAlert>({
  type: "info",
  title: "",
});

const useModal = useModalStore();
const useDataTable = useDataTableStore();

const endpoint = ref();
const method = ref();

const checkFormMode = () => {
  if (useModal.open) {
    const mode = useModal.form.mode.toLowerCase();
    if (mode === "create") {
      endpoint.value = currentUrl + "/create";
    } else if (mode === "edit") {
      const id = useModal.form.data.id;
      method.value = "PUT";
      endpoint.value = `${currentUrl}/update/${id}`;
    }
  }
};

const newValuesFormat = (val:any) => {
  if(currentUrl === 'barangay-official'){
    val.birthdate = dateFormatter(val.birthdate);
    val.start_term = dateFormatter(val.start_term);
    val.end_term = dateFormatter(val.end_term);
  }
  else if(currentUrl === 'announcement')
  {
    val.when = dateTimeFormatter(val.when);
    const { image_base64, image, ...rest } = val
    val = { image: image_base64, ...rest }
  }    
  return val
}

const submit = async (values: any, actions: any) => {
  const newValues = newValuesFormat(values)
  checkFormMode();
  const response = await useFormSubmit(endpoint.value, newValues, method.value);

  alert.value = {
    type: response.alert.type,
    title: response.alert.title,
  };

  if (response.status) {
    setTimeout(() => {
      closeModal();
    }, 1000);

    //add data to stores
    await useGetData(`${currentUrl}/list`).then((response) => {
      useDataTable.updateBody(response);
    });
  } else {
    actions.setErrors(response.errors);
  }
  method.value = null;
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
