<template>
  <div v-show="mounted" class="flex">
    <UiAside v-show="toggleAside" />
    <div class="w-full">
      <UiHeader />
      <Toast class="w-auto" />
      <ConfirmDialog></ConfirmDialog>
      <main
        class="p-3 overflow-auto"
        :style="{ ...dynamicWidth, height: 'calc(100vh - 4rem)' }"
      >
        <slot />
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { toggleAside } from "~/composables/globalRef";
import { useUserStore } from "~/stores/user";

const userStore = useUserStore();
const mounted = computed(() => Object.keys(userStore.user).length > 0);

// const dynamicWidth = computed(() => ({
//     width: toggleAside.value ? 'calc(100vw - 260px)' : '100vw'
// }));

const dynamicWidth = computed(() => {
  const screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    // Mobile devices
    if (toggleAside.value) {
      return {
        width: "100vw",
      };
    }
  } else {
    return {
      width: toggleAside.value ? "calc(100vw - 260px)" : "100vw",
    };
  }
});

onMounted(() => {
  // userStore.getUserDetails();
});
</script>
