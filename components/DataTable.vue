<template>
  <DataTable
    v-model:filters="filters"
    :value="useDataTable.tableContent.body"
    :paginator="useDataTable.tableContent.body.length > 5 ? true : false"
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
    <template
      v-if="!loading && useDataTable.tableContent.body.length > 5"
      #header
    >
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
          :value="
            slotProps.data.status.charAt(0).toUpperCase() +
            slotProps.data.status.slice(1)
          "
          :severity="getSeverity(slotProps.data)"
        />
      </template>
    </Column>
    <Column key="action" field="action">
      <template #body="{ data }">
        <div class="flex gap-1">
          <template
            v-for="(action, index) of useDataTable.tableContent.actions"
            :key="action + index"
          >
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
              v-if="action === 'solve' && data.status == 'unsolve'"
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
              @click="archive_status(data.id, action)"
              size="small"
              severity="danger"
              outlined
            >
              <FontAwesomeIcon :icon="faBoxArchive" />
            </Button>

            <Button
              v-if="action === 'delete'"
              v-tooltip.top="'Delete'"
              @click="remove(data.id)"
              size="small"
              severity="danger"
              outlined
            >
              <FontAwesomeIcon :icon="faTrashCan" />
            </Button>

            <Button
              v-if="action === 'approved'"
              v-tooltip.top="'Approved'"
              @click="approved(data.id)"
              size="small"
              severity="info"
              outlined
            >
              <FontAwesomeIcon :icon="faThumbsUp" />
            </Button>

            <Button
              v-if="action === 'disapproved'"
              v-tooltip.top="'Disapproved'"
              @click="disapproved(data.id)"
              size="small"
              severity="warning"
              outlined
            >
              <FontAwesomeIcon :icon="faThumbsDown" />
            </Button>

            <Button
              v-if="action === 'complete'"
              v-tooltip.top="'Complete'"
              @click="remove(data.id)"
              size="small"
              severity="success"
              outlined
            >
              <FontAwesomeIcon :icon="faCircleCheck" />
            </Button>

            <Button
              v-if="action === 'restore'"
              v-tooltip.top="'Restore'"
              @click="archive_status(data.id, action)"
              size="small"
              severity="info"
              outlined
            >
              <FontAwesomeIcon :icon="faRotateLeft" />
            </Button>
          </template>
        </div>
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import DataTable from "primevue/datatable";
import { FilterMatchMode } from "primevue/api";
import { useWindowSize } from "@vueuse/core";
import { useModalStore } from "~/stores/modal";
import { useDataTableStore } from "~/stores/datatable";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBoxArchive,
  faPencil,
  faHandshake,
  faTrashCan,
  faThumbsUp,
  faThumbsDown,
  faCircleCheck,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import type { TObjectLiteral } from "~/types";

const useModal = useModalStore();
const useDataTable = useDataTableStore();
const route = useRoute();
const confirm = useConfirm();
const toast = useToast();
const loading = ref(true);
const filters = ref();
const windowSize = useWindowSize();

let currentUrl = route.fullPath;
currentUrl = currentUrl.startsWith("/")
  ? currentUrl.slice(1).toLowerCase()
  : currentUrl.toLowerCase();

watch(
  () => useDataTable.tableContent,
  () => {
    loading.value = true;
    if (useDataTable.tableContent.title) {
      loading.value = false;
    }
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

const openModal = async (data: any) => {
  useModal.toggleModal(true);
  useModal.mountForm({
    mode: "Edit",
    title: `Edit ${useDataTable.tableContent.title}`,
    component: useGetCurrentForm(currentUrl),
    schema: {},
    data: data,
  });
};

const updateList = (id: string) => {
  useDataTable.updateBody(
    useDataTable.tableContent.body.filter((item) => item.id !== id)
  );
};

const routeList: TObjectLiteral<any> = {
  "resident/list": "resident",
  "request/pending": "request",
  "request/approved": "request",
  "request/disapproved": "request",
  "archive": () => {
    console.log(useDataTable.activeTabManagement)
  }
};

const confirmAction = (
  id: string,
  action: string,
  message: string,
  endpoint: string,
  acceptClass: string,
  body?: object
) => {
  confirm.require({
    message,
    header: "Confirmation",
    icon: "pi pi-info-circle",
    position: "top",
    rejectLabel: "Cancel",
    acceptLabel: "Proceed",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass,
    accept: async () => {
      if (action === "disapproved") {
        useModal.toggleModal(true);
        useModal.mountForm({
          mode: "Disapproved",
          title: "Disapproved Request",
          component: useGetCurrentForm(currentUrl),
          schema: {},
          data: { id: id },
        });
      } else if (action === "blotter") {
        useModal.toggleModal(true);
        useModal.mountForm({
          mode: "Solve",
          title: "Solve Blotter",
          component: useGetCurrentForm(`${currentUrl}/solve`),
          schema: {},
          data: { id: id },
        });
      }
      else {
        await useFormSubmit(endpoint, body ?? {}, "PUT").then(async (response) => {
          updateList(id);
          toast.add({
            severity: response.status ? "success" : "error",
            summary: response.status ? "Success" : "Error",
            detail: response.status ? response.message : "Something Went Wrong!",
            life: 3000,
          });
        });
      }
    },
  });
};

const solve = (id: string) => {
  confirmAction(
    id,
    "blotter",
    "Are you sure you want to solve this blotter?",
    "",
    "p-button-info"
  );
};

const approved = (id: string) => {
  confirmAction(
    id,
    "approved",
    "Are you sure you want to approve this request?",
    `request/update-status/${id}/approved`,
    "p-button-info"
  );
};

const disapproved = (id: string) => {
  confirmAction(
    id,
    "disapproved",
    "Are you sure you want to disapprove this request?",
    "",
    "p-button-warning"
  );
};

const archive_status = (id: string, action: string) => {
  const archivePageActiveTab : TObjectLiteral<string> = {
    0 : 'barangay-official',
    1 : 'resident',
    2 : 'request',
    3 : 'request',
    4 : 'transaction',
    5 : 'announcement',
    6 : 'blotter',
  }

  const url = action === 'archive' ? routeList[currentUrl] || currentUrl : archivePageActiveTab[useDataTable.activeTabManagement.toString()]
  confirmAction(
    id,
    action,
    `Are you sure you want to ${action} this record?`,
    `${url}/archive_status/${id}/${action == 'archive' ? true : false}`,
    "p-button-danger"
  );
};

const remove = (id: string) => {
  console.log(id);
};

const getSeverity: any = (data: any) => {
  switch (data.status) {
    case "solve":
    case "approved":
      return "success";

    case "unsolve":
    case "disapproved":
      return "danger";

    case "pending":
      return "warning";

    default:
      return null;
  }
};
</script>
