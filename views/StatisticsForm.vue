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
    <div class="grid grid-cols-1 sm:grid-cols-6 gap-3 text-center">
      <FormReadonly
        v-for="(stats, key) in useModal.form.data?.statistics"
        :key="key"
      >
        <p class="font-semibold">{{ key }}: {{ stats }}</p>
      </FormReadonly>

      <Divider
        v-if="useModal.form.data?.population"
        align="left"
        type="solid"
        class="col-span-full"
      >
        <p class="text-lg md:text-xl font-semibold">Population Per Sitio</p>
      </Divider>

      <FormReadonly
        v-for="(populate, key) in useModal.form.data?.population"
        :key="key"
      >
        <p class="font-semibold">{{ key }}: {{ populate }}</p>
      </FormReadonly>
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
