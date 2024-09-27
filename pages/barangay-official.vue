<template>
  <Button
    icon="pi pi-plus"
    severity="info"
    size="small"
    @click="openModal"
    label="Add"
  />
  <DataTable />
  <ModalForm />
</template>

<script setup lang="ts">
// import { useModalStore } from "~/stores/modal";
// import { useDataTableStore } from "~/stores/datatable";
import { OfficialForm } from "#components";

const useModal = useModalStore();
const useDataTable = useDataTableStore();

const openModal = () => {
  useModal.mountForm({
    mode: "Create",
    title: "Official Information",
    component: OfficialForm,
    schema: {},
    data: {},
  });
  useModal.toggleModal(true);
};

onMounted(async () => {
  await useGetData("barangay-official/list").then((response) => {
    useDataTable.storeTableContent({
      title: "Official",
      columns: [
        { field: "fullname", header: "Name" },
        { field: "gender", header: "Gender" },
        { field: "start_term", header: "Start Term" },
        { field: "end_term", header: "End Term" },
        // { field: "status", header: "Status" },
      ],
      actions: ['edit', 'archive'],
      body: response ?? [],
    });
  });
});
</script>
