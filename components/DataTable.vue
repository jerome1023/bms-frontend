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
              @click="actionButton(data.id, action)"
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
              @click="actionButton(data.id, action)"
              size="small"
              severity="danger"
              outlined
            >
              <FontAwesomeIcon :icon="faTrashCan" />
            </Button>

            <Button
              v-if="action === 'approved'"
              v-tooltip.top="'Approved'"
              @click="actionButton(data.id, action)"
              size="small"
              severity="info"
              outlined
            >
              <FontAwesomeIcon :icon="faThumbsUp" />
            </Button>

            <Button
              v-if="action === 'disapproved'"
              v-tooltip.top="'Disapproved'"
              @click="actionButton(data.id, action)"
              size="small"
              severity="warning"
              outlined
            >
              <FontAwesomeIcon :icon="faThumbsDown" />
            </Button>

            <Button
              v-if="action === 'complete'"
              v-tooltip.top="'Complete'"
              @click="actionButton(data.id, action)"
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

const routeList: TObjectLiteral = {
  "resident/list": "resident",
  "request/pending": "request",
  "request/approved": "request",
  "request/disapproved": "request",
};

const confirmAction = (details: TObjectLiteral) => {
  confirm.require({
    message: details.message,
    header: "Confirmation",
    icon: "pi pi-info-circle",
    position: "top",
    rejectLabel: "Cancel",
    acceptLabel: "Proceed",
    rejectClass: "p-button-secondary p-button-outlined",
    acceptClass: details.acceptClass,
    accept: async () => {
      // if (details.action === "disapproved") {
      //   useModal.toggleModal(true);
      //   useModal.mountForm({
      //     mode: "Disapproved",
      //     title: "Disapproved Request",
      //     component: useGetCurrentForm(currentUrl),
      //     schema: {},
      //     data: { id: details.id },
      //   });
      // } else if (details.action === "blotter") {
      //   useModal.toggleModal(true);
      //   useModal.mountForm({
      //     mode: "Solve",
      //     title: "Solve Blotter",
      //     component: useGetCurrentForm(`${currentUrl}/solve`),
      //     schema: {},
      //     data: { id: details.id },
      //   });
      // }

      if (["disapproved", "blotter"].includes(details.action)) {
        const modalConfig: TObjectLiteral = {
          disapproved: {
            mode: "Disapproved",
            title: "Disapproved Request",
            component: useGetCurrentForm(currentUrl),
            schema: {},
          },
          blotter: {
            mode: "Solve",
            title: "Solve Blotter",
            component: useGetCurrentForm(`${currentUrl}/solve`),
            schema: {},
          },
        };

        useModal.toggleModal(true);
        useModal.mountForm({
          ...modalConfig[details.action],
          data: { id: details.id },
        });
      } else {
        await useFormSubmit(
          details.endpoint,
          details.body ?? {},
          details.method ?? "PUT"
        ).then(async (response) => {
          updateList(details.id);
          toast.add({
            severity: response.status ? "success" : "error",
            summary: response.status ? "Success" : "Error",
            detail: response.status
              ? response.message
              : "Something Went Wrong!",
            life: 3000,
          });
        });
      }
    },
  });
};

const archivePageActiveTab: TObjectLiteral<string> = {
  0: "barangay-official",
  1: "resident",
  2: "request",
  3: "request",
  4: "transaction",
  5: "announcement",
  6: "blotter",
};

const actionButton = (id: string, action: string) => {
  const details: TObjectLiteral = {
    solve: {
      id: id,
      action: "blotter",
      message: "Are you sure you want to solve this blotter?",
      acceptClass: "p-button-info",
    },
    approved: {
      id: id,
      action: "approved",
      message: "Are you sure you want to approve this request?",
      endpoint: `request/update-status/${id}/approved`,
      acceptClass: "p-button-info",
    },
    disapproved: {
      id: id,
      action: "disapproved",
      message: "Are you sure you want to disapproved this request?",
      acceptClass: "p-button-warning",
    },
    complete: {
      id: id,
      action: "complete",
      message: "Are you sure you want to complete this request?",
      acceptClass: "p-button-info",
    },
    delete: {
      id: id,
      action: "delete",
      message: "Are you sure you want to permanently delete this record?",
      acceptClass: "p-button-danger",
      endpoint: `${
        archivePageActiveTab[useDataTable.activeTabManagement.toString()]
      }/delete/${id}`,
      method: "DELETE",
    },
  };

  return confirmAction(details[action]);
};

const archive_status = (id: string, action: string) => {
  const url =
    action === "archive"
      ? routeList[currentUrl] || currentUrl
      : archivePageActiveTab[useDataTable.activeTabManagement.toString()];

  return confirmAction({
    id: id,
    action: action,
    message: `Are you sure you want to ${action} this record?`,
    endpoint: `${url}/archive_status/${id}/${
      action == "archive" ? true : false
    }`,
    acceptClass: "p-button-danger",
  });
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
