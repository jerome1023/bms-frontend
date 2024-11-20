<template>
  <div class="border border-base-gray-300 py-2 px-3 rounded-md col-span-2">
    <p v-if="name" v-html="formattedText"></p>
    <div v-else>
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  name?: string;
}>();

const useModal = useModalStore() as any;
const formattedText = computed(() => {
  const text = props.name ? useModal.form.data?.[props.name] : "";
  return typeof text === "string" ? text.replace(/\n/g, "<br>") : text;
});
</script>
