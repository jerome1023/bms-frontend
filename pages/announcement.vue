<template>
  <div v-if="userStore.user.role.name.toLowerCase() == 'administrator'">
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
import { useUserStore } from "~/stores/user";
import { useModalStore } from "~/stores/modal";
import { AnnouncementForm } from "#components";

const userStore = useUserStore();
const useModal = useModalStore();
const useDataTable = useDataTableStore();

// const content: TTableContent = {
//     title: 'Official',
//     head: ['Name', 'Position', 'Start Term', 'End Term', 'Status'],
//     body: [
//         {
//             name: 'Jerome',
//             position: 'Test',
//             start_term: '11/20/2023',
//             end_term: '11/20/2023',
//             status: 'Active',
//             action: ['view', 'edit', 'archive']
//         }
//     ]
// };

const openModal = () => {
  useModal.mountForm({
    mode: "Create",
    title: "Announcement",
    component: AnnouncementForm,
    schema: {},
    data: {},
  });
  useModal.toggleModal(true);
};

// const form: TForm = {
//   component: OfficialForm,
//   schema: {},
// };

onMounted(async () => {
  await useGetData("announcement/list").then((response) => {
    useDataTable.storeTableContent({
      title: "Announcement",
      columns: [
        { field: "image", header: "Image" },
        { field: "what", header: "What" },
        { field: "where", header: "Where" },
        { field: "who", header: "Who" },
        { field: "when", header: "When" },
        { field: "details", header: "Details" },
      ],
      body: response ?? [],
    });
  });
});
</script>
