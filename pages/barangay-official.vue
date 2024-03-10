<template>
    {{ isMounted }}
    {{ content.body }}
    <DataTable  :content="content" :event="openModal" />
    <ModalForm :form="form"/>
</template>

<script setup lang="ts">
import type { TForm, TTableContent } from '~/types';
import { useModalStore } from '~/stores/modal'
import { OfficialForm } from '#components';

const useModal = useModalStore()

const isMounted = ref(false)

const content = ref<TTableContent>({
    title: 'Official',
    head: ['Name', 'Position', 'Start Term', 'End Term', 'Status'],
    body: []
});

const openModal = () => {
    useModal.toggleModal(true)

};

const form:TForm = {
    title: 'Official Information',
    component : OfficialForm,
    schema : {}
}

onMounted(async()=>{
    await useGetData('official/list').then((response)=>{
        content.value.body = response
        isMounted.value = true
    })
})
</script>