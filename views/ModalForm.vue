<template>
    <Modal>
        <Form @submit="submit" v-slot="{isSubmitting}">
            <h1 class="text-xl md:text-2xl font-semibold mb-5">{{ form.title }}</h1>
            <hr class="mb-5 text-base-green" />
            <KeepAlive>
                <component :is="form.component" />
            </KeepAlive>
            <hr class="mt-5 text-base-green" />
            <Alert type="danger" title='Invalid Email or Password'
                    parent-class="col-span-full mt-5" />
            <div class="mt-5 flex gap-3 justify-end">
                <button @click="cancel()" type="button" class="btn btn-gray">
                    Cancel
                </button>
                <button :disabled="isSubmitting" :class="['btn', {'opacity-50' : isSubmitting}]">Save</button>
            </div>
        </Form>
    </Modal>
</template>

<script setup lang="ts">
import type { TForm } from "~/types";
import { useModalStore } from "~/stores/modal";

const useModal = useModalStore();

defineProps<{
    form: TForm;
}>();

const submit = async (values: any, actions:any) => {
    // console.log(actions.setErrors);
    await useFormSubmit('official/create',values)
    .then((response:any)=>{
        actions.setErrors(response.errors);
        // console.log(response)
    })
};

const cancel = () => {
    useModal.toggleModal(false);
};
</script>
