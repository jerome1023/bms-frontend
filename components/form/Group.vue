<template>
    <div :class="span">
        <label :for="name" class="sm:text-lg font-medium">
            {{ label }}
        </label>
        <div class="mt-1 mb-2">
            <FormText v-if="type === 'text'" :label="label" :name="name" :placeholder="placeholder"/>
            <FormPassword v-if="type === 'password'" :label="label" :name="name" :placeholder="placeholder"/>
            <FormSelect v-if="type === 'select'" :label="label" :name="name" :options="options" />

            <ErrorMessage v-slot="{ message }" :name="name">
                <span class="text-sm text-alert-danger-text">{{ message }}</span>
            </ErrorMessage>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { TOptions } from '~/types';
import { ErrorMessage }from 'vee-validate'

defineProps<{
    type: string
    label: string
    name: string
    options?: TOptions;
    span: string
    placeholder?: string
}>()
</script>