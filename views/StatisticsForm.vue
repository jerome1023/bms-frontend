<template>
  <div class="h-full w-full flex items-center" v-if="isLoading">
    <ProgressSpinner
      style="width: 100px; height: 100px"
      strokeWidth="4"
      animationDuration="1s"
      aria-label="Custom ProgressSpinner"
    />
  </div>
  <div v-else>
    <div class="grid sm:grid-cols-6 gap-3 text-center">
      <div
        v-for="(stats, key) in useModal.form.data?.statistics"
        :key="key"
        class="border py-1 px-2 rounded-md col-span-2"
      >
        <p class="font-bold">{{ key }}: {{ stats }}</p>
      </div>
    </div>

    <Divider v-if="useModal.form.data?.population" align="left" type="solid">
      <p class="text-lg md:text-xl font-semibold">Population Per Sitio</p>
    </Divider>

    <div class="grid sm:grid-cols-6 gap-3 text-center">
      <div
        v-for="(populate, key) in useModal.form.data?.population"
        :key="key"
        class="border py-1 px-2 rounded-md col-span-2"
      >
        <p class="font-bold">{{ key }}: {{ populate }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
const useModal = useModalStore() as any;

const isLoading = computed(
  () => !useModal.form.data?.statistics || !useModal.form.data?.population
);
</script>
