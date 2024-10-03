<template>
  <div class="sm:grid grid-cols-6 gap-x-3">
    <FormGroup
      label="Fullname Name"
      type="text"
      name="fullname"
      placeholder="e.g., Doe, John A."
      span="col-span-full"
    />
    <FormGroup
      label="Document"
      type="select"
      :options="documentOptions"
      name="document"
      span="col-span-3"
    />
    <!-- <FormGroup label="Price" type="text" name="price" span="col-span-3" /> -->
    <FormGroup
      label="Purpose"
      type="select"
      :options="purposeOptions"
      name="purpose"
      span="col-span-3"
    />
  </div>
</template>

<script setup lang="ts">
const documentOptions = ref();
const purposeOptions = [
  {
    code: "Work",
    name: "Work",
  },
  {
    code: "School Requirement",
    name: "School Requirement",
  },
  {
    code: "Business",
    name: "Business",
  },
  {
    code: "Others",
    name: "Others",
  },
];

onMounted(async () => {
  await useGetData("document/list").then((response) => {
    documentOptions.value = response.map((item: any) => ({
      code: item.id,
      name: item.name,
    }));
  });
});
</script>
