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
      <component :is="useModal.form.component" />
      <hr class="mt-5 text-base-green" />
      <Alert
        v-if="alert.title"
        :type="alert.type"
        :title="alert.title"
        parent-class="col-span-full mt-5"
      />
      <div class="mt-5 flex gap-3 justify-end">
        <Button
          :label="useModal.form.mode == 'View' ? 'Close' : 'Cancel'"
          size="small"
          severity="secondary"
          @click="closeModal()"
        />
        <Button
          v-if="useModal.form.mode != 'View'"
          type="submit"
          :loading="isSubmitting"
          label="Save"
          size="small"
          class="bg-base-green hover:bg-green-700"
        />
      </div>
    </Form>
  </Modal>
</template>

<script setup lang="ts">
import type { TAlert, TObjectLiteral } from "~/types";
import { useRoute } from "vue-router";

const alert = ref<TAlert>({
  type: "info",
  title: "",
});

const useModal = useModalStore();
const useDataTable = useDataTableStore();
const route = useRoute();

const getCurrentRoute = () => {
  let currentRoute = route.fullPath;
  return (currentRoute = currentRoute.startsWith("/")
    ? currentRoute.slice(1).toLowerCase()
    : currentRoute);
};

const getListEndpoint = (currentUrl: string, activeTab: number) => {
  const endpointMap:TObjectLiteral<string> = {
    management: activeTab === 1 ? "document/list" : activeTab === 2 ? "sitio/list" : "",
    "resident/list": "resident/list",
    "resident/manage-account": "users/list",
    "request/pending": "request/list/pending",
  };
  return endpointMap[currentUrl] || `${currentUrl}/list`;
};

const submit = async (values: Record<string, any>, actions: any) => {
  let currentUrl = getCurrentRoute();
  const mode = useModal.form.mode.toLowerCase();
  const activeTab = useDataTable.activeTabManagement as number;
  const newValues = useNewValueFormat(values, currentUrl, mode);

  const submissionDetails = useGetSubmissionDetails(
    currentUrl,
    mode,
    activeTab
  );

  if (submissionDetails) {
    const response = await useFormSubmit(
      submissionDetails.endpoint,
      newValues,
      submissionDetails.method
    );

    alert.value = {
      type: response.alert.type,
      title: response.alert.title,
    };

    if (response.status) {
      //add data to stores
      currentUrl = getListEndpoint(currentUrl, activeTab);
      await useGetData(currentUrl).then((response) => {
        useDataTable.updateBody(response);
        closeModal();
      });
    } else {
      response.errors ? actions.setErrors(response.errors) : null;
    }
  }
};

const resetAlert = () => {
  alert.value = { type: "info", title: "" };
};

const closeModal = () => {
  useModal.toggleModal(false);
  resetAlert();
};

watch(
  () => useModal.open,
  (newValue) => {
    if (!newValue) {
      setTimeout(() => {
        useModal.resetFormData();
      }, 200);
    }
  }
);
</script>
