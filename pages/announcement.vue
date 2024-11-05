<template>
  <div v-if="userRole.toLowerCase() == 'administrator'">
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
  <div v-else class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
    <div
      v-for="(details, index) in announcementDetails"
      class="col-span-1 w-full rounded-lg shadow-xl p-5 bg-base-gray-300 mb-auto"
    >
      <div class="flex justify-center mb-3">
        <Image
          :src="imageToDisplay(details.image)"
          imageClass="h-40 md:h-44 object-cover"
          preview
        />
      </div>
      <div v-if="!showMore[index]" class="text-center font-semibold text-lg">
        {{ details.what }}
      </div>
      <div v-else v-for="key in keyName" class="flex">
        <p class="w-[6rem]">
          {{ key.charAt(0).toUpperCase() + key.slice(1) }}:
        </p>
        <p class="w-full font-semibold">{{ details[key] }}</p>
      </div>
      <p
        class="underline text-green-500 text-center cursor-pointer"
        @click="showMore[index] = !showMore[index]"
      >
        {{ showMore[index] ? "View Less" : "View More" }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AnnouncementForm } from "#components";
import { useBarangayDetailStore } from "~/stores/details";
import logo from "~/assets/image/logo.png";

const userStore = useUserStore();
const useModal = useModalStore();
const useDataTable = useDataTableStore();
const useBarangayDetail = useBarangayDetailStore();
const userRole = userStore.user.role?.name;
const config = useRuntimeConfig();
const baseURL = config.public.backendURL;

interface AnnouncementDetails {
  what: string;
  where: string;
  who: string;
  when: string;
  details: string;
  image: string;
}
const announcementDetails = ref<AnnouncementDetails[]>([]);
const keyName: Array<keyof AnnouncementDetails> = [
  "what",
  "where",
  "who",
  "when",
  "details",
];
const showMore = ref<Record<number, boolean>>({});

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

const imageToDisplay = (image: string) => {
  return image
    ? baseURL + image
    : useBarangayDetail.data.logo
    ? baseURL + useBarangayDetail.data.logo
    : logo;
};

onMounted(async () => {
  await useGetData("announcement/list").then((response) => {
    if (userRole === "Administrator") {
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
    } else {
      announcementDetails.value = response;
    }
  });
});
</script>
