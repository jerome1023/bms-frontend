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
    <template v-if="!loading && useDataTable.tableContent.body.length > 5" #header>
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
import { SolveBlotterForm } from "#components";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faBoxArchive,
  faPencil,
  faHandshake,
  faTrashCan,
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

const updateList = (id: string) => {
  useDataTable.updateBody(
    useDataTable.tableContent.body.filter((item) => item.id !== id)
  );
};

const routeList: TObjectLiteral<string> = {
  "resident/list": "resident",
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
      updateList(id);
      await useFormSubmit(
        `${routeList[currentUrl] || currentUrl}/archive/${id}`,
        { archive_status: true },
        "PUT"
      ).then(async (response) => {
        if (response.status) {
          toast.add({
            severity: "info",
            summary: "Success",
            detail: "Record archive successfully",
            life: 3000,
          });
        } else {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "Something Went Happen!",
            life: 3000,
          });
        }
      });
    },
  });
};

const remove = (id: string) => {
  console.log(id);
};

const getSeverity: any = (data: any) => {
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
