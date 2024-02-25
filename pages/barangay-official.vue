<template>
    <DataTable :content="content" :event="openModal" />
    <ModalForm :form="form"/>
</template>

<script setup lang="ts">
import type { TForm, TTableContent } from '~/types';
import { useModalStore } from '~/stores/modal'
import { OfficialForm } from '#components';

const useModal = useModalStore()

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

const openModal = () => {
    useModal.toggleModal(true)

};

const form:TForm = {
    component : OfficialForm,
    schema : {}
}
</script>