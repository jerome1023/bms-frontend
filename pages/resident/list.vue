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
import { ResidentForm } from "#components";

const useModal = useModalStore();
const useDataTable = useDataTableStore();

const openModal = () => {
  useModal.mountForm({
    mode: "Create",
    title: "Official Information",
    component: ResidentForm,
    schema: {},
    data: {},
  });
  useModal.toggleModal(true);
};

onMounted(async () => {
  await useGetData("resident/list").then((response) => {
    useDataTable.storeTableContent({
      title: "Official",
      columns: [
        { field: "firstname", header: "Name" },
        { field: "position", header: "Position" },
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