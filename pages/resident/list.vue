<template>
  <div class="flex gap-x-2">
    <Button
      icon="pi pi-plus"
      severity="info"
      size="small"
      @click="openModal('add')"
      label="Add"
    />
    <Button
      icon="pi pi-list"
      severity="info"
      size="small"
      @click="openModal('view')"
      label="Statistics"
    />
  </div>
  <DataTable />
  <ModalForm />
</template>

<script setup lang="ts">
import { ResidentForm, StatisticsForm } from "#components";

const useModal = useModalStore();
const useDataTable = useDataTableStore();

const openModal = async (type: string) => {
  const mode = type === "add" ? "Create" : "View";
  const title = type === "add" ? "Resident Information" : "Resident Statistics";
  const component = type === "add" ? ResidentForm : StatisticsForm;

  const data = ref({});

  if (type === "view") {
    useGetData("resident/statistics").then((response) => {
      data.value = response;
    });
  }

  useModal.mountForm({
    mode,
    title,
    component,
    schema: {},
    data,
  });
  useModal.toggleModal(true);
};

onMounted(async () => {
  await useGetData("resident/list").then((response) => {
    useDataTable.storeTableContent({
      title: "Resident",
      columns: [
        { field: "fullname", header: "Name" },
        { field: "gender", header: "Gender" },
        { field: "house_number", header: "House Number" },
        { field: "sitio_name", header: "Sitio" },
        { field: "voter_status", header: "Voter Status" },
      ],
      actions: ["edit", "archive"],
      body: response ?? [],
    });
  });
});
</script>
