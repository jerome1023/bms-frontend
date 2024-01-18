<template>
    <div>
        <label :for="name" class="sm:text-lg font-medium">
            {{ label }}
        </label>
        <div class="mt-1">
            <FormInputText v-if="type === 'text'" :label="label" :name="name" />
            <FormSelect v-else-if="type === 'select'" :label="label" :name="name" :options="options" />
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TOptions } from '~/types';

defineProps<{
    type: string
    label: string
    name: string
    options?: TOptions;
}>()
</script>