<template>
  <DataTable
    :value="table.body"
    paginator
    removableSort
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="{first} to {last} of {totalRecords}"
    dataKey="id"
  >
  <!-- {{ table.body }} -->
    <!-- <Column rowReorder headerStyle="width: 3rem" :reorderableColumn="false" /> -->
    <Column
      v-for="col of table.columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      sortable
    ></Column>
    <Column>
      <template #body="{data}">
        <Button @click="openModal(data.id)" icon="pi pi-pencil"  size="small" severity="success" rounded outlined />
      </template>
    </Column>

  </DataTable>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable from "primevue/datatable";
import { useModalStore } from "~/stores/modal";
import type { TForm } from "~/types";
import { OfficialForm } from "#components";


const route = useRoute();
let currentUrl = route.fullPath;
currentUrl = currentUrl.startsWith("/") ? currentUrl.slice(1) : currentUrl;

const useModal = useModalStore();

const props = defineProps<{
    table :any
}>()

// onMounted(() => {
//   // loading.value = true;

//   lazyParams.value = {
//     first: 0,
//     rows: 10,
//     sortField: null,
//     sortOrder: null,
//   };
//   // loading.value = props.table.body.length > 0 ? false : true
// });
// const loading = ref(false)
// const lazyParams = ref({});

const openModal = async (id:string) => {
  await useGetData(`${currentUrl}/view/${id}`).then((response) => {
    console.log(response);
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