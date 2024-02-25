<template>
    <div v-if="userStore.user.role.name.toLowerCase() == 'administrator'">
        <DataTable :content="content" :event="openModal" />
        <ModalForm :form="form" />
    </div>
    <div v-else>
        User
    </div>
</template>

<script setup lang="ts">
import type { TForm, TTableContent } from '~/types';
import { useUserStore } from '~/stores/user'
import { useModalStore } from '~/stores/modal'
import { OfficialForm } from '#components';

const userStore = useUserStore()
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

const form: TForm = {
    component: OfficialForm,
    schema: {}
}
</script>