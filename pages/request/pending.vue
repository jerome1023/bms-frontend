<template>
    <DataTable />
    <ModalForm />
  </template>
  
  <script setup lang="ts">
  const userStore = useUserStore();
  const useDataTable = useDataTableStore();

  onMounted(async () => {
    await useGetData("request/list/pending").then((response) => {
      useDataTable.storeTableContent({
        title: "Request",
        columns: [
          { field: "fullname", header: "Name" },
          { field: "document_name", header: "Document" },
          { field: "purpose", header: "Purpose" },
          { field: "price", header: "Price" },
          { field: "status", header: "Status" },
        ],
        actions: userStore.user.role?.name === 'User' ? ['edit', 'delete'] : ['view', 'approved', 'disapproved'],
        body: response ?? [],
      });
    });
  });
  </script>
  