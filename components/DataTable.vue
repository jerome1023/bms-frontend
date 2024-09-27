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
      <template v-if="col.field == 'status'" #body="slotProps">
        <Tag
          :value="slotProps.data.status"
          :severity="getSeverity(slotProps.data)"
        />
      </template>
    </Column>
    <Column key="action" field="action">
      <template #body="{ data }">
        <div class="flex gap-1">
          <template v-for="action of useDataTable.tableContent.actions">
            <Button
              v-if="action === 'edit'"
              v-tooltip.top="'Edit'"
              @click="openModal(data)"
              size="small"
              severity="success"
              outlined
            >
              <FontAwesomeIcon :icon="faPencil" />
            </Button>

            <Button
              v-if="action === 'solve' && data.status == 'Unsolve'"
              v-tooltip.top="'Solve'"
              @click="solve(data.id)"
              size="small"
              severity="info"
              outlined
            >
              <FontAwesomeIcon :icon="faHandshake" />
            </Button>

            <Button
              v-if="action === 'archive'"
              v-tooltip.top="'Archive'"
              @click="archive(data.id)"
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
import {
  OfficialForm,
  AnnouncementForm,
  BlotterForm,
  SolveBlotterForm,
} from "#components";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBoxArchive,
  faPencil,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
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
currentUrl = currentUrl.startsWith("/")
  ? currentUrl.slice(1).toLowerCase()
  : currentUrl.toLowerCase();

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
  if (currentUrl === "barangay-official") {
    currentForm.value = OfficialForm;
  } else if (currentUrl === "announcement") {
    currentForm.value = AnnouncementForm;
  } else if (currentUrl === "blotter") {
    currentForm.value = BlotterForm;
  }
};

// const openModal = async (id: string) => {
//   await useGetData(`${currentUrl}/view/${id}`).then((response) => {
//     useModal.toggleModal(true);
//     editForm();
//     useModal.mountForm({
//       mode: "Edit",
//       title: "Edit Information",
//       component: currentForm.value,
//       schema: {},
//       data: response,
//     });
//   });
// };

const openModal = async (data: any) => {
  useModal.toggleModal(true);
  editForm();
  useModal.mountForm({
    mode: "Edit",
    title: "Edit Information",
    component: currentForm.value,
    schema: {},
    data: data,
  });
};

const solve = (id: string) => {
  useModal.toggleModal(true);
  useModal.mountForm({
    mode: "Solve",
    title: "Solve Blotter",
    component: SolveBlotterForm,
    schema: {},
    data: { id: id },
  });
};

const archive = (id: string) => {
  confirm.require({
    message: "Do you want to archive this record?",
    header: "Confirmation",
    icon: "pi pi-info-circle",
    position: "top",
    rejectLabel: "Cancel",
    acceptLabel: "Delete",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: "p-button-danger",
    accept: async () => {
      useDataTable.updateBody(useDataTable.tableContent.body.filter(item => item.id !== id));
      await useFormSubmit(
        `${currentUrl}/archive/${id}`,
        { archive_status: true },
        "PUT"
      ).then(async (response) => {
        // if (response.status) {
        //   useDataTable.updateBody(useDataTable.tableContent.body.filter(item => item.id !== id));
        //   // console.log(useDataTable.tableContent.body)
        //   // await useGetData(`${currentUrl}/list`).then((response) => {
        //   //   useDataTable.updateBody(response);
        //     toast.add({
        //       severity: "info",
        //       summary: "Confirmed",
        //       detail: "Record archive successfully",
        //       life: 3000,
        //     });
        //   // });
        // } 
        if(!response.status) {
          toast.add({
            severity: "error",
            summary: "Danger",
            detail: "Something Went Happen!",
            life: 3000,
          });
        }
      });
    },
    // reject: () => {
    //     toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    // }
  });
};

const getSeverity = (data: any) => {
  switch (data.status) {
    case "Solve":
      return "success";

    case "Unsolve":
      return "danger";

    default:
      return null;
  }
};
</script>
