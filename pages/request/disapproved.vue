<template>
  <DataTable />
</template>

<script setup lang="ts">
const userStore = useUserStore();
const useDataTable = useDataTableStore();

onMounted(async () => {
  await useGetData("request/list/disapproved").then((response) => {
    useDataTable.storeTableContent({
      title: "Request",
      columns: [
        { field: "fullname", header: "Name" },
        { field: "document_name", header: "Document" },
        { field: "purpose", header: "Purpose" },
        { field: "price", header: "Price" },
        { field: "status", header: "Status" },
        { field: "reason", header: "Disapproved Reason" },
        { field: "date", header: "Disapproved Date" },
      ],
      actions: userStore.user.role?.name === "Administrator" ? ["archive"] : [],
      body: response ?? [],
    });
  });
});
</script>
