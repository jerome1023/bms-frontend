<template>
  <DataTable
    v-model:filters="filters"
    :value="useDataTable.tableContent.body"
    paginator
    removableSort
    :rows="10"
    :rowsPerPageOptions="[5, 10, 20, 50]"
    :paginatorTemplate="{
      '640px':
        'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
      default:
        'RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
    }"
    :currentPageReportTemplate="currentPageReportTemplate"
    dataKey="id"
    :loading="loading"
  >
    <!-- paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    currentPageReportTemplate="{first} to {last} of {totalRecords}" -->
    <template v-if="!loading" #header>
      <div class="flex justify-end items-center gap-2 -mx-4">
        <Button
          class="hidden md:block"
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          size="small"
          outlined
          @click="clearFilter()"
        />
        <span class="relative w-full md:w-auto">
          <i
            class="pi pi-search absolute top-2/4 -mt-2 left-3 text-surface-400 dark:text-surface-600"
          />
          <InputText
            v-model="filters['global'].value"
            placeholder="Keyword Search"
            class="pl-10 font-normal w-full rounded-md"
            size="small"
          />
        </span>
      </div>
    </template>
    <template v-if="!loading" #empty> No record found. </template>
    <Column
      v-for="col of useDataTable.tableContent.columns"
      :key="col.field"
      :field="col.field"
      :header="col.header"
      sortable
    >
    </Column>
    <Column key="action" field="action">
      <template #body="{ data }">
        <div class="flex gap-1">
          <template v-for="action of useDataTable.tableContent.actions">
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
              v-if="action === 'solve'"
              v-tooltip.top="'Solve'"
              @click="solve()"
              size="small"
              severity="info"
              outlined
            >
              <FontAwesomeIcon :icon="faHandshake" />
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
  <Toast class="w-auto" />
  <ConfirmDialog></ConfirmDialog>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import { FilterMatchMode } from "primevue/api";
import { useWindowSize } from "@vueuse/core";
import { useModalStore } from "~/stores/modal";
import { useDataTableStore } from "~/stores/datatable";
import { OfficialForm, AnnouncementForm, BlotterForm } from "#components";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faBoxArchive, faPencil, faHandshake } from "@fortawesome/free-solid-svg-icons";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

const useModal = useModalStore();
const useDataTable = useDataTableStore();
const route = useRoute();
const confirm = useConfirm();
const toast = useToast();
const loading = ref(true);
const filters = ref();
const windowSize = useWindowSize();
const currentForm = ref();

let currentUrl = route.fullPath;
currentUrl = currentUrl.startsWith("/") ? currentUrl.slice(1) : currentUrl;

watch(
  () => useDataTable.tableContent,
  () => {
    loading.value = false; // Set loading to false when data is available
  }
);

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  };
};

initFilters();

const clearFilter = () => {
  initFilters();
};

const currentPageReportTemplate = computed(() => {
  return windowSize.width.value < 640
    ? "{currentPage}"
    : "Showing {first} to {last} of {totalRecords}";
});

const editForm = () => {
  if (currentUrl.toLowerCase() === "barangay-official") {
    currentForm.value = OfficialForm;
  } else if (currentUrl.toLowerCase() === "announcement") {
    currentForm.value = AnnouncementForm;
  } else if (currentUrl.toLowerCase() === "blotter") {
    currentForm.value = BlotterForm;
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

const archive = () => {
  confirm.require({
    message: "Do you want to archive this record?",
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
        detail: "Record archive successfully",
        life: 3000,
      });
    },
    // reject: () => {
    //     toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    // }
  });
};
</script>
