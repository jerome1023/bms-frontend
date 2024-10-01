<template>
  <Modal :alert="alert">
    <Form
      @submit="submit"
      :initial-values="useModal.form.data"
      v-slot="{ isSubmitting }"
    >
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

const alert = ref<TAlert>({
  type: "info",
  title: "",
});

const useModal = useModalStore();
const useDataTable = useDataTableStore();
const route = useRoute();

const endpoint = ref();
const method = ref();

const getCurrentRoute = () => {
  let currentRoute = route.fullPath;
  return (currentRoute = currentRoute.startsWith("/")
    ? // ? currentRoute.split("/")[1]
      currentRoute.split("/")[1]
    : currentRoute);
};

const checkFormMode = () => {
  const mode = useModal.form.mode.toLowerCase();
  const id = useModal.form.data.id;
  let currentUrl = getCurrentRoute();
  const activeTab = useDataTable.activeTabManagement;

  if (useModal.open) {
    if (mode === "create") {
      endpoint.value = currentUrl + "/create";
    } else if (mode === "edit") {
      method.value = "PUT";
      endpoint.value =
        currentUrl === "management" && activeTab === 1
          ? `document/update/${id}`
          : currentUrl === "management" && activeTab === 2
          ? `sitio/update/${id}`
          : `${currentUrl}/update/${id}`;
    } else if (mode === "solve") {
      method.value = "PUT";
      endpoint.value = `${currentUrl}/solve/${id}`;
    }
  }
};

const newValuesFormat = (val: any) => {
  const mode = useModal.form.mode.toLowerCase();
  let currentUrl = getCurrentRoute();

  if (currentUrl === "barangay-official") {
    return {
      ...val,
      birthdate: dateFormatter(val.birthdate),
      start_term: dateFormatter(val.start_term),
      end_term: dateFormatter(val.end_term),
    };
  } else if (currentUrl === "announcement") {
    const { image_base64, image, ...rest } = val;

    let updatedImage = image_base64 || undefined;

    if (useModal.form.data.image === image) {
      updatedImage = image;
    }

    return {
      ...rest,
      image: updatedImage || undefined,
      when: dateTimeFormatter(val.when),
    };
  } else if (currentUrl === "blotter" && mode != "solve") {
    return {
      ...val,
      date: dateFormatter(val.date),
    };
  } else if (currentUrl === "resident") {
    return {
      ...val,
      birthdate: dateFormatter(val.birthdate),
    };
  }

  // console.log(currentUrl)
  return val;
};

const submit = async (values: any, actions: any) => {
  const newValues = newValuesFormat(values);
  checkFormMode();
  let currentUrl = getCurrentRoute();
  // return console.log(newValues)
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
    const activeTab = useDataTable.activeTabManagement;
    if (currentUrl == "management" && activeTab == 1) {
      currentUrl = "document";
    } else if (currentUrl == "management" && activeTab == 2) {
      currentUrl = "sitio";
    }

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
