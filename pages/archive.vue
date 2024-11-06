<template>
  <TabView v-model:activeIndex="active">
    <TabPanel v-for="tab in tabs" :key="tab.title" :header="tab.title">
      <DataTable />
    </TabPanel>
  </TabView>
</template>
<script setup>
const useDataTable = useDataTableStore();
const active = ref(0);

const tabs = ref([
  { title: "Barangay Official" },
  { title: "Resident List" },
  // { title: "Pending Request" },
  { title: "Approved Request" },
  { title: "Disapproved Request" },
  { title: "Transaction" },
  { title: "Announcement" },
  { title: "Blotter" },
]);

watch(active, async (newValue) => {
  useDataTable.reset();
  useManageList("archive", newValue);
  useDataTable.updateActiveTab(newValue);
});

onMounted(() => {
  useManageList("archive", 0);
});
</script>
