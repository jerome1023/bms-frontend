<template>
  <button
    type="submit"
    class="rounded-sm border border-base-gray px-2 text-base-gray bg-white"
  >
    <ProgressSpinner
      v-if="isSubmitting"
      style="width: 15px; height: 15px"
      strokeWidth="4"
    />
    <FontAwesomeIcon v-else :icon="faSearch" size="sm" />
  </button>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

defineProps<{
    isSubmitting : boolean
}>()
</script>