<template>
  <div
    class="absolute top-0 left-0 w-full h-full z-[-1] bg-cover bg-center"
    :style="{
      backgroundImage: `url('${
        useBarangayDetail.data.image ? baseURL + useBarangayDetail.data.image : bgImage
      }')`,
    }"
  ></div>
</template>

<script setup lang="ts">
import bgImage from "@/assets/image/sta_catalina_background.png";
import { useBarangayDetailStore } from "~/stores/details";

const useBarangayDetail = useBarangayDetailStore();
const config = useRuntimeConfig();
const baseURL = config.public.backendURL;
</script>
