<template>
  <TabView v-if="isReady" v-model:activeIndex="active">
    <TabPanel v-for="(tab, index) in tabs" :key="tab.title" :header="tab.title">
      <Form
        @submit="submit"
        :initial-values="initialValues[index]"
        v-slot="{ isSubmitting, values }"
      >
        <!-- <pre>{{ values }}</pre> -->
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

const useDataTable = useDataTableStore();
const useBarangayDetail = useBarangayDetailStore();
const toast = useToast();

const active = ref(0);
const document = ref();
const sitio = ref();
const initialValues = ref<any>({
  0: useBarangayDetail.data,
  1: {},
  2: {},
});
const isReady = ref(false);
const endpoint = ref();
const method = ref();

const tabs = ref([
  { title: "Barangay Details", form: BarangayDetailsForm },
  { title: "Document", fieldname: "Add Document", form: DocumentForm },
  { title: "Sitio", fieldname: "Add Sitio", form: SitioForm },
]);

watch(active, (newValue) => {
  if (active.value === 1) {
    useDataTable.storeTableContent(document.value);
    useDataTable.updateActiveTab(newValue)
  } else if (active.value === 2) {
    useDataTable.storeTableContent(sitio.value);
    useDataTable.updateActiveTab(newValue)
  } else {
    useDataTable.reset();
    useDataTable.updateActiveTab(newValue)
  }
});

onMounted(async () => {
  useGetData("document/list").then((response) => {
    document.value = {
      title: "Document",
      columns: [
        { field: "name", header: "Name" },
        { field: "price", header: "Price" },
      ],
      actions: ["edit", "delete"],
      body: response ?? [],
    };
  });

  useGetData("sitio/list").then((response) => {
    sitio.value = {
      title: "Sitio",
      columns: [{ field: "name", header: "Name" }],
      actions: ["edit", "delete"],
      body: response ?? [],
    };
  });
  isReady.value = true;
});

const newValuesFormat = (val: any) => {
  if (active.value == 0) {
    endpoint.value = `barangay_details/update/${useBarangayDetail.data.id}`;
    method.value = "PUT";
    const { image, image_base64, logo, logo_base64, ...rest } = val;
    let updatedImage = image_base64 || undefined;
    let updatedLogo = logo_base64 || undefined;

    if (useBarangayDetail.data.image == image) {
      updatedImage = image;
    }

    if (useBarangayDetail.data.logo == logo) {
      updatedLogo = logo;
    }

    return { ...rest, image: updatedImage, logo: updatedLogo };
  } else if (active.value == 1) {
    endpoint.value = `document/create`;
  } else if (active.value == 2) {
    endpoint.value = `sitio/create`;
  }
  return val;
};

const notification = (message: string) => {
  toast.add({
    severity: "success",
    summary: "Success",
    detail: message,
    life: 3000,
  });
};

const submit = async (values: any, actions: any) => {
  const newValues = newValuesFormat(values);
  await useFormSubmit(endpoint.value, newValues, method.value).then(
    async (response) => {
      if (response.status) {
        if (active.value === 0) {
          // window.location.reload();
          notification("Barangay details updated successfully");
          useBarangayDetail.mountDetails();
        } else if (active.value === 1) {
          // console.log(values);
          await useGetData("document/list").then((response) => {
            useDataTable.updateBody(response);
            actions.resetForm();
            notification("Document added successfully");
          });
        } else if (active.value === 2) {
          // console.log(values);
          await useGetData("sitio/list").then((response) => {
            useDataTable.updateBody(response);
            actions.resetForm();
            notification("Sitio added successfully");
          });
        }
      } else {
        actions.setErrors(response.errors);
      }
    }
  );
  method.value = null;
};
</script>
