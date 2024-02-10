<template>
    <div class="flex">
        <UiAside v-show="toggleAside"/>
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
</script>