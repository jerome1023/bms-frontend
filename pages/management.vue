<template>
  <TabView v-model:activeIndex="active">
    <TabPanel v-for="(tab, index) in tabs" :key="tab.title" :header="tab.title">
      <Form
        @submit="submit"
        :initial-values="formData.initialValues[index]"
        v-slot="{ isSubmitting }"
      >
        <Fieldset v-if="tab.fieldname" :legend="tab.fieldname">
          <div class="flex flex-col">
            <component :is="tab.form" />
            <Button
              :loading="isSubmitting"
              label="Add"
              severity="success"
              outlined
              type="submit"
              class="self-end"
            />
          </div>
        </Fieldset>
        <template v-else>
          <div class="flex flex-col">
            <component :is="tab.form" />
            <Button
              :loading="isSubmitting"
              label="Save"
              severity="success"
              outlined
              type="submit"
              class="self-end"
            />
          </div>
        </template>
      </Form>
      <Divider />
      <DataTable v-if="index != 0" />
    </TabPanel>
  </TabView>
  <ModalForm />
</template>

<script setup lang="ts">
import { BarangayDetailsForm, DocumentForm, SitioForm } from "#components";
import { useBarangayDetailStore } from "~/stores/details";
import type { TObjectLiteral, TTableContent } from "~/types";

const useDataTable = useDataTableStore();
const useBarangayDetail = useBarangayDetailStore();
const toast = useToast();

const active = ref(0);

const formData = reactive({
  initialValues: {
    0: useBarangayDetail.data,
    1: {},
    2: {},
  } as TObjectLiteral,
});

const tabs = [
  { title: "Barangay Details", form: BarangayDetailsForm },
  { title: "Document", fieldname: "Add Document", form: DocumentForm },
  { title: "Sitio", fieldname: "Add Sitio", form: SitioForm },
];

watch(active, async (newValue) => {
  useDataTable.reset();
  useManagementList('management', newValue)
  useDataTable.updateActiveTab(newValue);
});

const notification = (message: string) => {
  toast.add({
    severity: "success",
    summary: "Success",
    detail: message,
    life: 3000,
  });
};

const notificationMessages: TObjectLiteral = {
  success: {
    0: "Barangay details updated successfully",
    1: "Document added successfully",
    2: "Sitio added successfully",
  },
};

const submit = async (values: any, actions: any) => {
  const { endpoint, method, updatedValues } = useManagementSubmissionDetails(
    values,
    active.value
  );
  await useFormSubmit(endpoint, updatedValues, method).then(
    async (response) => {
      if (response.status) {
        notification(notificationMessages.success[active.value]);
        if (active.value === 0) {
          useBarangayDetail.mountDetails();
        } else {
          await useGetData(
            active.value === 1 ? "document/list" : "sitio/list"
          ).then((response) => {
            useDataTable.updateBody(response);
            actions.resetForm();
          });
        }
      } else {
        actions.setErrors(response.errors);
      }
    }
  );
};
</script>
