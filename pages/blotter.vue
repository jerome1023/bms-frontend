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
  import { BlotterForm } from "#components";
  
  const userStore = useUserStore();
  const useModal = useModalStore();
  const useDataTable = useDataTableStore();
  
  const openModal = () => {
    useModal.mountForm({
      mode: "Create",
      title: "Blotter",
      component: BlotterForm,
      schema: {},
      data: {},
    });
    useModal.toggleModal(true);
  };
  
  onMounted(async () => {
    await useGetData("blotter/list").then((response) => {
      useDataTable.storeTableContent({
        title: "Blotter",
        columns: [
          { field: "complainant", header: "Complainant" },
          { field: "complainee", header: "Complainee" },
          { field: "complain", header: "Complain" },
          { field: "date", header: "Date" },
          { field: "status", header: "Status" },
        ],
        actions: ["edit", "solve", "archive"],
        body: response ?? [],
      });
    });
  });
  </script>
  