<template>
    <DataTable :content="content"/>
</template>

<script setup lang="ts">
import type { TTableContent } from '~/types';

const content: TTableContent = {
    title: '',
    head: ['Name', 'Position', 'Start Term', 'End Term', 'Status'],
    body: [
        {
            name: 'Jerome',
            position: 'Test',
            start_term: '11/20/2023',
            end_term: '11/20/2023',
            status: 'Active',
            action: ['edit','archive']
        }
    ]
};
</script>