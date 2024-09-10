<template>
  <Button icon="pi pi-plus" severity="info" size="small" @click="openModal" label="Add"/>
  <DataTable :table="content" />
  <ModalForm />
</template>

<script setup lang="ts">
import type { TForm, TTableContent } from "~/types";
import { useModalStore } from "~/stores/modal";
import { OfficialForm } from "#components";

const useModal = useModalStore();

const isMounted = ref(false);
const content = ref<TTableContent>({
  title: "Official",
  columns: [
    { field: "firstname", header: "Name" },
    { field: "position", header: "Position" },
    { field: "start_term", header: "Start Term" },
    { field: "end_term", header: "End Term" },
    // { field: "status", header: "Status" },
  ],
  body: [],
});

const openModal = () => {
    useModal.mountForm ({
      mode: "Create",
      title: "Official Information",
      component: OfficialForm,
      schema: {},
      data: {}
    });
  useModal.toggleModal(true);
};


onMounted(async () => {
  await useGetData("barangay-official/list").then((response) => {
    content.value.body = response;
    isMounted.value = true;
  });
});
</script>
