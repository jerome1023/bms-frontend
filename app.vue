<template>
  <div>
    <NuxtLoadingIndicator estimatedProgress="100" :height="5" />
    <NuxtLayout :name="layout" v-if="isLoading">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useBarangayDetailStore } from "./stores/details";
type LayoutKey = "auth" | "default";

const layout = ref<LayoutKey>("auth");
const isLoading = ref();

const checkLocalStorage = () => {
  if (process.client) {
    const storedValue = localStorage.getItem("token");
    const isAuthenticated = storedValue !== null;
    layout.value = isAuthenticated ? "default" : "auth";
    isLoading.value = true;
  }
};

const router = useRouter();
watch(
  () => router.currentRoute.value.path,
  () => {
    checkLocalStorage();
  }
);

const useBarangayDetail = useBarangayDetailStore();
onMounted(async () => {
  await useBarangayDetail.mountDetails().then(() => {
    checkLocalStorage();
  });
});
</script>
