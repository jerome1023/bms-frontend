<template>
    <DataTable :content="content" :event="openModal" />
    <ModalForm :open="open" @close="open = false"/>
</template>

<script setup lang="ts">
import type { TTableContent } from '~/types';

const content: TTableContent = {
    title: 'Official',
    head: ['Name', 'Position', 'Start Term', 'End Term', 'Status'],
    body: [
        {
            name: 'Jerome',
            position: 'Test',
            start_term: '11/20/2023',
            end_term: '11/20/2023',
            status: 'Active',
            action: ['view', 'edit', 'archive']
        }
    ]
};

const open = ref(false);

const openModal = () => {
    open.value = true
};
</script>