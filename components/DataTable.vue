<template>
  <DataTable
    :value="useDataTable.tableContent.body"
    paginator
    removableSort
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="{first} to {last} of {totalRecords}"
    dataKey="id"
    :loading="loading"
  >
  <!-- {{ table.body }} -->
    <!-- <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" /> -->
    <Column
      v-for="col of useDataTable.tableContent.columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      sortable
    >

  </Column>
    <Column>
      <template #body="{data}">
        <Button @click="openModal(data.id)" icon="pi pi-pencil"  size="small" severity="success" rounded outlined />
        
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import { useModalStore } from "~/stores/modal";
import { useDataTableStore } from "~/stores/datatable";
import { OfficialForm } from "#components";

const useModal = useModalStore();
const useDataTable = useDataTableStore();

const route = useRoute();
let currentUrl = route.fullPath;
currentUrl = currentUrl.startsWith("/") ? currentUrl.slice(1) : currentUrl;


const loading = ref(true)

watch(
  () => useDataTable.tableContent,
  () => {
   
    // if (newValue.body.length != 0) {
      console.log('here')
      loading.value = false; // Set loading to false when data is available
    // }
  }, // Executes the watch immediately to check for data initially
);

const openModal = async (id:string) => {
  await useGetData(`${currentUrl}/view/${id}`).then((response) => {
    useModal.toggleModal(true);
    useModal.mountForm({
        mode: "Edit",
        title: "Edit Information",
        component: OfficialForm,
        schema: {},
        data: response
      });
  });
};

</script>