<template>
  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
  >
    <DashCard v-for="item in list" :content="item" />
    <DashCard>
      <div class="flex gap-5 justify-between">
        <div>
          <p class="font-bold text-2xl">{{ 0 }} (0)</p>
          <FormSelect label="Name" name="document" :options="document"/>
        </div>
        <FontAwesomeIcon :icon="faCoins" size="lg" class="text-base-green" />
      </div>
    </DashCard>
  </div>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faUsers,
  faFileLines,
  faFileCircleCheck,
  faCircleExclamation,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";

const list = ref() as any;
const document = ref();
const selectedDocument = ref();

onMounted(async () => {
  useGetData("dashboard/list").then((response) => {
    list.value = [
      {
        label: "Resident",
        value: response.resident,
        icon: faUsers,
        href: "resident/list",
      },
      {
        label: "Pending Request",
        value: response.pending,
        icon: faFileLines,
        href: "request/pending",
      },
      {
        label: "Approved Request",
        value: response.approved,
        icon: faFileCircleCheck,
        href: "request/approved",
      },
      {
        label: "Blotter",
        value: response.blotter,
        icon: faCircleExclamation,
        href: "blotter",
      },
    ];
    console.log(response.documents)
    document.value = response.documents;
  });
});
</script>
