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
    <template v-if="!loading" #empty> No record found. </template>
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
    <Column key="action" field="action" header="Action" >
      <template #body="{ data }">
        <div class="flex gap-1">
          <template
            v-for="action of useDataTable.tableContent.actions"
          >
            <Button
              v-if="action === 'edit'"
              v-tooltip.top="'Edit'"
              @click="openModal(data.id)"
              size="small"
              severity="success"
              outlined
            >
              <FontAwesomeIcon :icon="faPencil" />
            </Button>
  
            <Button
              v-if="action === 'archive'"
              v-tooltip.top="'Archive'"
              @click="archive()"
              size="small"
              severity="danger"
              outlined
            >
              <FontAwesomeIcon :icon="faBoxArchive" />
            </Button>
          </template>
        </div>
      </template>
    </Column>
  </DataTable>
  <Toast class="w-auto"/>
  <ConfirmDialog></ConfirmDialog>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import { useModalStore } from "~/stores/modal";
import { useDataTableStore } from "~/stores/datatable";
import { OfficialForm, AnnouncementForm } from "#components";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBoxArchive, faPencil } from "@fortawesome/free-solid-svg-icons";

const useModal = useModalStore();
const useDataTable = useDataTableStore();

const route = useRoute();
let currentUrl = route.fullPath;
currentUrl = currentUrl.startsWith("/") ? currentUrl.slice(1) : currentUrl;

const loading = ref(true);

watch(
  () => useDataTable.tableContent,
  () => {
    loading.value = false; // Set loading to false when data is available
  }
);

const currentForm = ref();
const editForm = () => {
  if (currentUrl.toLowerCase() === "barangay-official") {
    currentForm.value = OfficialForm;
  } else if (currentUrl.toLowerCase() === "announcement") {
    currentForm.value = AnnouncementForm;
  }
};

const openModal = async (id: string) => {
  await useGetData(`${currentUrl}/view/${id}`).then((response) => {
    useModal.toggleModal(true);
    editForm();
    useModal.mountForm({
      mode: "Edit",
      title: "Edit Information",
      component: currentForm.value,
      schema: {},
      data: response,
    });
  });
};

import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const confirm = useConfirm();
const toast = useToast();

const archive = () => {
  confirm.require({
    message: "Do you want to delete this record?",
    header: "Confirmation",
    icon: "pi pi-info-circle",
    position: "top",
    rejectLabel: "Cancel",
    acceptLabel: "Delete",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "p-button-danger",
    accept: () => {
      toast.add({
        severity: "info",
        summary: "Confirmed",
        detail: "Record deleted successfully",
        life: 3000,
      });
    },
    // reject: () => {
    //     toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    // }
  });
};
</script>
