<template>
  <TabView v-if="isReady" v-model:activeIndex="active">
    <TabPanel v-for="(tab, index) in tabs" :key="tab.title" :header="tab.title">
      <Form
        @submit="submit"
        :initial-values="initialValues[index]"
        v-slot="{ isSubmitting, values }"
      >
        <pre>{{ values }}</pre>
        <Fieldset v-if="tab.fieldname" :legend="tab.fieldname">
          <div class="text-right">
            <div class="sm:grid grid-cols-6 gap-x-3">
              <component :is="tab.form" />
            </div>
            <Button
              :loading="isSubmitting"
              label="Add"
              severity="contrast"
              outlined
              type="submit"
            />
          </div>
        </Fieldset>
        <template v-else>
          <div class="text-right">
            <component :is="tab.form" />
            <Button
              :loading="isSubmitting"
              label="Save"
              severity="contrast"
              outlined
              type="submit"
            />
          </div>
        </template>
      </Form>
      <Divider />
      <DataTable v-if="index != 0" />
    </TabPanel>
  </TabView>
</template>

<script setup lang="ts">
import { BarangayDetailsForm, DocumentForm, SitioForm } from "#components";
import { useBarangayDetailStore } from "~/stores/details";

const useDataTable = useDataTableStore();
const useBarangayDetail = useBarangayDetailStore();

const active = ref(0);
const document = ref();
const sitio = ref();
const initialValues = ref<any>({
  0 : useBarangayDetail.data,
  1 : {},
  2 : {}
})
const isReady = ref(false)

const tabs = ref([
  { title: "Barangay Details", form: BarangayDetailsForm },
  { title: "Document", fieldname: "Add Document", form: DocumentForm },
  { title: "Sitio", fieldname: "Add Sitio", form: SitioForm },
]);

watch(active, () => {
  if (active.value === 1) {
    useDataTable.storeTableContent(document.value);
  } else if (active.value === 2) {
    useDataTable.storeTableContent(sitio.value);
  } else {
    useDataTable.reset();
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
  isReady.value = true
});

const submit = async(values: any) => {
  const { image_base64, logo_base64, ...rest } = values
  const newVal = { image: image_base64, logo: logo_base64, rest }
  await useFormSubmit(`barangay_details/update/${useBarangayDetail.data.id}`, newVal, 'PUT');
  console.log(newVal)
};
</script>
