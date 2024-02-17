<template>
    <div v-show="mounted" class="flex">
        <UiAside v-show="toggleAside" />
        <div class="w-full">
            <UiHeader />
            <main class="p-3" style="height: calc(100vh - 4rem)">
                <slot />
            </main>
        </div>
    </div>
</template>
<script setup lang="ts">
import { toggleAside } from '~/composables/globalRef'
import { useUserStore } from '~/stores/user'

const userStore = useUserStore();
const mounted = computed(() => Object.keys(userStore.user).length > 0)

onMounted(() => {
    userStore.getUserDetails();
})
</script>