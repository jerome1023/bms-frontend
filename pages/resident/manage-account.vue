<template>
    <DataTable :content="content" :event="openModal" />
    <ModalForm/>
</template>

<script setup lang="ts">
import type { TTableContent } from '~/types';
import { useModalStore } from '~/stores/modal'

const useModal = useModalStore()

const content: TTableContent = {
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

const openModal = () => {
    useModal.toggleModal(true)

};
</script>