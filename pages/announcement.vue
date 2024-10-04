<template>
  <div v-if="userStore.user.role?.name.toLowerCase() == 'administrator'">
    <Button
      icon="pi pi-plus"
      severity="info"
      size="small"
      @click="openModal"
      label="Add"
    />
    <DataTable />
    <ModalForm />
  </div>
  <div v-else>User</div>
</template>

<script setup lang="ts">
import { AnnouncementForm } from "#components";

const userStore = useUserStore();
const useModal = useModalStore();
const useDataTable = useDataTableStore();

const openModal = () => {
  useModal.mountForm({
    mode: "Create",
    title: "Announcement Information",
    component: AnnouncementForm,
    schema: {},
    data: {},
  });
  useModal.toggleModal(true);
};

onMounted(async () => {
  await useGetData("announcement/list").then((response) => {
    useDataTable.storeTableContent({
      title: "Announcement",
      columns: [
        { field: "what", header: "What" },
        { field: "where", header: "Where" },
        { field: "who", header: "Who" },
        { field: "when", header: "When" },
        { field: "details", header: "Details" },
      ],
      actions: ["edit", "archive"],
      body: response ?? [],
    });
  });
});
</script>
