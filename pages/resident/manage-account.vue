<template>
  <DataTable />
  <ModalForm />
</template>

<script setup lang="ts">
const useDataTable = useDataTableStore();

onMounted(async () => {
  await useGetData("users/list").then((response) => {
    useDataTable.storeTableContent({
      title: "Account",
      columns: [
        { field: "fullname", header: "Name" },
        { field: "gender", header: "Gender" },
        { field: "address", header: "Address" },
      ],
      actions: ["edit"],
      body: response ?? [],
    });
  });
});
</script>
