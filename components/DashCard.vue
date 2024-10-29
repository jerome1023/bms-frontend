<template>
  <div class="bg-base-gray-300 p-5 rounded-md">
    <NuxtLink
      v-if="content"
      :to="content.href"
      class="flex gap-5 justify-between cursor-pointer"
    >
      <div>
        <p class="font-bold text-2xl">{{ content.value }}</p>
        <p class="text-base-gray text-sm">
          {{ content.value > 1 ? content.label + "s" : content.label }}
        </p>
      </div>
      <FontAwesomeIcon :icon="content.icon" size="lg" class="text-base-green" />
    </NuxtLink>
    <div v-else>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

defineProps<{
  content?: any;
}>();
</script>
