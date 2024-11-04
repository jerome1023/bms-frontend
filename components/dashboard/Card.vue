<template>
  <div :class="['p-5 rounded-md', color == 'green' ? 'bg-base-green' : 'bg-base-gray-300']">
    <NuxtLink
      v-if="content"
      :to="content.href"
      class="flex gap-5 justify-between cursor-pointer"
    >
      <div>
        <p class="font-bold text-3xl">{{ content.value }}</p>
        <p class="text-base-gray">
          {{ content.value > 1 ? content.label + "s" : content.label }}
        </p>
      </div>
      <FontAwesomeIcon :icon="content.icon" size="xl" class="text-base-green" />
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
  color?: string
}>();
</script>
