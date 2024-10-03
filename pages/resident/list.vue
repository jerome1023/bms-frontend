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
        { field: "fullname", header: "Name" },
        { field: "gender", header: "Gender" },
        { field: "house_number", header: "House Number" },
        { field: "sitio_name", header: "Sitio" },
        { field: "voter_status", header: "Voter Status" },
      ],
      actions: ['edit', 'archive'],
      body: response ?? [],
    });
  });
});
</script>