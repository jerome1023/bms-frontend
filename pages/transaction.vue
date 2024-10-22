<template>
  <Button
    v-if="userStore.user.role?.name == 'Administrator'"
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
    const columns = [
      { field: "document_name", header: "Document" },
      { field: "purpose", header: "Purpose" },
      { field: "price", header: "Price" },
      { field: "created_at", header: "Date" },
    ];

    if (userStore.user.role?.name == "Administrator") {
      columns.unshift({ field: "fullname", header: "Fullname" });
    }

    useDataTable.storeTableContent({
      title: "Transaction",
      columns: columns,
      actions:
        userStore.user.role?.name == "Administrator" ? ["edit", "archive"] : [],
      body: response ?? [],
    });
  });
});
</script>
