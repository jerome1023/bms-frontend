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
import { TransactionForm } from "#components";

const userStore = useUserStore();
const useModal = useModalStore();
const useDataTable = useDataTableStore();

const openModal = () => {
  useModal.mountForm({
    mode: "Create",
    title: "Transaction",
    component: TransactionForm,
    schema: {},
    data: {},
  });
  useModal.toggleModal(true);
};

onMounted(async () => {
  await useGetData("transaction/list").then((response) => {
    useDataTable.storeTableContent({
      title: "Transaction",
      columns: [
        { field: "fullname", header: "Fullname" },
        { field: "document_name", header: "Document" },
        { field: "purpose", header: "Purpose" },
        { field: "price", header: "Price" },
        { field: "created_at", header: "Date" },
      ],
      actions: ["edit", "archive"],
      body: response ?? [],
    });
  });
});
</script>
